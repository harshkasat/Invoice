import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/soon(.*)',
]);

const isDashboardRoute = createRouteMatcher(['/dashboard(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // If user is not logged in, clear the user_id cookie
  if (!userId) {
    const response = NextResponse.redirect(new URL('/sign-in', req.url));
    response.cookies.set({
      name: 'user_id',
      value: '',
      expires: new Date(0),
      path: '/',
    });
    return response
  }

  // Protect /admin routes for users with role !== admin
  if (isAdminRoute(req)) {
    const role = sessionClaims?.metadata?.role;
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Protect /dashboard routes
  if (isDashboardRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all routes except static files and internal Next.js paths
    '/((?!_next|.*\\..*).*)',
    // Also match API routes
    '/(api|trpc)(.*)',
  ],
};
