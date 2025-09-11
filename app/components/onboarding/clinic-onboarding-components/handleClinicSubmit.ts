import { createClinic } from "@/lib/actions/clinicActions";
import { PlaceData } from "../../shared/LocationInput";

export async function handleClinicSubmit(
  place: PlaceData ,
   setClinicId : (id : string) => void ,
    setError : (string : string | null) => void,
    setIsSubmitting : (bool : boolean) => void,
    setCurrentStep : (step : "location" | "operations" | "doctors") => void
  ) {
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
      const generatePIN = () => Math.random().toString(36).substr(2, 9).toUpperCase();

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