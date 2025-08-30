'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { createDoctorUser } from '@/lib/actions/createUser';
import { searchClinics, createClinic } from '@/lib/actions/clinicActions';
import BilingualInput from '../shared/BilingualInput';
import LocationInput from '../shared/LocationInput';
import { LocalizedString } from '@/lib/types/common';
import { ClinicType } from '@/lib/types/clinic';
import { ClinicAssociation } from '@/lib/types/workingHours';
import ClinicSelector from '../shared/ClinicSelector';

interface DoctorOnboardingFormProps {
  locale: string;
}

type PlaceData = {
  name: string;
  address: string;
  placeId: string;
  googleMapLink?: string;
};

export default function DoctorOnboardingForm({ locale }: DoctorOnboardingFormProps) {
  const { user, isLoaded } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
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
      instagram: '',
      x: '',
      snapchat: '',
      researchGate: '',
      clinicWebsite: ''
    },
    
    // Clinic Association
    clinicAssociations: [] as ClinicAssociation[]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (formData.clinicAssociations.length === 0) {
      newErrors.clinicAssociations = 'At least one clinic association is required';
    }
    
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

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 4 && <div className={`w-16 h-1 mx-2 ${
                currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
              }`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-2">
          <span className="text-sm text-gray-600">
            Step {currentStep} of 4: {
              currentStep === 1 ? 'Basic Information' :
              currentStep === 2 ? 'Professional Details' :
              currentStep === 3 ? 'Contact & Social' :
              'Clinic Association'
            }
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor Registration</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-sm text-blue-800">
              <strong>Email:</strong> {user?.emailAddresses[0]?.emailAddress}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Your email is automatically taken from your account
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
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Full Name - Bilingual */}
              <div className="lg:col-span-2">
                <BilingualInput
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(value) => setFormData({ ...formData, fullName: value })}
                  required
                  placeholder={{ en: 'Dr. John Smith', ar: 'د. أحمد محمد' }}
                  error={errors.fullName}
                />
              </div>

              {/* Specialty - Bilingual */}
              <div className="lg:col-span-2">
                <BilingualInput
                  label="Specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={(value) => setFormData({ ...formData, specialty: value })}
                  required
                  placeholder={{ en: 'Cardiology', ar: 'أمراض القلب' }}
                  error={errors.specialty}
                />
              </div>

              {/* Years of Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <input
                  type="number"
                  value={formData.yearsOfExperience}
                  onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="5"
                  min="0"
                />
                {errors.yearsOfExperience && <p className="text-sm text-red-500 mt-1">{errors.yearsOfExperience}</p>}
              </div>

              {/* License Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Number
                </label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="LIC123456"
                />
              </div>
            </div>

            {/* Short Bio - Bilingual */}
            <div>
              <BilingualInput
                label="Short Bio"
                name="shortBio"
                value={formData.shortBio}
                onChange={(value) => setFormData({ ...formData, shortBio: value })}
                type="textarea"
                placeholder={{ 
                  en: 'Brief description of your practice and expertise...', 
                  ar: 'وصف مختصر لممارستك وخبرتك...' 
                }}
              />
            </div>
          </div>
        )}

        {/* Step 2: Professional Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Professional Details</h3>
            
            {/* Title Credentials */}
            <ArrayInputField
              label="Title Credentials"
              placeholder="e.g., MD, PhD, FRCS"
              values={formData.titleCredentials}
              onAdd={(value) => addArrayField('titleCredentials', value)}
              onRemove={(index) => removeArrayField('titleCredentials', index)}
            />

            {/* Certifications & Fellowships */}
            <ArrayInputField
              label="Certifications & Fellowships"
              placeholder="e.g., Board Certified in Cardiology"
              values={formData.certificationsFellowships}
              onAdd={(value) => addArrayField('certificationsFellowships', value)}
              onRemove={(index) => removeArrayField('certificationsFellowships', index)}
            />

            {/* Memberships */}
            <ArrayInputField
              label="Professional Memberships"
              placeholder="e.g., American Medical Association"
              values={formData.memberships}
              onAdd={(value) => addArrayField('memberships', value)}
              onRemove={(index) => removeArrayField('memberships', index)}
            />

            {/* Awards */}
            <ArrayInputField
              label="Awards & Recognition"
              placeholder="e.g., Best Doctor Award 2023"
              values={formData.awards}
              onAdd={(value) => addArrayField('awards', value)}
              onRemove={(index) => removeArrayField('awards', index)}
            />

            {/* Devices & Materials */}
            <ArrayInputField
              label="Devices & Materials Used"
              placeholder="e.g., Laser Equipment, Advanced Imaging"
              values={formData.devicesMaterials}
              onAdd={(value) => addArrayField('devicesMaterials', value)}
              onRemove={(index) => removeArrayField('devicesMaterials', index)}
            />

            {/* Languages */}
            <ArrayInputField
              label="Languages Spoken"
              placeholder="e.g., English, Arabic, French"
              values={formData.languages}
              onAdd={(value) => addArrayField('languages', value)}
              onRemove={(index) => removeArrayField('languages', index)}
            />
          </div>
        )}

        {/* Step 3: Contact & Social */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Contact & Social Information</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+966 50 123 4567"
                />
              </div>

              {/* Consultation Fee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consultation Fee (SAR)
                </label>
                <input
                  type="number"
                  value={formData.consultationFee}
                  onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="200"
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
                <span className="text-sm font-medium text-gray-700">Available for Online Consultation</span>
              </label>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900">Social Media & Professional Links</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {Object.entries(formData.socialLinks).map(([platform, value]) => (
                  <div key={platform}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {platform === 'x' ? 'X (Twitter)' : platform === 'researchGate' ? 'Research Gate' : platform === 'clinicWebsite' ? 'Clinic Website' : platform}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`https://${platform}.com/yourprofile`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Clinic Association */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Clinic Association</h3>
            
            <ClinicSelector
              selectedClinics={formData.clinicAssociations}
              onChange={(associations) => setFormData({ ...formData, clinicAssociations: associations })}
              error={errors.clinicAssociations}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <button
            type="button"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating Profile...' : 'Complete Registration'}
            </button>
          )}
        </div>
      </form>
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