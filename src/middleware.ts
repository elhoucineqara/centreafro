import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('admin_token')?.value;

    if (request.nextUrl.pathname.startsWith('/admin/dashboard') || request.nextUrl.pathname.startsWith('/api/admin/members')) {
        if (!token) {
            if (request.nextUrl.pathname.startsWith('/api')) {
                return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // If going to login page while already authenticated, redirect to dashboard
    if (request.nextUrl.pathname === '/admin/login') {
        if (token) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/members/:path*'],
};
