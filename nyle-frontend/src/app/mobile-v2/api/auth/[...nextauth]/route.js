import NextAuth from 'next-auth';
import { getAuthOptions } from '@/lib/auth';
import { rateLimitRequest } from '@/lib/apiRateLimit';

const handler = async (req, res) => {
    if (req.method === "POST") {
        const { limited } = rateLimitRequest({
            request: req,
            namespace: "nextauth-login-mobile",
            maxRequests: 12,
            windowMs: 15 * 60 * 1000,
        });

        if (limited) {
            return new Response(
                JSON.stringify({ message: "Too many login attempts. Please try again later." }),
                {
                    status: 429,
                    headers: { "content-type": "application/json" },
                }
            );
        }
    }

    const options = await getAuthOptions();
    return await NextAuth(req, res, options);
};

export { handler as GET, handler as POST };
