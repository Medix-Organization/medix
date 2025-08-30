'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { createDoctorUser } from '@/lib/actions/createUser';
import BilingualInput from '../shared/BilingualInput';
import LocationInput from '../shared/LocationInput';
import { LocalizedString } from '@/lib/types/common';

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
  const [formData, setFormData] = useState({
    fullName: { translations: { en: '', ar: '' } } as LocalizedString,
    specialty: { translations: { en: '', ar: '' } } as LocalizedString,
    shortBio: { translations: { en: '', ar: '' } } as LocalizedString,
    phoneNumber: '',
    yearsOfExperience: '',
    licenseNumber: '',
    consultationFee: '',
    availableForOnlineConsultation: false,
    location: null as PlaceData | null,
    languages: [] as string[],
    titleCredentials: [] as string[]
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
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      const submitData = {
        ...formData,
        consultationFee: formData.consultationFee ? parseFloat(formData.consultationFee) : undefined,
        location: formData.location ? {
          googleMapLink: formData.location.googleMapLink || `https://www.google.com/maps/place/?q=place_id:${formData.location.placeId}`
        } : undefined
      };
      
      // Call server action directly
      await createDoctorUser(submitData, locale);
      
      // The redirect happens in the server action
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: error instanceof Error ? error.message : 'Error submitting form. Please try again.' });
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow max-w-4xl mx-auto">
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
      </div>

      {/* Location */}
      <div>
        <LocationInput
          label="Clinic/Practice Location"
          placeholder="e.g. Dr. Kareem Clinic, Jeddah"
          value={formData.location}
          onChange={(place) => setFormData({ ...formData, location: place })}
          required
          error={errors.location}
        />
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

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating Profile...' : 'Complete Registration'}
        </button>
      </div>
    </form>
  );
}