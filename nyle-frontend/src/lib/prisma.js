import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const globalForPrisma = globalThis;

function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        console.error('[Prisma] DATABASE_URL is not set in environment variables');
        return null;
    }

    try {
        // Prisma v7 requires the connection URL to be passed via an adapter
        const adapter = new PrismaNeon({ connectionString });
        return new PrismaClient({ adapter });
    } catch (err) {
        console.error('[Prisma] Failed to create PrismaClient:', err);
        return null;
    }
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export default async function getPrisma() {
    return prisma;
}
