'use client';

import { useTranslations } from "next-intl";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FaSearch, FaStethoscope, FaUser } from "react-icons/fa";
import Home from './home.svg';
import ToggleLanguageButton from "./ToggleLanguageButton";
import { Link } from "@/i18n/navigation";

const ClientNavBar = () => {
  const t = useTranslations('home.navbar');

  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className="hidden md:block bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors">
                <FaStethoscope className="text-2xl" />
                <span className="text-2xl font-bold tracking-tight">MEDIX</span>
              </Link>

              {/* Navigation Links */}
              <div className="flex gap-8">
                <Link
                  href="/"
                  className="text-white hover:text-blue-100 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-500/20"
                >
                  {t('links.home')}
                </Link>
                <Link
                  href="#"
                  className="text-white hover:text-blue-100 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-500/20"
                >
                  {t('links.contact')}
                </Link>
              </div>
            </div>

            {/* Right Side - Search, Auth, Language */}
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="flex items-center relative">
                <FaSearch className="absolute left-3 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full pl-10 pr-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all w-64"
                />
              </div>

              {/* Authentication */}
              <SignedOut>
                <SignInButton>
                  <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-full font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                    {t('signIn')}
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 ring-2 ring-white/30 hover:ring-white/50 transition-all"
                    }
                  }}
                />
              </SignedIn>

              {/* Language Toggle */}
              <ToggleLanguageButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex items-center justify-around py-3 px-2">
          {/* Home */}
          <Link
            href="/"
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors p-2 min-w-0"
          >
            <img
              width={20}
              height={20}
              src='/home.svg'
            />
            <span className="text-xs font-medium truncate">{t('links.home')}</span>
          </Link>

          {/* Doctors */}
          <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors p-2 min-w-0">
            <img
              width={20}
              height={20}
              src='/doctors.svg'
            />
            <span className="text-xs font-medium truncate">Doctors</span>
          </button>

          {/* Favorites */}
          <Link
            href="#"
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors p-2 min-w-0"
          >
            <img
              width={20}
              height={20}
              src='/favorite.svg'
            />
            <span className="text-xs font-medium truncate">Favorites</span>
          </Link>

          {/* Profile/Auth */}
          <div className="flex flex-col items-center gap-1 p-2 min-w-0">
            <SignedOut>
              <SignInButton>
                <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                  <FaUser className="text-lg" />
                  <span className="text-xs font-medium truncate">{t('signIn')}</span>
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex flex-col items-center gap-1">
                <img
                  width={20}
                  height={20}
                  src='/profile.svg'
                />
                <span className="text-xs font-medium text-gray-600 truncate">Profile</span>
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar - Logo and Language */}
      <div className="md:hidden bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-blue-600">
            <FaStethoscope className="text-2xl" />
            <span className="text-2xl font-bold tracking-tight">MEDIX</span>
          </Link>
          <ToggleLanguageButton />
        </div>
      </div>
    </>
  );
};

export default ClientNavBar;