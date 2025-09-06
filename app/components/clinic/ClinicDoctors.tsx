'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { DoctorType } from '@/lib/types/doctor';
import { LocalizedString } from '@/lib/types/common';
import Link from 'next/link';

interface ClinicDoctorsProps {
  doctors: DoctorType[];
  clinicId: string;
}

export default function ClinicDoctors({ doctors, clinicId }: ClinicDoctorsProps) {
  const t = useTranslations('clinic');
  const locale = useLocale() as 'en' | 'ar';
  const [showAll, setShowAll] = useState(false);

  // Helper function to extract localized text
  const getLocalizedText = (localizedString: LocalizedString): string => {
    return localizedString.translations[locale] || localizedString.translations.en || '';
  };

  const displayedDoctors = showAll ? doctors : doctors.slice(0, 6);

  if (!doctors || doctors.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{t('noDoctors')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{t('doctors')}</h2>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {doctors.length} {t('doctorsCount')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedDoctors.map((doctor) => {
          const doctorName = getLocalizedText(doctor.fullName);
          const doctorSpecialty = getLocalizedText(doctor.specialty);
          const doctorBio = getLocalizedText(doctor.shortBio);
          
          return (
            <div key={doctor._id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="px-6 py-4 pb-3">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {doctor.profileImage ? (
                      <img 
                        src={doctor.profileImage} 
                        alt={`Dr. ${doctorName}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-semibold text-gray-600">
                        {doctorName.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{doctorName}</h3>
                    <p className="text-sm text-gray-600 truncate">{doctorSpecialty}</p>
                    {doctor.isVerified && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                        {t('verified')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 space-y-4">
                {doctorBio && (
                  <p className="text-sm text-gray-700 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {doctorBio}
                  </p>
                )}
                
                <div className="space-y-2">
                  {doctor.consultationFee && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{t('consultationFee')}:</span>
                      <span className="font-semibold text-gray-900">${doctor.consultationFee}</span>
                    </div>
                  )}
                  
                  {doctor.availableForOnlineConsultation && (
                    <span className="inline-flex items-center justify-center w-full px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                      {t('onlineConsultation')}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Link 
                    href={`/doctor-profile/${doctor._id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {t('viewProfile')}
                  </Link>
                  <button 
                    className="flex-1 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 text-center py-2 px-4 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => {
                      // Add booking logic here
                      console.log(`Book appointment with Dr. ${doctorName}`);
                    }}
                  >
                    {t('bookAppointment')}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {doctors.length > 6 && (
        <div className="text-center">
          <button 
            className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 py-2 px-4 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => setShowAll(!showAll)}
            aria-expanded={showAll}
            aria-label={showAll ? t('showLess') : t('showMore')}
          >
            {showAll ? t('showLess') : t('showMore')} 
            ({doctors.length - 6} {t('more')})
          </button>
        </div>
      )}
    </div>
  );
}