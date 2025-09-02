'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BilingualInput from '../shared/BilingualInput';
import LocationInput, { PlaceData } from '../shared/LocationInput';  // Import PlaceData from LocationInput
import { LocalizedString } from '@/lib/types/common';

interface ClinicRegistrationFormProps {
  locale: string;
}

// Remove the local PlaceData type definition (lines 12-16)
// Use the imported one instead

export default function ClinicRegistrationForm({ locale }: ClinicRegistrationFormProps) {
  const router = useRouter();
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
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.translations.en && !formData.name.translations.ar) {
      newErrors.name = 'Clinic name is required in at least one language';
    }
    if (!formData.pin) newErrors.pin = 'PIN is required';
    if (!formData.location) newErrors.location = 'Location is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Auto-fill address from location if not provided
      const addressData = {
        translations: {
          en: formData.address.translations.en || formData.location?.address || '',
          ar: formData.address.translations.ar || formData.location?.address || ''
        }
      };
      
      const submitData = {
        name: formData.name,
        address: addressData,
        pin: formData.pin,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        description: formData.description,
        googleMapLink: formData.location?.googleMapLink
      };
      
      const response = await fetch('/api/onboarding/clinic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
      
      if (response.ok) {
        router.push(`/${locale}/clinic-profile`);
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Clinic Registration</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clinic Name - Bilingual */}
        <div className="lg:col-span-2">
          <BilingualInput
            label="Clinic Name"
            name="name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            required
            placeholder={{ en: 'Al-Shifa Medical Center', ar: 'مركز الشفاء الطبي' }}
            error={errors.name}
          />
        </div>

        {/* PIN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PIN/Registration Number *
          </label>
          <input
            type="text"
            value={formData.pin}
            onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.pin ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="REG123456"
          />
          {errors.pin && <p className="text-sm text-red-500 mt-1">{errors.pin}</p>}
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email
          </label>
          <input
            type="email"
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="info@clinic.com"
          />
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone
          </label>
          <input
            type="tel"
            value={formData.contactPhone}
            onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+966 11 123 4567"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <LocationInput
          label="Clinic Location"
          placeholder="Search for your clinic location..."
          value={formData.location}
          onChange={(place) => setFormData({ ...formData, location: place })}
          required
          error={errors.location}
        />
      </div>

      {/* Address - Bilingual (Optional - can be auto-filled from location) */}
      <div>
        <BilingualInput
          label="Detailed Address (Optional)"
          name="address"
          value={formData.address}
          onChange={(value) => setFormData({ ...formData, address: value })}
          type="textarea"
          placeholder={{ 
            en: 'Building number, floor, additional details...', 
            ar: 'رقم المبنى، الطابق، تفاصيل إضافية...' 
          }}
        />
      </div>

      {/* Description - Bilingual */}
      <div>
        <BilingualInput
          label="Clinic Description"
          name="description"
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          type="textarea"
          placeholder={{ 
            en: 'Brief description of your clinic services and facilities...', 
            ar: 'وصف مختصر لخدمات ومرافق العيادة...' 
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
          {isSubmitting ? 'Submitting...' : 'Register Clinic'}
        </button>
      </div>
    </form>
  );
}