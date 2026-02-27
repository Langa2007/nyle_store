import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import getPrisma from '@/lib/prisma'

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

                    // Import bcrypt locally to avoid build-time worker crashes
                    const bcrypt = (await import('bcryptjs')).default;
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
                            if (account?.provider === 'google') {
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
                else if (token.id && token.id.length > 15 && (token.email || token.sub) && db) {
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

                // If the ID was updated or it's a new login, refresh the backend-compatible accessToken
                if (needsUpdate || !token.accessToken) {
                    const jwtHelper = (await import('jsonwebtoken')).default;
                    token.accessToken = jwtHelper.sign(
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
        debug: process.env.NODE_ENV === 'production',
    };
}

// Keep a placeholder for backward compatibility if needed, 
// but we should use getAuthOptions() in the route.
export const authOptions = {};
