import { getTranslations } from "next-intl/server";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FaSearch, FaStethoscope, FaHome, FaUserMd, FaPhone } from "react-icons/fa";
import ToggleLanguageButton from "./ToggleLanguageButton";
import { Link } from "@/i18n/navigation";

const NavBar = async () => {

  const t = await getTranslations('home.navbar');


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
                   href="/home" 
                   className="text-white hover:text-blue-100 transition-colors font-medium px-3 py-2 rounded-md hover:bg-blue-500/20"
                 >
                   Find Doctors
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg z-50">
        <div className="flex items-center justify-around py-2">
          {/* Home */}
          <Link 
            href="/" 
            className="flex flex-col items-center gap-1 text-white hover:text-blue-100 transition-colors p-2"
          >
            <FaHome className="text-xl" />
            <span className="text-xs font-medium">{t('links.home')}</span>
          </Link>
          
          {/* Doctors */}
           <Link 
             href="/home" 
             className="flex flex-col items-center gap-1 text-white hover:text-blue-100 transition-colors p-2"
           >
             <FaUserMd className="text-xl" />
             <span className="text-xs font-medium">Doctors</span>
           </Link>
          
          {/* Search */}
          <button className="flex flex-col items-center gap-1 text-white hover:text-blue-100 transition-colors p-2">
            <FaSearch className="text-xl" />
            <span className="text-xs font-medium">Search</span>
          </button>
          
          {/* Contact */}
          <Link 
            href="#" 
            className="flex flex-col items-center gap-1 text-white hover:text-blue-100 transition-colors p-2"
          >
            <FaPhone className="text-xl" />
            <span className="text-xs font-medium">{t('links.contact')}</span>
          </Link>
          
          {/* Profile/Auth */}
          <div className="flex flex-col items-center gap-1 p-2">
            <SignedOut>
              <SignInButton>
                <button className="flex flex-col items-center gap-1 text-white hover:text-blue-100 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xs font-bold">?</span>
                  </div>
                  <span className="text-xs font-medium">{t('signIn')}</span>
                </button>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <div className="flex flex-col items-center gap-1">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-6 h-6 ring-1 ring-white/30"
                    }
                  }}
                />
                <span className="text-xs font-medium text-white">Profile</span>
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar - Logo and Language */}
      <div className="md:hidden bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-white">
            <FaStethoscope className="text-xl" />
            <span className="text-xl font-bold tracking-tight">MEDIX</span>
          </Link>
          <ToggleLanguageButton />
        </div>
      </div>
    </>
  );
};

export default NavBar;
