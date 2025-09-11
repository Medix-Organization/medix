'use client';
import { useState } from 'react';
import LocationInput, { PlaceData } from '../shared/LocationInput';
import {handleClinicSubmit} from './clinic-onboarding-components/handleClinicSubmit'

interface ClinicOnboardingFlowProps {
  locale: string;
}

export default function ClinicOnboardingFlow({ locale }: ClinicOnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<'location' | 'completed'>('location');
  const [selectedPlace, setSelectedPlace] = useState<PlaceData | null>(null);
  const [clinicId, setClinicId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlaceSelect = (place: PlaceData | null) => {
    setSelectedPlace(place);
    setError(null);
    if (place) {
      handleClinicSubmit(
        place, 
        setClinicId, 
        setError, 
        setIsSubmitting, 
        () => setCurrentStep('completed') // Navigate to completion step
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Step Content */}
        {currentStep === 'location' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6">Find Your Clinic on Google</h2>
            <p className="text-gray-600 mb-6">Search for your clinic to automatically import information from Google Places.</p>
            
            <LocationInput
              label="Search for Your Clinic"
              placeholder="Type your clinic name or location..."
              value={selectedPlace}
              onChange={handlePlaceSelect}
              required
              error={error || undefined}
            />

            {isSubmitting && (
              <div className="flex items-center justify-center py-4 mt-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-sm text-gray-600">Creating clinic...</span>
              </div>
            )}
          </div>
        )}

        {currentStep === 'completed' && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
              <p className="text-gray-600 mb-4">
                We've received your clinic information successfully.
              </p>
              <p className="text-gray-600">
                Our team will review your submission and contact you soon to complete the setup process.
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>What's next?</strong> We'll verify your clinic details and reach out within 24-48 hours to help you get started on Medix.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}