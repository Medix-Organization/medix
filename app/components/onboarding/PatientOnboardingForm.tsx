'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPatient } from '@/lib/actions/patientActions';
import LocationInput from '../shared/LocationInput';
import { LocalizedString } from '@/lib/types/common';

interface PatientOnboardingFormProps {
  locale: string;
}

type PlaceData = {
  name: string;
  address: string;
  placeId: string;
  googleMapLink?: string;
};

export default function PatientOnboardingForm({ locale }: PatientOnboardingFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '' as 'male' | 'female' | '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.age || parseInt(formData.age) < 1 || parseInt(formData.age) > 120) {
      newErrors.age = 'Please enter a valid age between 1 and 120';
    }
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      const submitData = {
        fullName: formData.fullName.trim(),
        age: parseInt(formData.age),
        gender: formData.gender === '' ? undefined : formData.gender,
      };
      
      await createPatient(submitData);
      
      // Redirect to home after successful creation
      router.push(`/${locale}/home`);
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error instanceof Error) {
        if (error.message === 'Patient profile already exists') {
          // If patient already exists, redirect to home
          router.push(`/${locale}/home`);
        } else {
          setErrors({ submit: error.message });
        }
      } else {
        setErrors({ submit: 'Failed to create profile. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Complete Your Profile</h2>
          <p className="mt-2 text-gray-600">Please provide some basic information to get started</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-800">{errors.submit}</p>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              Age *
            </label>
            <input
              type="number"
              id="age"
              min="1"
              max="120"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your age"
            />
            {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                  className="mr-2"
                />
                <span>Male</span>
              </label>
              <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                  className="mr-2"
                />
                <span>Female</span>
              </label>
            </div>
            {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Completing Profile...
                </div>
              ) : (
                'Complete Profile'
              )}
            </button>
          </div>

          {/* Skip Option */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => router.push(`/${locale}/home`)}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Skip for now (you can complete this later)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}