'use client';
import { useEffect, useState } from 'react';
import { FaUserMd, FaStethoscope, FaHeart, FaShieldAlt, FaAward, FaUsers, FaGlobe, FaHandshake, FaChartLine, FaLightbulb, FaRocket, FaStar, FaCheckCircle, FaTimes, FaMedal, FaWhatsapp } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function DoctorInvitePage() {
  const [showOptions, setShowOptions] = useState(false);
  const [showFieldsList, setShowFieldsList] = useState(false);
  const router = useRouter();

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
                // Replace the current onClick handler:
                // First Back button (X button) - already fixed correctly:
                onClick={() => {
                  setShowFieldsList(false);
                  setShowOptions(true);
                }}
                
                // Second Back button ("Back to Options") - needs the same fix:
                // Replace line 254:
                // onClick={() => setShowFieldsList(false)}
                
                // // With:
                // onClick={() => {
                //   setShowFieldsList(false);
                //   setShowOptions(true);
                // }}
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
                The form is divided into 4 easy steps to make the process smooth and manageable.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleQuickStart}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Start Registration Now
                </button>
                <button
                  onClick={() => setShowFieldsList(false)}
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white min-h-screen flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        
        <div className="relative px-6 py-16 w-full">
          <div className="max-w-6xl mx-auto text-center px-4">
            {/* Saudi Doctor Photo - Larger and more prominent */}
            {/* <div className="inline-flex items-center justify-center w-32 h-32 bg-white/20 rounded-full mb-8 backdrop-blur-sm overflow-hidden border-4 border-white/30 shadow-2xl">
              <img 
                src="/ahmad.jpg" 
                alt="Saudi Doctor" 
                className="w-full h-full object-cover rounded-full"
              />
            </div> */}
            
            {/* Main Headline - Better structured */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
                <span className="block text-white">Build your medical reputation</span>
                <span className="block text-blue-200 text-3xl md:text-5xl lg:text-6xl">in a trusted hub</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 font-light italic mt-4">
                — not on ads or social feeds.
              </p>
            </div>
            
            {/* Sub-headline - Better formatted with cards */}
            <div className=" rounded-2xl p-8 mb-8 border border-white/20">
              <p className="text-lg md:text-xl text-blue-50 leading-relaxed mb-6">
                Medix helps doctors in Saudi Arabia:
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-green-500/20 rounded-xl p-4 border border-green-300/30">
                  <span className="font-bold text-green-300 text-lg">Showcase Expertise</span>
                  <p className="text-green-100 text-sm mt-2">Licensed doctors in Saudi Arabia</p>
                </div>
                <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-300/30">
                  <span className="font-bold text-blue-300 text-lg">Attract More Patients</span>
                  <p className="text-blue-100 text-sm mt-2">Professional visibility</p>
                </div>
                <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-300/30">
                  <span className="font-bold text-yellow-300 text-lg">Strengthen Credibility</span>
                  <p className="text-yellow-100 text-sm mt-2">Compliant platform</p>
                </div>
              </div>
            </div>
            
            {/* Updated CTA Button */}
            {!showOptions ? (
              <div className="flex flex-col items-center">
                <button 
                  onClick={handleJoinClick}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-xl md:text-2xl font-bold text-blue-600 bg-white rounded-full hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 mb-2"
                >
                  JOIN MEDIX NOW
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <p className="text-sm text-blue-200">Free for early doctors & clinics</p>
              </div>
            ) : (
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 max-w-2xl mx-auto">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Choose Your Onboarding Option</h2>
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
            )}
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-8 fill-blue-50">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Pain Point Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
              The Problem
            </h2>
          </div>
          
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 md:p-8 mb-8 border-l-4 border-red-400">
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center">
              <strong className="text-red-600">Doctors spend years building expertise, yet visibility often depends on ads, influencers, or generic directories.</strong>
              <br className="hidden md:block" />
              <span className="block mt-2">
                <strong className="text-red-600">These unprofessional channels dilute credibility and undervalue licensed specialists.</strong>
              </span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 rounded-xl p-6 text-center border border-red-200">
              <FaTimes className="text-red-500 text-3xl mx-auto mb-3" />
              <h3 className="font-bold text-red-700 mb-3">Current Reality</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Generic directories</li>
                <li>• Social media ads</li>
                <li>• Unprofessional channels</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-200">
              <FaCheckCircle className="text-blue-500 text-3xl mx-auto mb-3" />
              <h3 className="font-bold text-blue-700 mb-3">With Medix</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Professional platform</li>
                <li>• Verified credentials</li>
                <li>• Healthcare-focused</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <FaShieldAlt className="text-blue-600 text-2xl" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              A professional platform built for Saudi doctors and clinics.
            </h2>
          </div>
          
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-blue-200 mb-8">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
              <strong className="text-blue-600">Medix is the first smart healthcare discovery and reputation platform in Saudi Arabia.</strong>
              <br className="hidden md:block" />
              <span className="block mt-2">
                It gives doctors a professional space to showcase their credentials, services, and experience — and connect directly with patients.
              </span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow">
              <FaAward className="text-blue-500 text-2xl mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Professional Showcase</h3>
              <p className="text-xs text-gray-600">Display credentials & expertise</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow">
              <FaHandshake className="text-green-500 text-2xl mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Direct Connection</h3>
              <p className="text-xs text-gray-600">Connect with patients directly</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm text-center hover:shadow-md transition-shadow">
              <FaUsers className="text-purple-500 text-2xl mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Trusted Environment</h3>
              <p className="text-xs text-gray-600">Built for healthcare professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Credibility Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
            Trusted by Leading Organizations
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border hover:shadow-xl transition-shadow">
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

            <div className="bg-white p-8 rounded-lg shadow-lg text-center border hover:shadow-xl transition-shadow">
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

            <div className="bg-white p-8 rounded-lg shadow-lg text-center border hover:shadow-xl transition-shadow">
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

          {/* Other Value Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border hover:shadow-xl transition-shadow">
              <FaWhatsapp className="text-green-500 text-3xl mx-auto mb-4" />
              <h3 className="font-bold mb-2 text-gray-800 uppercase">DIRECT PATIENT CONTACT</h3>
              <p className="text-gray-600">Patients reach you via WhatsApp or phone — no middlemen.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border hover:shadow-xl transition-shadow">
              <FaUsers className="text-purple-500 text-3xl mx-auto mb-4" />
              <h3 className="font-bold mb-2 text-gray-800 uppercase">PRIORITY PLACEMENT</h3>
              <p className="text-gray-600">Early doctors appear first in Medix results.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border hover:shadow-xl transition-shadow">
              <FaShieldAlt className="text-red-500 text-3xl mx-auto mb-4" />
              <h3 className="font-bold mb-2 text-gray-800 uppercase">PROFESSIONAL & SECURE</h3>
              <p className="text-gray-600">Built for healthcare, not ads.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}