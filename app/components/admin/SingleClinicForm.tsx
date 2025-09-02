'use client';
import { useState } from 'react';
import { createClinic } from '@/lib/actions/clinicActions';
import BilingualInput from '../shared/BilingualInput';
import LocationInput, { PlaceData } from '../shared/LocationInput';
import { LocalizedString } from '@/lib/types/common';

interface SingleClinicFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function SingleClinicForm({ onSuccess, onCancel }: SingleClinicFormProps) {
  const [formData, setFormData] = useState({
    name: { translations: { en: '', ar: '' } } as LocalizedString,
    address: { translations: { en: '', ar: '' } } as LocalizedString,
    pin: '',
    location: null as PlaceData | null,
    contactEmail: '',
    contactPhone: '',
    description: { translations: { en: '', ar: '' } } as LocalizedString
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Resolve and validate location + coordinates
    const loc = formData.location || null;
    const resolvedLat =
      loc?.geometry?.location?.lat ?? (typeof loc?.latitude === 'number' ? loc?.latitude : undefined);
    const resolvedLng =
      loc?.geometry?.location?.lng ?? (typeof loc?.longitude === 'number' ? loc?.longitude : undefined);
    const resolvedPlaceId = loc?.place_id || loc?.placeId || '';

    const newErrors: Record<string, string> = {};
    if (!formData.name.translations.en && !formData.name.translations.ar) {
      newErrors.name = 'Clinic name is required in at least one language';
    }
    if (!formData.pin) newErrors.pin = 'PIN/License number is required';
    if (!loc) {
      newErrors.location = 'Location is required';
    } else {
      if (!resolvedPlaceId) {
        newErrors.location = 'Selected location must include a Google Place ID';
      }
      if (
        resolvedLat === undefined ||
        resolvedLng === undefined ||
        !Number.isFinite(resolvedLat) ||
        !Number.isFinite(resolvedLng)
      ) {
        newErrors.location = 'Selected location must include valid coordinates';
      }
    }
    if (!formData.contactEmail) newErrors.contactEmail = 'Contact email is required';
    if (!formData.contactPhone) newErrors.contactPhone = 'Contact phone is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const formattedAddr = loc?.formatted_address || loc?.address || '';
      const googleMapLink =
        loc?.googleMapLink ||
        (resolvedPlaceId ? `https://www.google.com/maps/place/?q=place_id:${resolvedPlaceId}` : undefined);

      const clinicData = {
        // Use a plain name string (CreateClinicData supports this)
        name: formData.name.translations.en || formData.name.translations.ar,
        pin: formData.pin,

        // Location object (aligns with locationSchema)
        location: {
          googleMapLink,
          address: {
            street: formattedAddr,
            city: '',
            state: '',
            country: 'Saudi Arabia',
            zipCode: ''
          },
          coordinates: {
            latitude: resolvedLat as number,
            longitude: resolvedLng as number
          }
        },

        // Google Places API fields
        googlePlaceId: resolvedPlaceId,

        // Description with translations
        description: {
          translations: {
            en: formData.description.translations.en,
            ar: formData.description.translations.ar
          }
        },

        // Address with translations (legacy field retained by schema)
        address: {
          translations: {
            en: formattedAddr,
            ar: formattedAddr
          }
        },

        // Direct contact fields (schema-compatible)
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,

        // Other fields
        isActive: true,
        verificationStatus: 'pending'
      };

      await createClinic({
        ...clinicData,
        location: {
          ...clinicData.location,
          googleMapLink: clinicData.location.googleMapLink || '' // Ensure googleMapLink is never undefined
        }
      });
      alert('Clinic created successfully!');
      onSuccess();
    } catch (error) {
      console.error('Error creating clinic:', error);
      alert('Failed to create clinic. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Add New Clinic</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Clinic Name */}
        <BilingualInput
          label="Clinic Name"
          name="name"
          value={formData.name}
          onChange={(value) => setFormData({ ...formData, name: value })}
          placeholder={{ en: 'Clinic Name in English', ar: 'اسم العيادة بالعربية' }}
          required
          error={errors.name}
        />

        {/* PIN/License */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PIN/License Number *
          </label>
          <input
            type="text"
            value={formData.pin}
            onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.pin ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Clinic registration/license number"
            required
          />
          {errors.pin && <p className="text-sm text-red-500 mt-1">{errors.pin}</p>}
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email *
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.contactEmail ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="info@clinic.com"
              required
            />
            {errors.contactEmail && <p className="text-sm text-red-500 mt-1">{errors.contactEmail}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Phone *
            </label>
            <input
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.contactPhone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+966 11 123 4567"
              required
            />
            {errors.contactPhone && <p className="text-sm text-red-500 mt-1">{errors.contactPhone}</p>}
          </div>
        </div>

        {/* Location */}
        <LocationInput
          label="Clinic Location"
          placeholder="Search for clinic location..."
          value={formData.location}
          onChange={(place) => setFormData({ ...formData, location: place })}
          required
          error={errors.location}
        />

        {/* Address Details */}
        <BilingualInput
          label="Address Details (Optional)"
          name="address"
          value={formData.address}
          onChange={(value) => setFormData({ ...formData, address: value })}
          placeholder={{ en: 'Building, Street, District', ar: 'المبنى، الشارع، الحي' }}
        />

        {/* Description */}
        <BilingualInput
          label="Description (Optional)"
          name="description"
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          placeholder={{ en: 'Clinic description in English', ar: 'وصف العيادة بالعربية' }}

        />

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Clinic'}
          </button>
        </div>
      </form>
    </div>
  );
}