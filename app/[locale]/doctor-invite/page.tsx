'use client';
import { useState } from 'react';
import { FaUserMd, FaStethoscope, FaHeart, FaShieldAlt, FaAward, FaUsers, FaGlobe, FaHandshake, FaChartLine, FaLightbulb, FaRocket, FaStar, FaCheckCircle, FaTimes, FaMedal, FaWhatsapp } from 'react-icons/fa';
// Or use: FaAward, FaMedal, FaBadgeCheck, FaIdBadge, or FaUserCheck
import { useRouter } from 'next/navigation';

export default function DoctorInvitePage() {
  const [showOptions, setShowOptions] = useState(false);
  const [showFieldsList, setShowFieldsList] = useState(false);
  const router = useRouter();

  const handleJoinClick = () => {
    setShowOptions(true);
  };

  const handleQuickStart = () => {
    router.push('/sign-up?role=doctor');
  };

  const handleAssistedEntry = () => {
    setShowFieldsList(true);
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
                onClick={() => setShowFieldsList(false)}
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
          <div className="max-w-4xl mx-auto text-center">
            {/* Medical Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
              <FaUserMd className="text-3xl text-white" />
            </div>
            
            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Build Your Medical
              <span className="block text-blue-200">Reputation</span>
              <span className="block text-lg md:text-2xl lg:text-3xl font-normal mt-3 text-blue-100">
                In a trusted hub — not on ads or social feeds
              </span>
            </h1>
            
            {/* Value Proposition */}
            <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Medix helps licensed doctors in Saudi Arabia showcase their expertise, 
              attract more patients, and strengthen credibility — all in a professional, compliant platform.
            </p>
            
            {/* CTA Button */}
            {!showOptions ? (
              <button 
                onClick={handleJoinClick}
                className="group relative inline-flex items-center justify-center px-6 py-3 text-base md:text-lg font-semibold text-blue-600 bg-white rounded-full hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
              >
                <span className="mr-2">👉</span>
                Accept & Join Medix — Free for Early Doctors & Clinics
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
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
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Challenges You Face Every Day
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-2xl text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Limited Patient Reach</h3>
              <p className="text-gray-600">Struggling to connect with patients who need your specialized care</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="text-2xl text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Administrative Burden</h3>
              <p className="text-gray-600">Spending too much time on paperwork instead of patient care</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaGlobe className="text-2xl text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Digital Presence</h3>
              <p className="text-gray-600">Difficulty establishing a strong online presence and reputation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction to Medix */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800">
            A professional platform built for Saudi doctors and clinics.
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Medix is the first smart healthcare discovery and reputation platform in Saudi Arabia. It gives doctors a professional space to showcase their credentials, services, and experience — and connect directly with patients.
          </p>
        </div>
      </section>

      {/* Credibility & Trust Signals */}
      <section className="px-6 py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-blue-800">
            Trusted, Compliant, and Supported.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Monsha'at Card */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="mb-6">
                <img 
                  src="/monshaat.png" 
                  alt="Monsha'at" 
                  className="h-16 mx-auto object-contain"
                />
              </div>
              <p className="text-lg font-semibold text-gray-800">
                Backed by Monsha'at Program
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Supporting Saudi entrepreneurs and startups
              </p>
            </div>

            {/* Misk Card */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="mb-6">
                <img 
                  src="/misk.png" 
                  alt="Misk Launchpad" 
                  className="h-16 mx-auto object-contain"
                />
              </div>
              <p className="text-lg font-semibold text-gray-800">
                Misk Launchpad Program
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Accelerating innovation in Saudi Arabia
              </p>
            </div>

            {/* PDPL Compliance Card */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="mb-6">
                <img 
                  src="/pdpl.jpeg" 
                  alt="PDPL Compliant" 
                  className="h-16 mx-auto object-contain"
                />
              </div>
              <p className="text-lg font-semibold text-gray-800">
                Fully PDPL Compliant
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Saudi data protection regulations certified
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaMedal className="text-blue-500 text-3xl mx-auto mb-4" />
              <h3 className="font-bold mb-2">Verified Professional Profiles</h3>
              <p className="text-gray-600">Highlight credentials, subspecialties, and achievements.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaWhatsapp className="text-green-500 text-3xl mx-auto mb-4" />
              <h3 className="font-bold mb-2">Direct Patient Contact</h3>
              <p className="text-gray-600">Patients reach you via WhatsApp or phone — no middlemen.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaUsers className="text-purple-500 text-3xl mx-auto mb-4" />
              <h3 className="font-bold mb-2">Priority Placement</h3>
              <p className="text-gray-600">Early doctors appear first in Medix results.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaShieldAlt className="text-red-500 text-3xl mx-auto mb-4" />
              <h3 className="font-bold mb-2">Professional & Secure</h3>
              <p className="text-gray-600">Built for healthcare, not ads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      {/* Hero Section */}
     

      {/* Main Content */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Turn credibility into growth.
          </h2>
          <p className="text-lg md:text-xl leading-relaxed">
            With Medix, you gain more visibility, attract the right patients, and build lasting trust. Instead of competing in advertising spaces, you stand out as a licensed, trusted professional.
          </p>
        </div>
      </section>

      {/* How It Works - Updated to show after main CTA */}
      {showOptions && (
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-blue-800">
              Choose Your Registration Method
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-8 rounded-lg text-center border-2 border-blue-200">
                <h3 className="text-xl font-bold mb-4">Option A: Quick Start</h3>
                <p className="text-gray-700 mb-6">Create your account with email/password, then fill out a 3-minute professional form to go live immediately.</p>
                <button 
                  onClick={handleQuickStart}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full"
                >
                  Create Account & Start →
                </button>
              </div>
              <div className="bg-green-50 p-8 rounded-lg text-center border-2 border-green-200">
                <h3 className="text-xl font-bold mb-4">Option B: Assisted Entry</h3>
                <p className="text-gray-700 mb-6">Send us your existing brochure or website, and our team will set up your complete profile for you.</p>
                <button 
                  onClick={handleAssistedEntry}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors w-full"
                >
                  Get Professional Help →
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final Trust Section */}
      <footer className="px-6 py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <span className="font-bold text-blue-600">Monsha'at</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <span className="font-bold text-green-600">Misk</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <span className="font-bold text-purple-600">SDAIA</span>
            </div>
          </div>
          <p className="text-gray-600 mb-8">
            Medix only collects and displays verified professional information. No patient data. 100% PDPL compliant.
          </p>
          {!showOptions && (
            <button 
              onClick={handleJoinClick}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Join Medix Today — Free for Early Doctors & Clinics
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}