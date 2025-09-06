'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import { createDoctorUser } from '@/lib/actions/createUser';
import { searchClinics, createClinic } from '@/lib/actions/clinicActions';

import BilingualInput from '../shared/BilingualInput';
import { LocalizedString } from '@/lib/types/common';
import { ClinicType } from '@/lib/types/clinic';
import { ClinicAssociation } from '@/lib/types/workingHours';
import ClinicSelector from '../shared/ClinicSelector';
import React from 'react';

interface DoctorOnboardingFormProps {
  locale: string;
}

export default function DoctorOnboardingForm({ locale }: DoctorOnboardingFormProps) {
  const { user, isLoaded } = useUser();
  const t = useTranslations('onboarding.doctor');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false); // Add this new state
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: { translations: { en: '', ar: '' } } as LocalizedString,
    specialty: { translations: { en: '', ar: '' } } as LocalizedString,
    shortBio: { translations: { en: '', ar: '' } } as LocalizedString,
    
    // Professional Details
    titleCredentials: [] as string[],
    yearsOfExperience: '',
    licenseNumber: '',
    certificationsFellowships: [] as string[],
    memberships: [] as string[],
    awards: [] as string[],
    subspecialties: [] as LocalizedString[],
    devicesMaterials: [] as string[],
    
    // Contact & Consultation
    phoneNumber: '',
    consultationFee: '',
    availableForOnlineConsultation: false,
    
    // Languages
    languages: [] as string[],
    
    // Social Links
    socialLinks: {
      linkedin: '',
      x: '',
      instagram: '',
      facebook: '',
      researchGate: '',
      clinicWebsite: ''
    },
    
    // Clinic Associations
    // clinicAssociations: [] as ClinicAssociation[]
  });
  
  // Pre-fill name from Clerk if available
  useEffect(() => {
    if (isLoaded && user) {
      const firstName = user.firstName || '';
      const lastName = user.lastName || '';
      const fullName = `${firstName} ${lastName}`.trim();
      
      if (fullName) {
        setFormData(prev => ({
          ...prev,
          fullName: {
            translations: {
              en: fullName,
              ar: prev.fullName.translations.ar
            }
          }
        }));
      }
    }
  }, [isLoaded, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.translations.en && !formData.fullName.translations.ar) {
      newErrors.fullName = 'Full name is required in at least one language';
    }
    if (!formData.specialty.translations.en && !formData.specialty.translations.ar) {
      newErrors.specialty = 'Specialty is required in at least one language';
    }
    if (!formData.yearsOfExperience) {
      newErrors.yearsOfExperience = 'Years of experience is required';
    }
    // if (formData.clinicAssociations.length === 0) {
    //   newErrors.clinicAssociations = 'At least one clinic association is required';
    // }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      const submitData = {
        ...formData,
        consultationFee: formData.consultationFee ? parseFloat(formData.consultationFee) : undefined
      };
      
      await createDoctorUser(submitData, locale);
      setIsSubmitted(true); // Set success state instead of redirecting
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: error instanceof Error ? error.message : 'Error submitting form. Please try again.' });
      setIsSubmitting(false);
    }
  };

  const addArrayField = (field: string, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field as keyof typeof prev] as string[]), value.trim()]
      }));
    }
  };

  const removeArrayField = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }));
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isRTL = locale === 'ar';
  
  return (
    <div className={`min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Mobile-friendly Progress Stepper */}
        <div className="mb-8">
          {/* Desktop Stepper */}
          <div className={`hidden md:flex items-center justify-center mb-6 ${
            isRTL ? 'flex-row-reverse' : ''
          }`}>
            {[1, 2, 3].map((step, index) => {
              const displayStep = isRTL ? 5 - step : step;
              const isActive = isRTL ? currentStep >= (4 - step) : currentStep >= step;
              return (
                <React.Fragment key={step}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-md ${
                    isActive
                      ? 'bg-blue-600 text-white border-2 border-blue-600' 
                      : 'bg-white text-gray-600 border-2 border-gray-300'
                  }`}>
                    {isRTL ? ['٣', '٢', '١'][step - 1] : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 rounded-full ${
                      isRTL ? (currentStep > (5 - step) ? 'bg-blue-600' : 'bg-gray-300') : (currentStep > step ? 'bg-blue-600' : 'bg-gray-300')
                    } ${
                      isRTL ? 'ml-2 mr-2' : 'mx-2'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          
          {/* Mobile Stepper */}
          <div className="md:hidden">
            <div className={`flex justify-center mb-4 ${
              isRTL ? 'flex-row-reverse space-x-reverse' : ''
            } space-x-4`}>
              {[1, 2, 3].map((step) => {
                const isActive = isRTL ? currentStep >= (4 - step) : currentStep >= step;
                return (
                  <div key={step} className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shadow-md ${
                    isActive
                      ? 'bg-blue-600 text-white border-2 border-blue-600' 
                      : 'bg-white text-gray-600 border-2 border-gray-300'
                  }`}>
                    {isRTL ? ['٣', '٢', '١'][step - 1] : step}
                  </div>
                );
              })}
            </div>
            {/* Progress bar for mobile */}
            <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
              <div 
                className={`bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out`}
                style={{ 
                  width: `${(currentStep / 3) * 100}%`,
                  transformOrigin: isRTL ? 'right' : 'left',
                  direction: isRTL ? 'rtl' : 'ltr'
                }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-center mt-2">
            <span className={`text-base text-gray-700 text-center px-2 font-medium ${
              isRTL ? 'font-arabic' : ''
            }`}>
              {t('stepIndicator', {
                current: isRTL ? ['٣', '٢', '١'][currentStep - 1] : currentStep,
                total: isRTL ? '٣' : 3,
                stepName: t(`steps.step${currentStep}`)
              })}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-4 md:p-8 rounded-lg shadow">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('title')}</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <p className="text-sm text-blue-800">
                <strong>Email:</strong> {user?.emailAddresses[0]?.emailAddress}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                {t('emailInfo')}
              </p>
            </div>
          </div>
          
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-800">{errors.submit}</p>
            </div>
          )}

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">{t('basicInfo.title')}</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Full Name - Bilingual */}
                <div className="lg:col-span-2">
                  <BilingualInput
                    label={t('basicInfo.fullName')}
                    name="fullName"
                    value={formData.fullName}
                    onChange={(value) => setFormData({ ...formData, fullName: value })}
                    required
                    placeholder={{ 
                      en: t('basicInfo.fullNamePlaceholder'), 
                      ar: 'د. أحمد محمد' 
                    }}
                    error={errors.fullName}
                  />
                </div>

                {/* Specialty - Bilingual */}
                <div className="lg:col-span-2">
                  <BilingualInput
                    label={t('basicInfo.specialty')}
                    name="specialty"
                    value={formData.specialty}
                    onChange={(value) => setFormData({ ...formData, specialty: value })}
                    required
                    placeholder={{ 
                      en: t('basicInfo.specialtyPlaceholder'), 
                      ar: 'أمراض القلب' 
                    }}
                    error={errors.specialty}
                  />
                </div>

                {/* Years of Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('basicInfo.yearsOfExperience')} *
                  </label>
                  <input
                    type="number"
                    value={formData.yearsOfExperience}
                    onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={t('basicInfo.yearsPlaceholder')}
                    min="0"
                  />
                  {errors.yearsOfExperience && <p className="text-sm text-red-500 mt-1">{errors.yearsOfExperience}</p>}
                </div>

                {/* License Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('basicInfo.licenseNumber')}
                  </label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('basicInfo.licensePlaceholder')}
                  />
                </div>
              </div>

              {/* Short Bio - Bilingual */}
              <div>
                <BilingualInput
                  label={t('basicInfo.shortBio')}
                  name="shortBio"
                  value={formData.shortBio}
                  onChange={(value) => setFormData({ ...formData, shortBio: value })}
                  type="textarea"
                  placeholder={{ 
                    en: t('basicInfo.shortBioPlaceholder'), 
                    ar: 'وصف مختصر لممارستك وخبرتك...' 
                  }}
                />
              </div>
            </div>
          )}

          {/* Step 2: Professional Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">{t('professionalDetails.title')}</h3>
              
              {/* Title Credentials */}
              <ArrayInputField
                label={t('professionalDetails.titleCredentials')}
                placeholder={t('professionalDetails.titleCredentialsPlaceholder')}
                values={formData.titleCredentials}
                onAdd={(value) => addArrayField('titleCredentials', value)}
                onRemove={(index) => removeArrayField('titleCredentials', index)}
              />

              {/* Certifications & Fellowships */}
              <ArrayInputField
                label={t('professionalDetails.certifications')}
                placeholder={t('professionalDetails.certificationsPlaceholder')}
                values={formData.certificationsFellowships}
                onAdd={(value) => addArrayField('certificationsFellowships', value)}
                onRemove={(index) => removeArrayField('certificationsFellowships', index)}
              />

              {/* Memberships */}
              <ArrayInputField
                label={t('professionalDetails.memberships')}
                placeholder={t('professionalDetails.membershipsPlaceholder')}
                values={formData.memberships}
                onAdd={(value) => addArrayField('memberships', value)}
                onRemove={(index) => removeArrayField('memberships', index)}
              />

              {/* Awards */}
              <ArrayInputField
                label={t('professionalDetails.awards')}
                placeholder={t('professionalDetails.awardsPlaceholder')}
                values={formData.awards}
                onAdd={(value) => addArrayField('awards', value)}
                onRemove={(index) => removeArrayField('awards', index)}
              />

              {/* Devices & Materials */}
              <ArrayInputField
                label={t('professionalDetails.devices')}
                placeholder={t('professionalDetails.devicesPlaceholder')}
                values={formData.devicesMaterials}
                onAdd={(value) => addArrayField('devicesMaterials', value)}
                onRemove={(index) => removeArrayField('devicesMaterials', index)}
              />

              {/* Languages */}
              <ArrayInputField
                label={t('professionalDetails.languages')}
                placeholder={t('professionalDetails.languagesPlaceholder')}
                values={formData.languages}
                onAdd={(value) => addArrayField('languages', value)}
                onRemove={(index) => removeArrayField('languages', index)}
              />
            </div>
          )}

          {/* Step 3: Contact & Social */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">{t('contactSocial.title')}</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contactSocial.phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('contactSocial.phonePlaceholder')}
                  />
                </div>

                {/* Consultation Fee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contactSocial.consultationFee')}
                  </label>
                  <input
                    type="number"
                    value={formData.consultationFee}
                    onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('contactSocial.consultationFeePlaceholder')}
                    min="0"
                  />
                </div>
              </div>

              {/* Online Consultation */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.availableForOnlineConsultation}
                    onChange={(e) => setFormData({ ...formData, availableForOnlineConsultation: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">{t('contactSocial.onlineConsultation')}</span>
                </label>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-900">{t('contactSocial.socialLinks')}</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {Object.entries(formData.socialLinks).map(([platform, value]) => (
                    <div key={platform}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {t(`contactSocial.platforms.${platform}`, { defaultValue: platform })}
                      </label>
                      <input
                        type="url"
                        value={value}
                        onChange={(e) => setFormData({
                          ...formData,
                          socialLinks: {
                            ...formData.socialLinks,
                            [platform]: e.target.value
                          }
                        })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('contactSocial.socialPlaceholder', { platform })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Clinic Association
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">{t('clinicAssociation.title')}</h3>
              
              <ClinicSelector
                selectedClinics={formData.clinicAssociations}
                onChange={(associations) => setFormData({ ...formData, clinicAssociations: associations })}
                error={errors.clinicAssociations}
                allowCreate={false}
              />
            </div>
          )} */}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('navigation.previous')}
            </button>
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {t('navigation.next')}
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isSubmitting ? t('navigation.submitting') : t('navigation.submit')}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// Helper component for array input fields
interface ArrayInputFieldProps {
  label: string;
  placeholder: string;
  values: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
}

function ArrayInputField({ label, placeholder, values, onAdd, onRemove }: ArrayInputFieldProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add
        </button>
      </div>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {values.map((value, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {value}
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Add success message component before the main form return
if (isSubmitted) {
  return (
    <div className={`min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t('success.title', { defaultValue: 'Thank you for signing up to Medix!' })}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('success.message', { defaultValue: 'We have received your application and will contact you soon to complete your profile setup.' })}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-sm text-blue-800">
                <strong>Email:</strong> {user?.emailAddresses[0]?.emailAddress}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                {t('success.emailNote', { defaultValue: 'We will send updates to this email address.' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}