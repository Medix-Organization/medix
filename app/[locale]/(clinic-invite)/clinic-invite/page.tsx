'use client';
import { useEffect, useState } from 'react';
import {  FaCheckCircle, FaTimes } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import ToggleLanguageButton from '@/app/components/ToggleLanguageButton';
import ContactFormOption from '@/app/components/doctor-invite-components/ContactFormOption';
import FormFieldsDisplay from '@/app/components/doctor-invite-components/FormFieldsDisplay';

export default function DoctorInvitePage() {
  const [showFieldsList, setShowFieldsList] = useState(false);
  const t = useTranslations('clinicInvite');

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state) {
        setShowFieldsList(state.showFieldsList || false);
      } else {
        // Default state
        setShowFieldsList(false);
      }
    };
  
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  
  const handleQuickStart = () => {
    window.open('/clinic/sign-up', '_blank');
  };
  
  const handleAssistedEntry = () => {
    setShowFieldsList(true);
    window.history.pushState({ showFieldsList: true }, '', window.location.pathname);
  };

  if (showFieldsList) {
    return (
      <FormFieldsDisplay 
        setShowFieldsList={setShowFieldsList}
        setShowOptions={() => {}}
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
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-indigo-100 text-gray-800 py-20 px-4 overflow-hidden border-b border-blue-100">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-blue-900">
               {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-blue-800 mb-8">
             {t("hero.subtitle")}
            </p>
            
            {/* <button 
              onClick={handleQuickStart}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t("hero.ctaButton")}
            </button> */}
            
            {/* Value Cards */}
          
            
            {/* Value Proposition Cards */}
            <div className="mt-16">
             
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Row 1: Core Benefits */}
                <div className="bg-white text-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-emerald-400 hover:border-emerald-500">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏥</span>
                  </div>
                  <h3 className="text-xl font-bold text-emerald-600 mb-4">
                    {t('benefits.verifiedProfile')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('benefits.verifiedProfileDesc')}
                  </p>
                </div>
                
                <div className="bg-white text-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-400 hover:border-blue-500">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-600 mb-4">
                    {t('benefits.highlightServices')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('benefits.highlightServicesDesc')}
                  </p>
                </div>
                
                {/* Row 2: Growth & Advantage */}
                <div className="bg-white text-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-indigo-400 hover:border-indigo-500">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h3 className="text-xl font-bold text-indigo-600 mb-4">
                    {t('benefits.attractPatients')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('benefits.attractPatientsDesc')}
                  </p>
                </div>
                
                <div className="bg-white text-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-purple-400 hover:border-purple-500">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-600 mb-4">
                    {t('benefits.earlyAdopter')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('benefits.earlyAdopterDesc')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Contact Form - Directly displayed instead of button/options */}
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto mt-10 border border-blue-200">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 text-center">Get Started with Medix</h2>
              <ContactFormOption />
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Compliance Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('trust.title')}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
            {t('trust.subtitle')}
          </p>

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

      {/* Final CTA Section */}
      
    </div>
  );
}