'use client';

import { ClinicType } from '@/lib/types/clinic';
import { LocalizedString } from '@/lib/types/common';
import { useTranslations, useLocale } from 'next-intl';
import { FiMapPin, FiPhone, FiGlobe, FiStar, FiClock } from 'react-icons/fi';

interface ClinicHeaderProps {
  clinic: ClinicType;
  locale: string;
}

export default function ClinicHeader({ clinic, locale }: ClinicHeaderProps) {
  const t = useTranslations('clinic');
  const currentLocale = useLocale();
  
  // Helper function to extract localized text
  const getLocalizedText = (localizedString: LocalizedString): string => {
    if (currentLocale === 'ar' && localizedString.translations.ar) {
      return localizedString.translations.ar;
    }
    return localizedString.translations.en || '';
  };
  
  const clinicName = clinic.displayName?.text || clinic.name || t('unnamed');
  const address = clinic.formattedAddress || '';
  const phone = clinic.nationalPhoneNumber || clinic.internationalPhoneNumber || clinic.contactPhone;
  const website = clinic.website;
  const rating = clinic.rating || 0;
  const reviewCount = clinic.userRatingsTotal || 0;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
      {/* Clinic Info - No more cover image */}
      <div className="p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            {/* Status Badge - moved to top */}
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                clinic.businessStatus === 'OPERATIONAL' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {clinic.businessStatus === 'OPERATIONAL' ? t('status.open') : t('status.closed')}
              </span>
            </div>
            
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {clinicName}
            </h1>
            
            {/* Rating */}
            {rating > 0 && (
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {rating.toFixed(1)}
                </span>
                <span className="text-gray-600">
                  ({reviewCount} {t('reviews')})
                </span>
              </div>
            )}

            {/* Contact Info */}
            <div className="space-y-2">
              {address && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <FiMapPin className="w-4 h-4" />
                  <span>{address}</span>
                </div>
              )}
              
              {phone && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <FiPhone className="w-4 h-4" />
                  <a href={`tel:${phone}`} className="hover:text-blue-600">
                    {phone}
                  </a>
                </div>
              )}
              
              {website && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <FiGlobe className="w-4 h-4" />
                  <a 
                    href={website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    {t('visitWebsite')}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons - Removed Book Appointment */}
          <div className="mt-6 lg:mt-0 lg:ml-6 flex flex-col space-y-3">
            <button 
              onClick={() => {
                const clinicAddress = address; // Use the already defined address variable
                const encodedAddress = encodeURIComponent(clinicAddress);
                window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {t('actions.getDirections')}
            </button>
            
            <button 
              onClick={() => {
                if (phone) {
                  window.open(`tel:${phone}`, '_self');
                }
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {t('actions.callNow')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}