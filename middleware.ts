import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { clerkMiddleware } from '@clerk/nextjs/server';

const intlMiddleware = createMiddleware(routing);

export default clerkMiddleware((auth, req) => {
  // Skip internationalization for API routes
  if (req.nextUrl.pathname.startsWith('/api')) {
    return;
  }
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Include all routes except API, static files, and Next.js internals
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Include static files but exclude Next.js internals
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};

