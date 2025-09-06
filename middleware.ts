import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const intlMiddleware = createMiddleware(routing);

// Define public routes (landing page and auth pages)
const isPublicRoute = createRouteMatcher([
  '/',
  '/en',
  '/ar',
  '/en/sign-in(.*)',
  '/ar/sign-in(.*)',
  '/en/sign-up(.*)',
  '/ar/sign-up(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/(en|ar)/doctor-invite',
  '/(en|ar)/clinic-invite',
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip internationalization for API routes
  if (req.nextUrl.pathname.startsWith('/api')) {
    return;
  }

  // Protect all routes except public ones
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};

