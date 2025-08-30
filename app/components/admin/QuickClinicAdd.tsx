'use client';
import { useState } from 'react';
import { createClinic } from '@/lib/actions/clinicActions';
import LocationInput, { PlaceData } from '../shared/LocationInput';

interface QuickClinicAddProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function QuickClinicAdd({ onSuccess, onCancel }: QuickClinicAddProps) {
  const [selectedPlace, setSelectedPlace] = useState<PlaceData | null>(null);
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

        // Opening hours (schema expects openNow, periods, weekdayText)
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
          name: p.photo_reference, // We stored URL in photo_reference from LocationInput
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

      await createClinic(clinicData);
      alert(`Clinic "${place.name}" added successfully!`);
      onSuccess();
    } catch (e) {
      console.error('Error adding clinic:', e);
      setError('Failed to add clinic. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Quick Add Clinic</h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">✕</button>
      </div>

      <div className="space-y-4">
        <div className="text-sm text-gray-600 mb-4">
          Search and select a clinic to automatically import its basic information.
        </div>

        <LocationInput
          label="Search for Clinic"
          placeholder="Type clinic name or location..."
          value={selectedPlace}
          onChange={handlePlaceSelect}
          required
          error={error || undefined}
        />

        {isSubmitting && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-sm text-gray-600">Adding clinic...</span>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}