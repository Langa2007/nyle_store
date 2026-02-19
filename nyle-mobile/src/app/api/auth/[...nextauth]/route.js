import NextAuth from 'next-auth';
import { getAuthOptions } from '@/lib/auth';

const handler = async (req, res) => {
    const options = await getAuthOptions();
    return await NextAuth(req, res, options);
};

export { handler as GET, handler as POST };
