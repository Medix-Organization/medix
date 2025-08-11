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
    <button onClick={toggleLocale} className="px-3 py-1 border rounded-full scale-75 hover:shadow-2xl hover:bg-gray-100 hover:cursor-pointer">
      {currentLocale === 'en' ? 'عر' : 'En'}
    </button>
  );
};

export default ToggleLanguageButton;
