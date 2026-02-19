import { NextResponse } from 'next/server';

export function proxy(request) {
    const url = request.nextUrl.clone();
    const userAgent = request.headers.get('user-agent') || '';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent);

    // If mobile device, rewrite to _mobile specific routes
    // We exclude /api, /_next, /static, /images, etc.
    const path = url.pathname;

    const isExcluded = path.startsWith('/api') ||
        path.startsWith('/_next') ||
        path.startsWith('/favicon.ico') ||
        path.startsWith('/images') ||
        path.includes('.');

    // Map legacy dashboard path to profile
    if (path === '/user/dashboard') {
        const target = isMobile ? '/mobile-v2/profile' : '/profile';
        url.pathname = target;
        return NextResponse.rewrite(url);
    }

    if (isMobile && !isExcluded) {
        // Basic mapping: / -> /mobile-v2, /shop -> /mobile-v2/shop, etc.
        url.pathname = `/mobile-v2${path}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
