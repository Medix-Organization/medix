'use client';
import { useEffect, useState } from 'react';
import { FaUserMd, FaStethoscope, FaHeart, 
  FaShieldAlt, FaAward, FaUsers, FaGlobe, FaHandshake,
   FaChartLine, FaLightbulb, FaRocket, FaStar, FaCheckCircle, FaTimes, FaMedal,
    FaWhatsapp } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import ToggleLanguageButton from '@/app/components/ToggleLanguageButton';

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

  const formFields = [
    {
      category: "Basic Information",
      fields: [
        {
          name: "Full Name",
          description: "Your complete professional name as it appears on your medical license (bilingual: English and Arabic)",
          required: true,
          example: "Dr. Ahmed Mohamed / د. أحمد محمد"
        },
        {
          name: "Medical Specialty",
          description: "Your primary area of medical expertise (bilingual: English and Arabic)",
          required: true,
          example: "Cardiology / أمراض القلب"
        },
        {
          name: "Years of Experience",
          description: "Total number of years practicing medicine",
          required: true,
          example: "15 years"
        },
        {
          name: "License Number",
          description: "Your medical license registration number",
          required: false,
          example: "MD123456789"
        },
        {
          name: "Short Bio",
          description: "Brief description of your practice and expertise (bilingual: English and Arabic)",
          required: false,
          example: "Experienced cardiologist specializing in interventional procedures..."
        }
      ]
    },
    {
      category: "Professional Details",
      fields: [
        {
          name: "Title & Credentials",
          description: "Professional titles and academic credentials (multiple entries allowed)",
          required: false,
          example: "MD, PhD, FACC, Professor"
        },
        {
          name: "Certifications & Fellowships",
          description: "Board certifications and fellowship training (multiple entries allowed)",
          required: false,
          example: "American Board of Internal Medicine, Interventional Cardiology Fellowship"
        },
        {
          name: "Professional Memberships",
          description: "Medical associations and professional organizations (multiple entries allowed)",
          required: false,
          example: "American College of Cardiology, European Society of Cardiology"
        },
        {
          name: "Awards & Recognition",
          description: "Professional awards and recognitions received (multiple entries allowed)",
          required: false,
          example: "Best Doctor Award 2023, Excellence in Patient Care"
        },
        {
          name: "Devices & Materials",
          description: "Specialized medical devices or materials you work with (multiple entries allowed)",
          required: false,
          example: "Cardiac Stents, Pacemakers, Defibrillators"
        },
        {
          name: "Languages",
          description: "Languages you can communicate with patients in (multiple entries allowed)",
          required: false,
          example: "English, Arabic, French"
        }
      ]
    },
    {
      category: "Contact & Consultation",
      fields: [
        {
          name: "Phone Number",
          description: "Professional contact number for patient inquiries",
          required: false,
          example: "+1-555-123-4567"
        },
        {
          name: "Consultation Fee",
          description: "Your standard consultation fee amount",
          required: false,
          example: "150 (in your local currency)"
        },
        {
          name: "Online Consultation Availability",
          description: "Whether you offer telemedicine/online consultations",
          required: false,
          example: "Yes/No checkbox"
        }
      ]
    },
    {
      category: "Social & Professional Links",
      fields: [
        {
          name: "LinkedIn Profile",
          description: "Your professional LinkedIn profile URL",
          required: false,
          example: "https://linkedin.com/in/dr-ahmed-mohamed"
        },
        {
          name: "X (Twitter) Profile",
          description: "Your professional X/Twitter profile URL",
          required: false,
          example: "https://x.com/dr_ahmed_cardio"
        },
        {
          name: "Instagram Profile",
          description: "Your professional Instagram profile URL",
          required: false,
          example: "https://instagram.com/dr.ahmed.cardiology"
        },
        {
          name: "Facebook Profile",
          description: "Your professional Facebook profile URL",
          required: false,
          example: "https://facebook.com/dr.ahmed.cardiology"
        },
        {
          name: "ResearchGate Profile",
          description: "Your ResearchGate academic profile URL",
          required: false,
          example: "https://researchgate.net/profile/Ahmed-Mohamed"
        },
        {
          name: "Clinic Website",
          description: "Your clinic or practice website URL",
          required: false,
          example: "https://ahmedcardiology.com"
        }
      ]
    },
    {
      category: "Clinic Association",
      fields: [
        {
          name: "Clinic Associations",
          description: "Clinics or hospitals where you practice (at least one required)",
          required: true,
          example: "City General Hospital, Ahmed Cardiology Clinic"
        }
      ]
    }
  ];

  if (showFieldsList) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Onboarding Form Fields</h1>
                <p className="text-gray-600">Here are all the fields you'll need to complete during the onboarding process:</p>
              </div>
              <button
                onClick={() => {
                  setShowFieldsList(false);
                  setShowOptions(true);
                }}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="space-y-8">
              {formFields.map((category, categoryIndex) => (
                <div key={categoryIndex} className="border-l-4 border-blue-500 pl-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FaCheckCircle className="text-blue-500 mr-2" />
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-gray-900 flex items-center">
                            {field.name}
                            {field.required && (
                              <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
                                REQUIRED
                              </span>
                            )}
                            {!field.required && (
                              <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                Optional
                              </span>
                            )}
                          </h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{field.description}</p>
                        <div className="bg-blue-50 border border-blue-200 rounded p-2">
                          <p className="text-xs text-blue-800">
                            <strong>Example:</strong> {field.example}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Ready to get started?</h3>
              <p className="text-blue-800 text-sm mb-4">
                Now that you know what information you'll need, you can proceed with the registration process. 
                The form is divided into 3 easy steps to make the process smooth and manageable.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleQuickStart}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Start Registration Now
                </button>
                <button
                  onClick={() => {
                    setShowFieldsList(false);
                    setShowOptions(true);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Back to Options
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              Build Your Medical Reputation In A Trusted Hub 
            </h1>
            <p className='text-l md:text-xl font-bold mb-6 text-blue-800'>
               - Not On Ads Or Social Feeds -
            </p>
            <p className="text-xl md:text-2xl text-blue-800 mb-8">
              Medix helps licensed doctors in Saudi Arabia
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
              <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto mt-10 border border-blue-200">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">Choose Your Onboarding Option</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border-2 border-blue-200 rounded-xl p-4 hover:border-blue-400 transition-colors bg-white">
                    <FaRocket className="text-2xl text-blue-600 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Start</h3>
                    <p className="text-gray-600 mb-3 text-sm">Jump right into the registration process and complete your profile step by step.</p>
                    <button
                      onClick={handleQuickStart}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                    >
                      Sign Up & Start Now
                    </button>
                  </div>
                  <div className="border-2 border-indigo-200 rounded-xl p-4 hover:border-indigo-400 transition-colors bg-white">
                    <FaLightbulb className="text-2xl text-indigo-600 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Assisted Entry</h3>
                    <p className="text-gray-600 mb-3 text-sm">See all required fields and prepare your information before starting the registration.</p>
                    <button
                      onClick={handleAssistedEntry}
                      className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
                    >
                      View Required Fields
                    </button>
                  </div>
                </div>
              </div>
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
          <div className="text-center mb-12">
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="border-2 border-blue-200 rounded-xl p-4 hover:border-blue-400 transition-colors bg-white">
                <FaRocket className="text-2xl text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Start</h3>
                <p className="text-gray-600 mb-3 text-sm">Jump right into the registration process and complete your profile step by step.</p>
                <button
                  onClick={handleQuickStart}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  Sign Up & Start Now
                </button>
              </div>
              <div className="border-2 border-green-200 rounded-xl p-4 hover:border-green-400 transition-colors bg-white">
                <FaLightbulb className="text-2xl text-green-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Assisted Entry</h3>
                <p className="text-gray-600 mb-3 text-sm">See all required fields and prepare your information before starting the registration.</p>
                <button
                  onClick={handleAssistedEntry}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                >
                  View Required Fields
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}