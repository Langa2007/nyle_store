export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import NextAuth from 'next-auth';
import { getAuthOptions } from '@/lib/auth';
import { rateLimitRequest } from '@/lib/apiRateLimit';

const handler = async (req, res) => {
    if (req.method === "POST") {
        const pathname = new URL(req.url).pathname;
        const isSessionPost = pathname.endsWith("/session");
        const isLogPost = pathname.endsWith("/_log");

        // Limit login/callback attempts, but do not rate-limit NextAuth's own
        // session refresh and client log endpoints.
        if (!isSessionPost && !isLogPost) {
            const { limited } = rateLimitRequest({
                request: req,
                namespace: "nextauth-login",
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
    }

    const options = await getAuthOptions();
    return await NextAuth(req, res, options);
};

export { handler as GET, handler as POST };
