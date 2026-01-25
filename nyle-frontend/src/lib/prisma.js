import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'

const prismaClientSingleton = () => {
    const databaseUrl = process.env.DATABASE_URL

    if (!databaseUrl) {
        if (process.env.NODE_ENV === 'production') {
            console.warn("Prisma: DATABASE_URL is missing in production environment.");
        }
        // Return standard client as fallback (won't work for queries, but allows evaluation)
        return new PrismaClient();
    }

    // Check if we are using Neon (usually has neon.tech in the URL)
    const isNeon = databaseUrl.includes('neon.tech')

    if (isNeon) {
        const pool = new Pool({ connectionString: databaseUrl })
        const adapter = new PrismaNeon(pool)
        return new PrismaClient({ adapter })
    }

    // Fallback for local Postgres or other providers (direct TCP connection)
    return new PrismaClient({
        datasources: {
            db: {
                url: databaseUrl,
            },
        },
    })
}

const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
