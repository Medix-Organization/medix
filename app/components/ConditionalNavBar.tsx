'use client';

import { usePathname } from 'next/navigation';
import ClientNavBar from './ClientNavBar';

export default function ConditionalNavBar() {
  const pathname = usePathname();

  // Don't show navbar on doctor invite page
  if (pathname?.includes('/doctor-invite')) {
    return null;
  }

  // Don't show navbar on clinic invite page
  if (pathname?.includes('/clinic-invite')) {
    return null;
  }
  
  // Don't show navbar on any onboarding pages
  if (pathname?.includes('/onboarding')) {
    return null;
  }

  

  if(pathname?.includes('/doctor-onboarding')) {
    return null;
  }

  // Don't show navbar on clinic onboarding page
  if (pathname?.includes('/clinic-onboarding')) {
    return null;
  }

  // Don't show navbar on providers page
  if (pathname?.includes('/providers')) {
    return null;
  }

  // Don't show navbar on any sign-up pages
  if (pathname?.includes('/sign-up')) {
    return null;
  }

  return <ClientNavBar />;
}