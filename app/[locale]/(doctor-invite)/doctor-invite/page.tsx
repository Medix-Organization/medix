'use client';
import { useEffect, useState } from 'react';
import { FaUserMd, FaStethoscope, FaHeart, 
  FaShieldAlt, FaAward, FaUsers, FaGlobe, FaHandshake,
   FaChartLine, FaLightbulb, FaRocket, FaStar, FaCheckCircle, FaTimes, FaMedal,
    FaWhatsapp } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import ToggleLanguageButton from '@/app/components/ToggleLanguageButton';
import { formFields } from '@/app/components/doctor-invite-components/formfields';
import OnboardingOptions from '@/app/components/doctor-invite-components/OnboardingOptions';
import FormFieldsDisplay from '@/app/components/doctor-invite-components/FormFieldsDisplay';

export default function DoctorInvitePage() {
  const [showOptions, setShowOptions] = useState(false);
  const [showFieldsList, setShowFieldsList] = useState(false);
  const router = useRouter();
  const t = useTranslations('doctorInvite');

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state) {
        setShowOptions(state.showOptions || false);
        setShowFieldsList(state.showFieldsList || false);
      } else {
        // Default state
        setShowOptions(false);
        setShowFieldsList(false);
      }
    };
  
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  
  // Update your state setters to also update history
  const handleJoinClick = () => {
    setShowOptions(true);
    window.history.pushState({ showOptions: true, showFieldsList: false }, '', window.location.pathname);
  };
  
  const handleQuickStart = () => {
    window.open('/sign-up?role=doctor', '_blank');
  };
  
  const handleAssistedEntry = () => {
    setShowFieldsList(true);
    window.history.pushState({ showOptions: true, showFieldsList: true }, '', window.location.pathname);
  };

 

  if (showFieldsList) {
    return (
      <FormFieldsDisplay 
        setShowFieldsList={setShowFieldsList}
        setShowOptions={setShowOptions}
        handleQuickStart={handleQuickStart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Language Toggle Button */}
      <div className="absolute top-4 right-4 z-50">
        <ToggleLanguageButton />
      </div>
      
      {/* Hero Section - Updated with blueish background */}
      <section className="relative bg-gradient-to-r from-blue-50 to-indigo-100 text-gray-800 py-20 px-4 overflow-hidden border-b border-blue-100">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-blue-900">
               {t("hero.title")}
            </h1>
            <p className='text-l md:text-xl font-bold mb-6 text-blue-800'>
                {t("hero.subtitle_separator")} 
            </p>
            <p className="text-xl md:text-2xl text-blue-800 mb-8">
             {t("hero.subtitle")}
            </p>
            
            {/* Benefits Cards */}
            <div className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Showcase Expertise Card */}
                <div className="bg-white text-center p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-emerald-400">
                  <h3 className="text-xl font-bold text-emerald-500 mb-3">
                    {t('benefits.showcaseExpertise')}
                  </h3>
                  <p className="font-light italic text-gray-600 tracking-wide">
                    {t('benefits.showcaseExpertiseDesc')}
                  </p>
                </div>
                
                {/* Attract More Patients Card */}
                <div className="bg-white text-center p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-blue-400">
                  <h3 className="text-xl font-bold text-blue-500 mb-3">
                    {t('benefits.attractPatients')}
                  </h3>
                  <p className="font-light italic text-gray-600 tracking-wide">
                    {t('benefits.attractPatientsDesc')}
                  </p>
                </div>
                
                {/* Strengthen Credibility Card */}
                <div className="bg-white text-center p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-indigo-400">
                  <h3 className="text-xl font-bold text-indigo-500 mb-3">
                    {t('benefits.strengthenCredibility')}
                  </h3>
                  <p className="font-light italic text-gray-600 tracking-wide">
                    {t('benefits.strengthenCredibilityDesc')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Updated CTA Button */}
            {!showOptions ? (
              <div className="flex flex-col items-center mt-10">
                <button 
                  onClick={handleJoinClick}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-xl md:text-2xl font-bold text-white bg-blue-600 rounded-full hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 mb-2 hover:text-white"
                >
                  {t('hero.joinButton')}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <p className="text-sm text-blue-700">{t('hero.earlyAccess')}</p>
              </div>
            ) : (
               <OnboardingOptions 
                handleQuickStart={handleQuickStart}
                handleAssistedEntry={handleAssistedEntry}
                t={t}
              />
            )}
          </div>
        </div>
      </section>

      {/* Pain Point Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">{t('problem.title')}</span>
            </h2>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 md:p-8 mb-8 border-l-4 border-purple-400 shadow-md">
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center">
              <strong className="text-indigo-600">{t('problem.description1')}</strong>
              <br className="hidden md:block" />
              <span className="block mt-2">
                <strong className="text-purple-600">{t('problem.description2')}</strong>
              </span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 text-center border-2 border-red-400 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <FaTimes className="text-rose-500 text-3xl mx-auto mb-3" />
              <h3 className="font-bold text-rose-600 mb-3 text-xl">{t('problem.currentReality')}</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  t('problem.currentRealityItems.0'),
                  t('problem.currentRealityItems.1'),
                  t('problem.currentRealityItems.2')
                ].map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center border-2 border-green-400 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <FaCheckCircle className="text-teal-500 text-3xl mx-auto mb-3" />
              <h3 className="font-bold text-teal-600 mb-3 text-xl">{t('problem.withMedix')}</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  t('problem.withMedixItems.0'),
                  t('problem.withMedixItems.1'),
                  t('problem.withMedixItems.2')
                ].map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Credibility Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 font-serif tracking-wide">
            {t('trustedBy')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center border-2 border-blue-300 hover:shadow-xl hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1">
              <div className="mb-4">
                <img 
                  src="/monshaat.png" 
                  alt="Monsha'at Partner" 
                  className="h-12 mx-auto object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-700">
                Monsha'at Partner
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Accelerating innovation in Saudi Arabia
              </p>
            </div>
  
            <div className="bg-white p-8 rounded-lg shadow-md text-center border-2 border-blue-300 hover:shadow-xl hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1">
              <div className="mb-4">
                <img 
                  src="/pdpl.jpeg" 
                  alt="PDPL Compliant" 
                  className="h-12 mx-auto object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-700">
                Fully PDPL Compliant
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Saudi data protection regulations certified
              </p>
            </div>
  
            <div className="bg-white p-8 rounded-lg shadow-md text-center border-2 border-blue-300 hover:shadow-xl hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1">
              <div className="mb-4">
                <img 
                  src="/misk.png" 
                  alt="Misk Partner" 
                  className="h-12 mx-auto object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-700">
                Misk Partner
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supporting Saudi Vision 2030
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="px-6 py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          {/* Mid-page CTA */}
         <OnboardingOptions 
                handleQuickStart={handleQuickStart}
                handleAssistedEntry={handleAssistedEntry}
                t={t}
              />
        </div>
      </section>
    </div>
  );
}