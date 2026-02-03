import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();

    // Enforce HTTPS only on production (if behind proxy, X-Forwarded-Proto may be set)
    const hostname = req.headers.get('host') || '';
    const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1');
    if (!isLocalhost) {
        const proto = req.headers.get('x-forwarded-proto') || url.protocol;
        if (proto && proto === 'http') {
            url.protocol = 'https';
            return NextResponse.redirect(url);
        }
    }

    // Protect member dashboard only (allow /member for login/payment flow)
    const pathname = url.pathname;
    const isProtected = pathname.startsWith('/member-dashboard');

    if (isProtected) {
        const cookie = req.cookies.get('guppy_auth')?.value;
        if (!cookie || cookie !== 'true') {
            // Redirect to member login page
            const loginUrl = new URL('/member', req.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Continue and add security headers
    const res = NextResponse.next();
    res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    res.headers.set('X-Content-Type-Options', 'nosniff');
    res.headers.set('X-Frame-Options', 'DENY');
    res.headers.set('Referrer-Policy', 'no-referrer');
    res.headers.set('Permissions-Policy', 'geolocation=()');
    res.headers.set('Content-Security-Policy', "default-src 'self' https://www.youtube.com https://www.youtube-nocookie.com; frame-ancestors 'none';");

    return res;
}

export const config = {
    matcher: '/:path*',
};
