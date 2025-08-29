'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: { translations: { en: '', ar: '' } } as LocalizedString,
    specialty: { translations: { en: '', ar: '' } } as LocalizedString,
    shortBio: { translations: { en: '', ar: '' } } as LocalizedString,
    email: '',
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
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.location) newErrors.location = 'Location is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      const submitData = {
        ...formData,
        location: formData.location ? {
          googleMapLink: formData.location.googleMapLink || `https://www.google.com/maps/place/?q=place_id:${formData.location.placeId}`
        } : null
      };
      
      const response = await fetch('/api/onboarding/doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
      
      if (response.ok) {
        router.push(`/${locale}/doctor-profile`);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Doctor Registration</h2>
      
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

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="doctor@example.com"
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="5"
            min="0"
          />
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
          {isSubmitting ? 'Submitting...' : 'Complete Registration'}
        </button>
      </div>
    </form>
  );
}