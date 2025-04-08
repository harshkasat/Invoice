import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/', '/soon(.*)'])
const isDashboardRoute = createRouteMatcher(['/dashboard(.*)'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  
  // If no user is present and there's a user_id cookie, remove it
  if (!userId) {
    const response = NextResponse.next();
    response.cookies.set({
      name: 'user_id',
      value: '',
      expires: new Date(0),
      path: '/',
    });
    return response;
  }

  if (!isPublicRoute(req)) {
    await auth.protect()
  }

  // Restrict admin route to users with specific role
  if (isAdminRoute(req) && (await auth()).sessionClaims?.metadata?.role !== 'admin') {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }

  // Restrict dashboard routes to signed in users
  if (isDashboardRoute(req)){
    await auth.protect()
  }

  return NextResponse.next();
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
