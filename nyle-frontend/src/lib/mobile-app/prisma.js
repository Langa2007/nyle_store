let prismaInstance = null;

export default async function getPrisma() {
    if (prismaInstance) return prismaInstance;

    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) return null;

    try {
        // Dynamic imports to avoid build-time worker crashes during module evaluation
        const { PrismaClient } = await import('@prisma/client');
        const { PrismaNeon } = await import('@prisma/adapter-neon');
        const { Pool } = await import('@neondatabase/serverless');

        const isNeon = databaseUrl.includes('neon.tech')

        if (isNeon) {
            const pool = new Pool({ connectionString: databaseUrl })
            const adapter = new PrismaNeon(pool)
            prismaInstance = new PrismaClient({ adapter })
        } else {
            prismaInstance = new PrismaClient({
                datasources: {
                    db: { url: databaseUrl },
                },
            })
        }

        return prismaInstance;
    } catch (error) {
        console.error("Failed to initialize Prisma:", error);
        return null;
    }
}
