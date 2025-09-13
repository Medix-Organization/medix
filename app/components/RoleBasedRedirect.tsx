'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RoleBasedRedirectProps {
  locale: string;
}

export default function RoleBasedRedirect({ locale }: RoleBasedRedirectProps) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      const role = user.publicMetadata?.role as string;
      
      switch (role) {
        case 'doctor':
          router.push(`/${locale}/doctor-onboarding`);
          break;
        case 'clinic':
          router.push(`/${locale}/clinic-onboarding`);
          break;
        case 'patient':
          router.push(`/${locale}/onboarding`);
          break;
        case 'admin':
          router.push(`/${locale}/admin`);
          break;
        default:
          router.push(`/${locale}/onboarding`);
      }
    }
  }, [isLoaded, user, router, locale]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return null;
}