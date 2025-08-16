import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FaSearch, FaStethoscope } from "react-icons/fa";
import ToggleLanguageButton from "./ToggleLanguageButton";

const NavBar = async () => {

  const t = await getTranslations('home.navbar');


  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors">
              <FaStethoscope className="text-2xl" />
              <span className="text-2xl font-bold tracking-tight">MEDIX</span>
            </Link>
            
            {/* Navigation Links */}
            <div className="hidden md:flex gap-8">
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
                {t('links.services')}
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
            <div className="hidden sm:flex items-center relative">
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
  );
};

export default NavBar;
