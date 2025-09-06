

'use client';

import { FaCheckCircle, FaWhatsapp, FaPhone, FaHospital, FaShieldAlt, FaCertificate, FaUsers } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ClinicInvitePageProps {
  params: Promise<{ locale: string }>;
}

export default function ClinicInvitePage({ params }: ClinicInvitePageProps) {
  const router = useRouter();
  const [locale, setLocale] = useState<string>('');
  
  useEffect(() => {
    params.then(({ locale }) => setLocale(locale));
  }, [params]);

  const handleJoinClick = () => {
    if (locale) {
      router.push(`/${locale}/sign-up?role=clinic`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="px-6 py-16 text-center bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Build your clinic's reputation in a trusted hub — not on ads or social feeds.
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Medix helps licensed clinics in Saudi Arabia showcase their services, attract more patients, and strengthen credibility — all in a professional, compliant platform.
          </p>
          <button 
            onClick={handleJoinClick}
            className="bg-white text-green-600 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-green-50 transition-colors shadow-lg"
          >
            👉 Accept & Join Medix — Free for Early Doctors & Clinics
          </button>
        </div>
      </section>

      {/* Pain Point Section */}
      <section className="px-6 py-16 bg-red-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center mb-8">
            <div className="bg-red-100 p-4 rounded-full mr-8">
              <FaUsers className="text-red-500 text-3xl" />
            </div>
            <div className="text-4xl">→</div>
            <div className="bg-green-100 p-4 rounded-full ml-8">
              <FaHospital className="text-green-500 text-3xl" />
            </div>
          </div>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            <strong>Clinics invest heavily in equipment and expertise, yet visibility often depends on ads, influencers, or generic directories.</strong> These unprofessional channels dilute credibility and undervalue licensed healthcare facilities.
          </p>
        </div>
      </section>

      {/* Introduction to Medix */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-800">
            A professional platform built for Saudi doctors and clinics.
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Medix is the first smart healthcare discovery and reputation platform in Saudi Arabia. It gives clinics a professional space to showcase their services, facilities, and expertise — and connect directly with patients.
          </p>
        </div>
      </section>

      {/* Credibility & Trust Signals */}
      <section className="px-6 py-16 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-green-800">
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
              <FaCertificate className="text-green-500 text-3xl mx-auto mb-4" />
              <h3 className="font-bold mb-2">Verified Professional Profiles</h3>
              <p className="text-gray-600">Highlight services, facilities, and achievements.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaWhatsapp className="text-green-500 text-3xl mx-auto mb-4" />
              <h3 className="font-bold mb-2">Direct Patient Contact</h3>
              <p className="text-gray-600">Patients reach you via WhatsApp or phone — no middlemen.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaUsers className="text-purple-500 text-3xl mx-auto mb-4" />
              <h3 className="font-bold mb-2">Priority Placement</h3>
              <p className="text-gray-600">Early clinics appear first in Medix results.</p>
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
      <section className="px-6 py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Turn credibility into growth.
          </h2>
          <p className="text-lg md:text-xl leading-relaxed">
            With Medix, you gain more visibility, attract the right patients, and build lasting trust. Instead of competing in advertising spaces, you stand out as a licensed, trusted healthcare facility.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-green-800">
            Getting started takes minutes.
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Option A: Fill Quick Form</h3>
              <p className="text-gray-700 mb-6">3 minutes, go live immediately</p>
              <button 
                onClick={handleJoinClick}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Quick Start
              </button>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Option B: Assisted Entry</h3>
              <p className="text-gray-700 mb-6">Send us your brochure/website, we set it up</p>
              <button 
                onClick={handleJoinClick}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Help
              </button>
            </div>
          </div>
        </div>
      </section>

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
          <button 
            onClick={handleJoinClick}
            className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            Join Medix Today — Free for Early Doctors & Clinics
          </button>
        </div>
      </footer>
    </div>
  );
}