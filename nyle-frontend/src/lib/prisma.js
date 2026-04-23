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
    const sanitizedUrl = process.env.DATABASE_URL?.replace(/^["']|["']$/g, '');
    
    if (sanitizedUrl) {
        // Set it back to the environment so Prisma's engine picks it up automatically
        process.env.DATABASE_URL = sanitizedUrl;
    }

    try {
        console.log(`[Prisma] Initializing standard client... (URL length: ${sanitizedUrl?.length || 0})`);
        
        // No arguments needed, Prisma will use process.env.DATABASE_URL by default
        prismaInstance = new PrismaClient();

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
