'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import { ClinicType } from '@/lib/types/clinic';
import { FiEdit, FiMapPin, FiPhone, FiGlobe, FiClock } from 'react-icons/fi';
import ClinicOperations from './ClinicOperations';
import ClinicHeader from './ClinicHeader';
import ClinicInfo from './ClinicInfo';
import ClinicDoctors from './ClinicDoctors';
import ClinicReviews from './ClinicReviews';
import ClinicEditModal from './ClinicEditModal';

interface ClinicViewProps {
  clinic: ClinicType;
  locale: string;
}

export default function ClinicView({ clinic, locale }: ClinicViewProps) {
  const { user } = useUser();
  const t = useTranslations('clinic');
  const [isOwner, setIsOwner] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('services'); // Changed default to services

  // Check if current user is clinic owner
  useEffect(() => {
    if (user && clinic) {
      const userEmail = user.emailAddresses[0]?.emailAddress;
      setIsOwner(userEmail === clinic.contactEmail);
    }
  }, [user, clinic]);

  // Updated tabs - removed overview
  const tabs = [
    { id: 'services', label: t('tabs.services'), icon: FiClock },
    { id: 'doctors', label: t('tabs.doctors'), icon: FiPhone },
    { id: 'reviews', label: t('tabs.reviews'), icon: FiGlobe },
  ];

  // Convert Google Places reviews to Review format
  const convertedReviews = clinic.reviews?.map((review, index) => ({
    id: `review-${index}`,
    patientName: review.authorAttribution.displayName,
    rating: review.rating,
    comment: {
      translations: {
        en: review.text.text,
        ar: review.originalText?.text || review.text.text
      }
    },
    date: new Date(review.publishTime),
    verified: false,
    tags: [],
    helpful: 0
  })) || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Clinic Header */}
      <ClinicHeader clinic={clinic} locale={locale} />
      
      {/* Owner Actions */}
      {isOwner && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900">
                {t('owner.welcome')}
              </h3>
              <p className="text-blue-700">
                {t('owner.description')}
              </p>
            </div>
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiEdit className="w-4 h-4" />
              <span>{t('owner.editClinic')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Overview Content - Always Visible */}
      <div className="mb-8">
        <ClinicInfo clinic={clinic} />
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === 'services' && <ClinicOperations clinic={clinic} locale={locale} />}
        {activeTab === 'doctors' && (
          <div className="text-center py-8">
            <p className="text-gray-500">{t('doctorsComingSoon')}</p>
            <p className="text-sm text-gray-400 mt-2">
              {t('doctorsNote', { count: clinic.doctors?.length || 0 })}
            </p>
          </div>
        )}
        {activeTab === 'reviews' && (
          <ClinicReviews 
            reviews={convertedReviews}
            averageRating={clinic.rating || 0}
            totalReviews={clinic.userRatingsTotal || 0}
          />
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <ClinicEditModal
          clinic={clinic}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={async (updatedClinic) => {
            try {
              console.log('Updating clinic:', updatedClinic);
              await new Promise(resolve => setTimeout(resolve, 1000));
              setShowEditModal(false);
              window.location.reload();
            } catch (error) {
              console.error('Failed to update clinic:', error);
            }
          }}
        />
      )}
    </div>
  );
}