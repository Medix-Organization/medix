'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ClinicType } from '@/lib/types/clinic';
import { LocalizedString } from '@/lib/types/common';
import { FaPlus, FaTimes, FaSave, FaUpload } from 'react-icons/fa';

interface ClinicEditModalProps {
  clinic: ClinicType;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedClinic: Partial<ClinicType>) => Promise<void>;
}

// Define a proper form data interface
interface FormData {
  displayName: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  isActive: boolean;
  openingHours: {
    openNow?: boolean;
    periods?: {
      open: { day: number; time: string };
      close?: { day: number; time: string };
    }[];
    weekdayText?: string[];
  };
  photos: {
    name: string;
    widthPx: number;
    heightPx: number;
    authorAttributions?: {
      displayName: string;
      uri?: string;
      photoUri?: string;
    }[];
  }[];
}

export default function ClinicEditModal({
  clinic,
  isOpen,
  onClose,
  onSave
}: ClinicEditModalProps) {
  const t = useTranslations('clinic');
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  // Helper function to get localized text
  const getLocalizedText = (localizedString: LocalizedString | string | undefined): string => {
    if (!localizedString) return '';
    if (typeof localizedString === 'string') return localizedString;
    return localizedString.translations[locale as 'en' | 'ar'] || localizedString.translations.en || '';
  };

  // Helper function to get display name
  const getDisplayName = (): string => {
    if (clinic.displayName) {
      if (typeof clinic.displayName === 'string') return clinic.displayName;
      return clinic.displayName.text || '';
    }
    return clinic.name || '';
  };

  const [formData, setFormData] = useState<FormData>({
    displayName: getDisplayName(),
    description: getLocalizedText(clinic.description),
    contactEmail: clinic.contactEmail || '',
    contactPhone: clinic.contactPhone || clinic.nationalPhoneNumber || '',
    website: clinic.website || '',
    isActive: clinic.isActive ?? true,
    openingHours: clinic.openingHours || { periods: [] },
    photos: clinic.photos || []
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Convert form data to match ClinicType structure
      const updateData: Partial<ClinicType> = {
        displayName: { text: formData.displayName },
        description: {
          translations: {
            en: formData.description,
            ar: formData.description // You might want to handle this differently
          }
        } as LocalizedString,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        website: formData.website,
        isActive: formData.isActive,
        openingHours: formData.openingHours,
        photos: formData.photos
      };

      await onSave(updateData);
      // Show success message (you can implement your own toast or alert)
      alert(t('clinicUpdated'));
      onClose();
    } catch (error) {
      // Show error message
      alert(t('updateError'));
      console.error('Error updating clinic:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // In a real app, you'd upload to a service like Cloudinary
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto = {
            name: `photo_${Date.now()}`,
            widthPx: 600,
            heightPx: 400,
            authorAttributions: []
          };
          setFormData(prev => ({
            ...prev,
            photos: [...prev.photos, newPhoto]
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">{t('editClinic')}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'basic', label: t('basicInfo') },
              { id: 'contact', label: t('contact') },
              { id: 'hours', label: t('hours') },
              { id: 'photos', label: t('photos') }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('displayName')}
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                    placeholder={t('enterDisplayName')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    id="isActive"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                    {t('clinicActive')}
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('description')}
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder={t('enterDescription')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contactEmail')}
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder={t('enterEmail')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contactPhone')}
                  </label>
                  <input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    placeholder={t('enterPhone')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('website')}
                </label>
                <input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder={t('enterWebsite')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Hours Tab */}
          {activeTab === 'hours' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg border">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">{t('openingHours')}</h3>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-4">
                    {t('hoursNote')}
                  </p>
                  <div className="space-y-2">
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day, index) => (
                      <div key={day} className="flex items-center space-x-4">
                        <div className="w-24">
                          <label className="text-sm font-medium text-gray-700">{t(day)}</label>
                        </div>
                        <input 
                          type="time" 
                          placeholder="09:00" 
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                        <span>-</span>
                        <input 
                          type="time" 
                          placeholder="17:00" 
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Photos Tab */}
          {activeTab === 'photos' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg border">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">{t('clinicPhotos')}</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <span className="text-xs text-gray-600">Photo {index + 1}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          onClick={() => removePhoto(index)}
                        >
                          <FaTimes className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      className="aspect-video border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex flex-col items-center justify-center text-gray-500 hover:text-gray-600"
                      onClick={addPhoto}
                    >
                      <FaPlus className="h-6 w-6 mb-2" />
                      <span className="text-sm">{t('addPhoto')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {t('cancel')}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                {t('saving')}
              </>
            ) : (
              <>
                <FaSave className="h-4 w-4 mr-2" />
                {t('saveChanges')}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}