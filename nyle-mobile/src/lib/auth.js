import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import getPrisma from './prisma'

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
        callbacks: {
            async jwt({ token, user, account }) {
                if (user) {
                    token.id = user.id

                    const jwt = (await import('jsonwebtoken')).default;

                    // Create a backend-compatible token
                    token.accessToken = jwt.sign(
                        { id: user.id, email: user.email, role: 'user' },
                        process.env.JWT_SECRET || 'fallback_secret',
                        { expiresIn: '24h' }
                    )
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
        debug: process.env.NODE_ENV === 'development',
    };
}
