import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import getPrisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getAuthOptions = async () => {
    const prisma = await getPrisma();

    return {
        adapter: prisma ? PrismaAdapter(prisma) : undefined,
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID || '',
                clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            }),
            CredentialsProvider({
                name: 'credentials',
                credentials: {
                    email: { label: 'Email', type: 'email' },
                    password: { label: 'Password', type: 'password' }
                },
                async authorize(credentials) {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error('Please enter email and password')
                    }

                    const db = await getPrisma();
                    if (!db) {
                        throw new Error('Database connection not available')
                    }

                    const user = await db.user.findUnique({
                        where: { email: credentials.email }
                    })

                    if (!user || !user.password) {
                        throw new Error('Invalid credentials')
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password)

                    if (!isValid) {
                        throw new Error('Invalid credentials')
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        image: user.image,
                    }
                }
            }),
            CredentialsProvider({
                id: 'google-id-token',
                name: 'Google ID Token',
                credentials: {
                    id_token: { label: 'ID Token', type: 'text' },
                },
                async authorize(credentials) {
                    if (!credentials?.id_token) {
                        console.warn('[Auth] No id_token provided in credentials');
                        return null;
                    }

                    try {
                        console.log('[Auth] Verifying Google ID token...');
                        const response = await fetch(
                            `https://oauth2.googleapis.com/tokeninfo?id_token=${credentials.id_token}`
                        );

                        if (!response.ok) {
                            const errorText = await response.text();
                            console.error(`[Auth] Google tokeninfo API error (${response.status}):`, errorText);
                            return null;
                        }

                        const googleUser = await response.json();
                        console.log('[Auth] Google user verified:', googleUser.email);

                        const envClientId = process.env.GOOGLE_CLIENT_ID;
                        if (!envClientId) {
                            console.error('[Auth] GOOGLE_CLIENT_ID is not defined in environment variables');
                        }

                        if (googleUser.aud !== envClientId) {
                            console.error(`[Auth] Audience mismatch. Expected: ${envClientId}, Got: ${googleUser.aud}`);
                            return null;
                        }

                        const db = await getPrisma();
                        if (!db) {
                            console.error('[Auth] Database connection failed during Google sign-in');
                            return null;
                        }

                        let user = await db.user.findUnique({
                            where: { email: googleUser.email }
                        });

                        if (!user) {
                            console.log(`[Auth] Creating new user for email: ${googleUser.email}`);
                            user = await db.user.create({
                                data: {
                                    email: googleUser.email,
                                    name: googleUser.name || 'Google User',
                                    image: googleUser.picture,
                                }
                            });
                        }

                        console.log('[Auth] Authorization successful for:', user.email);
                        return {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            image: user.image,
                        }
                    } catch (error) {
                        console.error('[Auth] Google token verification error:', error);
                        return null;
                    }
                }
            })
        ],
        session: {
            strategy: 'jwt',
        },
        pages: {
            signIn: '/auth/login',
            signUp: '/auth/signup',
        },
        callbacks: {
            async jwt({ token, user, account, profile }) {
                const db = await getPrisma();
                let needsUpdate = false;

                // Case 1: Initial sign in - Link user to DB
                if (user) {
                    token.email = user.email; // CRITICAL: Ensure email is preserved for Case 2
                    if (db) {
                        try {
                            if (account?.provider === 'google' || account?.provider === 'google-id-token') {
                                let dbUser = await db.user.findUnique({
                                    where: { email: user.email }
                                });

                                if (!dbUser) {
                                    dbUser = await db.user.create({
                                        data: {
                                            email: user.email,
                                            name: user.name || 'Google User',
                                            image: user.image,
                                        }
                                    });
                                    console.log(`[Auth] Created new Google user: ${user.email} (ID: ${dbUser.id})`);
                                }
                                token.id = String(dbUser.id);
                                needsUpdate = true;
                                console.log(`[Auth] Login (Google): ${user.email} -> Internal ID: ${token.id}`);
                            } else {
                                // For credentials, token.id follows user.id
                                token.id = String(user.id);
                                needsUpdate = true;
                                console.log(`[Auth] Login (Credentials): ${user.email} -> Internal ID: ${token.id}`);
                            }
                        } catch (error) {
                            console.error("[Auth] Error syncing user to DB in jwt callback:", error);
                        }
                    }
                }
                // Case 2: Refreshing existing session - Self-heal if session uses provider ID
                else if (token.id && token.id.length > 20 && /^\d+$/.test(token.id) && (token.email || token.sub) && db) {
                    try {
                        const searchEmail = token.email || token.sub; // Fallback if email is somehow missing
                        const dbUser = await db.user.findUnique({
                            where: { email: searchEmail }
                        });
                        if (dbUser) {
                            console.log(`[Auth] Auto-migrating session ID for ${searchEmail}: ${token.id} -> ${dbUser.id}`);
                            token.id = String(dbUser.id);
                            needsUpdate = true;
                        }
                    } catch (error) {
                        console.error("[Auth] Error migrating session ID:", error);
                    }
                }

                if (needsUpdate || !token.accessToken) {
                    token.accessToken = jwt.sign(
                        { id: token.id, email: token.email || user?.email, role: 'user' },
                        process.env.JWT_SECRET || 'fallback_secret_during_build',
                        { expiresIn: '24h' }
                    );
                }

                return token
            },
            async session({ session, token }) {
                if (token) {
                    session.user.id = token.id
                    session.accessToken = token.accessToken
                }
                return session
            },
        },
        secret: process.env.NEXTAUTH_SECRET,
        debug: process.env.NODE_ENV !== 'production',
    };
}

// Keep a placeholder for backward compatibility if needed, 
// but we should use getAuthOptions() in the route.
export const authOptions = {};
