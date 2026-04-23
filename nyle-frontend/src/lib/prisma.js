import { PrismaClient } from '@prisma/client';

let prismaInstance = null;

export default async function getPrisma() {
    // If already initialized, return the instance
    if (prismaInstance) return prismaInstance;

    // Check if we can reuse a global instance (common pattern in Next.js dev)
    if (process.env.NODE_ENV !== 'production' && globalThis.prisma) {
        prismaInstance = globalThis.prisma;
        return prismaInstance;
    }

    // Sanitize the URL to remove any accidental quotes (common in Vercel env vars)
    const databaseUrl = process.env.DATABASE_URL?.replace(/^["']|["']$/g, '');
    if (!databaseUrl) {
        console.error("[Prisma] DATABASE_URL is not defined");
        return null;
    }

    try {
        console.log(`[Prisma] Initializing standard PostgreSQL client... URL starts with: ${databaseUrl.substring(0, 15)}...`);
        
        prismaInstance = new PrismaClient({
            datasources: {
                db: { url: databaseUrl },
            },
        });

        // Store in global for dev mode to prevent connection exhaustion
        if (process.env.NODE_ENV !== 'production') {
            globalThis.prisma = prismaInstance;
        }

        return prismaInstance;
    } catch (error) {
        console.error("[Prisma] Failed to initialize Prisma Client:", error);
        return null;
    }
}
