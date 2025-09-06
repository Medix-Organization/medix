'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { ClinicType } from '@/lib/types/clinic';
import { LocalizedString } from '@/lib/types/common';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaGlobe, 
  FaClock, 
  FaStar, 
  FaUsers, 
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle
} from 'react-icons/fa';

interface ClinicInfoProps {
  clinic: ClinicType;
}

export default function ClinicInfo({ clinic }: ClinicInfoProps) {
  const t = useTranslations('clinic');
  const locale = useLocale();

  // Helper function to extract localized text
  const getLocalizedText = (localizedString: LocalizedString): string => {
    if (locale === 'ar' && localizedString.translations.ar) {
      return localizedString.translations.ar;
    }
    return localizedString.translations.en || '';
  };

  const getStatusBadge = () => {
    if (!clinic.isActive) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <FaTimesCircle className="h-3 w-3 mr-1" />
          {t('inactive')}
        </span>
      );
    }
    
    switch (clinic.businessStatus) {
      case 'OPERATIONAL':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FaCheckCircle className="h-3 w-3 mr-1" />
            {t('operational')}
          </span>
        );
      case 'CLOSED_TEMPORARILY':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <FaExclamationCircle className="h-3 w-3 mr-1" />
            {t('temporarilyClosed')}
          </span>
        );
      case 'CLOSED_PERMANENTLY':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FaTimesCircle className="h-3 w-3 mr-1" />
            {t('permanentlyClosed')}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <FaExclamationCircle className="h-3 w-3 mr-1" />
            {t('unknown')}
          </span>
        );
    }
  };

  const formatOpeningHours = () => {
    if (!clinic.openingHours?.periods || clinic.openingHours.periods.length === 0) {
      return <div className="text-sm text-gray-600">{t('hoursNotAvailable')}</div>;
    }
    
    return clinic.openingHours.periods.map((period, index) => (
      <div key={index} className="text-sm text-gray-600">
        {t('contactForHours')}
      </div>
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header with Status */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{t('basicInformation')}</h2>
          {getStatusBadge()}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Description */}
        {clinic.description && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-gray-900 flex items-center">
              <FaCalendarAlt className="h-4 w-4 mr-2 text-blue-600" />
              {t('description')}
            </h4>
            <p className="text-gray-700 leading-relaxed">{getLocalizedText(clinic.description)}</p>
          </div>
        )}

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Contact Details</h4>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FaMapMarkerAlt className="h-4 w-4 text-red-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">{clinic.formattedAddress}</span>
            </div>
            
            {clinic.nationalPhoneNumber && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FaPhone className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{clinic.nationalPhoneNumber}</span>
              </div>
            )}
            
            {clinic.website && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FaGlobe className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <a 
                  href={clinic.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {t('visitWebsite')}
                </a>
              </div>
            )}
          </div>

          {/* Opening Hours */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide flex items-center">
              <FaClock className="h-4 w-4 mr-2 text-blue-600" />
              {t('openingHours')}
            </h4>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              {clinic.openingHours?.openNow !== undefined && (
                <div className="mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    clinic.openingHours.openNow 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {clinic.openingHours.openNow ? t('openNow') : t('closedNow')}
                  </span>
                </div>
              )}
              
              <div className="space-y-1">
                {formatOpeningHours()}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-4 flex items-center">
            <FaUsers className="h-4 w-4 mr-2 text-blue-600" />
            {t('statistics')}
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center bg-white rounded-lg p-3 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">
                {clinic.doctors?.length || 0}
              </div>
              <div className="text-xs text-gray-600 font-medium">{t('doctors')}</div>
            </div>
            
            <div className="text-center bg-white rounded-lg p-3 shadow-sm">
              <div className="text-2xl font-bold text-green-600">
                {clinic.userRatingsTotal || 0}
              </div>
              <div className="text-xs text-gray-600 font-medium">{t('reviews')}</div>
            </div>
            
            <div className="text-center bg-white rounded-lg p-3 shadow-sm">
              <div className="text-2xl font-bold text-purple-600">
                {clinic.operations?.length || 0}
              </div>
              <div className="text-xs text-gray-600 font-medium">{t('services')}</div>
            </div>
            
            <div className="text-center bg-white rounded-lg p-3 shadow-sm">
              <div className="text-2xl font-bold text-orange-600 flex items-center justify-center">
                <FaStar className="h-4 w-4 text-yellow-400 mr-1" />
                {clinic.rating?.toFixed(1) || 'N/A'}
              </div>
              <div className="text-xs text-gray-600 font-medium">{t('rating')}</div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {clinic.googlePlaceId && (
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-3">{t('additionalInfo')}</h4>
            
            <div className="space-y-3">
              {clinic.types && clinic.types.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-gray-700 mb-2 block">{t('categories')}</span>
                  <div className="flex flex-wrap gap-2">
                    {clinic.types.map((type, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                      >
                        {type.replace(/_/g, ' ').toLowerCase()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {clinic.priceLevel && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">{t('priceLevel')}:</span>
                  <div className="flex">
                    {Array.from({ length: 4 }, (_, i) => (
                      <span 
                        key={i} 
                        className={`text-lg ${
                          i < clinic.priceLevel! ? 'text-green-600' : 'text-gray-300'
                        }`}
                      >
                        $
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}