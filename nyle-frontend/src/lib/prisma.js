import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'

const prismaClientSingleton = () => {
    const databaseUrl = process.env.DATABASE_URL || ''

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
