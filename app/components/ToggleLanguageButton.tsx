"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

const ToggleLanguageButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current locale from pathname (e.g., "/en" or "/ar")
  const currentLocale = pathname.split('/')[1] || 'en';

  // Toggle function
  const toggleLocale = () => {
    const newLocale = currentLocale === 'en' ? 'ar' : 'en';

    // Preserve current path and query params when switching language
    const params = searchParams.toString();
    const newPath = `/${newLocale}${pathname.substring(3)}${params ? `?${params}` : ''}`;

    router.push(newPath);
  };

  return (
    <button 
      onClick={toggleLocale} 
      className="px-4 py-2 border border-white/30 rounded-full text-white hover:bg-white/20 hover:border-white/50 transition-all duration-200 font-medium min-w-[50px] backdrop-blur-sm"
    >
      {currentLocale === 'en' ? 'عر' : 'En'}
    </button>
  );
};

export default ToggleLanguageButton;
