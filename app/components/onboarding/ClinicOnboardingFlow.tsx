'use client';
import { useState } from 'react';
import LocationInput, { PlaceData } from '../shared/LocationInput';
import { createClinic } from '@/lib/actions/clinicActions';
import OperationsManagement from './OperationsManagement';
import DoctorManagement from './DoctorManagement';

interface ClinicOnboardingFlowProps {
  locale: string;
}

export default function ClinicOnboardingFlow({ locale }: ClinicOnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<'location' | 'operations' | 'doctors'>('location');
  const [selectedPlace, setSelectedPlace] = useState<PlaceData | null>(null);
  const [clinicId, setClinicId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePIN = () => Math.random().toString(36).substr(2, 9).toUpperCase();

  const handlePlaceSelect = (place: PlaceData | null) => {
    setSelectedPlace(place);
    setError(null);
    if (place) {
      handleSubmit(place);
    }
  };

  const handleSubmit = async (place: PlaceData) => {
    if (!place.place_id) {
      setError('Please select a valid place from the dropdown.');
      return;
    }
    const lat = place.geometry?.location.lat ?? 0;
    const lng = place.geometry?.location.lng ?? 0;
    if (!lat || !lng) {
      setError('Selected place is missing coordinates. Please pick another result.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const cityComp = place.address_components?.find(c => c.types.includes('locality'));
      const countryComp = place.address_components?.find(c => c.types.includes('country'));

      const clinicData = {
        // Basic information
        name: place.name,
        displayName: { text: place.name, languageCode: 'en' },
        pin: generatePIN(),

        // Google Places
        googlePlaceId: place.place_id,
        types: place.types || ['health'],
        businessStatus: place.business_status || 'OPERATIONAL',
        formattedAddress: place.formatted_address,
        addressComponents: place.address_components?.map(c => ({
          longName: c.long_name,
          shortName: c.short_name,
          types: c.types,
        })),

        // Location
        location: {
          googleMapLink: place.googleMapLink || place.url || `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
          address: {
            street: place.formatted_address,
            city: cityComp?.long_name || '',
            country: countryComp?.long_name || 'Saudi Arabia',
          },
          coordinates: {
            latitude: lat,
            longitude: lng,
          },
        },

        // Contact
        nationalPhoneNumber: place.formatted_phone_number,
        internationalPhoneNumber: place.international_phone_number,
        website: place.website,

        // Business info
        rating: place.rating,
        userRatingsTotal: Array.isArray(place.reviews) ? place.reviews.length : 0,
        priceLevel: place.price_level,

        // Opening hours
        openingHours: place.opening_hours ? {
          openNow: !!place.opening_hours.open_now,
          periods: (place.opening_hours.periods || []).map(p => ({
            open: p.open,
            close: p.close,
          })),
          weekdayText: place.opening_hours.weekday_text || [],
        } : undefined,

        // Photos
        photos: place.photos?.map(p => ({
          name: p.photo_reference,
          widthPx: p.width,
          heightPx: p.height,
          authorAttributions: (p.html_attributions || []).map(a => ({ displayName: a })),
        })),

        // Reviews
        reviews: place.reviews?.map(r => ({
          name: r.author_name,
          relativePublishTimeDescription: r.relative_time_description,
          rating: r.rating,
          text: { text: r.text, languageCode: r.language },
          authorAttribution: {
            displayName: r.author_name,
            uri: r.author_url,
            photoUri: r.profile_photo_url,
          },
          publishTime: new Date(r.time * 1000).toISOString(),
        })),

        // Additional fields
        editorialSummary: place.editorial_summary
          ? { text: place.editorial_summary.overview, languageCode: place.editorial_summary.language_code }
          : undefined,

        // Google Maps integration
        googleMapsUri: place.url,

        // Legacy/basic required fields in schema
        contactEmail: 'info@clinic.com',
        contactPhone: place.formatted_phone_number || '',
        description: {
          translations: {
            en: place.editorial_summary?.overview || `Medical facility: ${place.name}`,
            ar: `منشأة طبية: ${place.name}`,
          },
        },
        address: {
          translations: { en: place.formatted_address, ar: place.formatted_address },
        },

        isActive: true,
        verificationStatus: 'pending',
      };

      const newClinic = await createClinic(clinicData);
      setClinicId(newClinic._id);
      setCurrentStep('operations');
    } catch (e) {
      console.error('Error creating clinic:', e);
      setError('Failed to create clinic. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center ${currentStep === 'location' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'location' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>1</div>
              <span className="ml-2">Select Location</span>
            </div>
            <div className={`flex items-center ${currentStep === 'operations' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'operations' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>2</div>
              <span className="ml-2">Add Operations</span>
            </div>
            <div className={`flex items-center ${currentStep === 'doctors' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'doctors' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>3</div>
              <span className="ml-2">Add Doctors</span>
            </div>
          </div>
        </div>

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

        {currentStep === 'operations' && clinicId && (
          <OperationsManagement 
            clinicId={clinicId} 
            onComplete={() => setCurrentStep('doctors')}
          />
        )}

        {currentStep === 'doctors' && clinicId && (
          <DoctorManagement 
            clinicId={clinicId}
            onComplete={() => {
              // Handle completion - maybe redirect to clinic dashboard
              alert('Clinic onboarding completed!');
            }}
          />
        )}
      </div>
    </div>
  );
}