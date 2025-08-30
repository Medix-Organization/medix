'use client';
import { useEffect, useRef, useState } from 'react';

// Updated PlaceData interface to match Google Places API structure
export type PlaceData = {
  // Basic Fields
  name: string;
  place_id: string;
  formatted_address: string;
  address_components?: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  adr_address?: string;
  business_status?: string;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
    viewport?: {
      northeast: { lat: number; lng: number };
      southwest: { lat: number; lng: number };
    };
  };
  icon?: string;
  icon_mask_base_uri?: string;
  icon_background_color?: string;
  photos?: {
    photo_reference: string;
    height: number;
    width: number;
    html_attributions: string[];
  }[];
  plus_code?: {
    global_code: string;
    compound_code?: string;
  };
  type?: string;
  types?: string[];
  url?: string;
  utc_offset_minutes?: number;
  vicinity?: string;
  
  // Contact Fields
  current_opening_hours?: {
    weekday_text: string[];
    open_now: boolean;
    periods: {
      open: { day: number; time: string };
      close?: { day: number; time: string };
    }[];
    special_days?: any[];
  };
  formatted_phone_number?: string;
  international_phone_number?: string;
  opening_hours?: {
    weekday_text: string[];
    open_now: boolean;
    periods: {
      open: { day: number; time: string };
      close?: { day: number; time: string };
    }[];
  };
  secondary_opening_hours?: any[];
  website?: string;
  
  // Atmosphere Fields
  curbside_pickup?: boolean;
  delivery?: boolean;
  dine_in?: boolean;
  editorial_summary?: {
    overview: string;
    language_code: string;
  };
  price_level?: number;
  rating?: number;
  reservable?: boolean;
  reviews?: {
    author_name: string;
    author_url: string;
    language: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
  }[];
  takeout?: boolean;
  
  // Legacy fields for backward compatibility
  googleMapLink?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  placeId?: string;
};

interface LocationInputProps {
  label: string;
  placeholder: string;
  value?: PlaceData | null;
  onChange: (place: PlaceData | null) => void;
  required?: boolean;
  error?: string;
}

export default function LocationInput({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  required = false,
  error 
}: LocationInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [place, setPlace] = useState<PlaceData | null>(value || null);

  useEffect(() => {
    const initializeAutocomplete = () => {
      const g = (window as any)?.google;
      if (!g?.maps?.places?.Autocomplete || !inputRef.current) {
        console.log('Google Maps API not ready, retrying...');
        setTimeout(initializeAutocomplete, 100);
        return;
      }

      try {
        const autocomplete = new g.maps.places.Autocomplete(inputRef.current, {
          types: ['hospital', 'doctor', 'health'],
          componentRestrictions: { country: 'sa' },
          fields: [
            'place_id', 'name', 'formatted_address', 'address_components',
            'adr_address', 'business_status', 'geometry', 'icon',
            'icon_mask_base_uri', 'icon_background_color', 
            'photos', 'plus_code', 'type', 'types', 'url', 'utc_offset_minutes', 'vicinity',
            'current_opening_hours', 'formatted_phone_number', 'international_phone_number',
            'opening_hours', 'secondary_opening_hours', 'website',
            'editorial_summary', 'price_level', 'rating', 'reviews', 'takeout'
          ] as string[],
        });

        autocomplete.addListener('place_changed', () => {
          const selectedPlace: any = autocomplete.getPlace();
          
          console.log('Place selected:', selectedPlace);
          
          if (!selectedPlace.place_id || !selectedPlace.formatted_address) {
            console.log('Invalid place selected');
            return;
          }

          // Compute open-now state using isOpen() if available to avoid deprecated open_now
          const currentIsOpen =
            typeof selectedPlace.current_opening_hours?.isOpen === 'function'
              ? !!selectedPlace.current_opening_hours.isOpen()
              : undefined;
          const openingIsOpen =
            typeof selectedPlace.opening_hours?.isOpen === 'function'
              ? !!selectedPlace.opening_hours.isOpen()
              : undefined;
  
          // Generate Google Maps URL
          let googleMapLink = '';
          
          if (selectedPlace.url && selectedPlace.url.includes('google.com/maps')) {
            googleMapLink = selectedPlace.url;
          } else if (selectedPlace.place_id) {
            googleMapLink = `https://www.google.com/maps/place/?q=place_id:${selectedPlace.place_id}`;
          } else if (selectedPlace.geometry?.location) {
            const lat = selectedPlace.geometry.location.lat();
            const lng = selectedPlace.geometry.location.lng();
            googleMapLink = `https://www.google.com/maps/@${lat},${lng},15z`;
          }
  
          // Create comprehensive place data object with proper error handling
          const placeData: PlaceData = {
            // Basic fields
            name: selectedPlace.name || '',
            place_id: selectedPlace.place_id,
            formatted_address: selectedPlace.formatted_address || '',
            address_components: selectedPlace.address_components?.map((component : any) => ({
              long_name: component.long_name,
              short_name: component.short_name,
              types: component.types
            })),
            adr_address: selectedPlace.adr_address,
            business_status: selectedPlace.business_status,
            geometry: selectedPlace.geometry ? {
              location: {
                lat: selectedPlace.geometry.location ? selectedPlace.geometry.location.lat() : 0,
                lng: selectedPlace.geometry.location ? selectedPlace.geometry.location.lng() : 0
              },
              viewport: selectedPlace.geometry.viewport ? {
                northeast: {
                  lat: selectedPlace.geometry.viewport.getNorthEast() ? selectedPlace.geometry.viewport.getNorthEast().lat() : 0,
                  lng: selectedPlace.geometry.viewport.getNorthEast() ? selectedPlace.geometry.viewport.getNorthEast().lng() : 0
                },
                southwest: {
                  lat: selectedPlace.geometry.viewport.getSouthWest() ? selectedPlace.geometry.viewport.getSouthWest().lat() : 0,
                  lng: selectedPlace.geometry.viewport.getSouthWest() ? selectedPlace.geometry.viewport.getSouthWest().lng() : 0
                }
              } : undefined
            } : undefined,
            icon: selectedPlace.icon,
            icon_mask_base_uri: selectedPlace.icon_mask_base_uri,
            icon_background_color: selectedPlace.icon_background_color,
            // FIXED: Correct photo handling - photo_reference is a string ID, not a URL
            photos: selectedPlace.photos?.map((photo: any) => ({
              // JS Places Photo objects expose getUrl(); there is no stable 'photo_reference' here.
              photo_reference: typeof photo.getUrl === 'function' ? photo.getUrl({ maxWidth: 1024 }) : '',
              height: photo.height || 0,
              width: photo.width || 0,
              html_attributions: Array.isArray(photo.html_attributions) ? photo.html_attributions : []
            })),
            plus_code: selectedPlace.plus_code,
            types: selectedPlace.types,
            url: selectedPlace.url,
            utc_offset_minutes: selectedPlace.utc_offset_minutes,
            vicinity: selectedPlace.vicinity,
            
            // Contact fields with proper null checking
            current_opening_hours: selectedPlace.current_opening_hours ? {
              weekday_text: selectedPlace.current_opening_hours.weekday_text || [],
              // use isOpen() instead of deprecated open_now
              open_now: currentIsOpen ?? false,
              periods: (selectedPlace.current_opening_hours.periods || []).map((period: any) => ({
                open: { day: period.open?.day || 0, time: period.open?.time || '' },
                close: period.close ? { day: period.close.day || 0, time: period.close.time || '' } : undefined
              })),
              special_days: selectedPlace.current_opening_hours.special_days
            } : undefined,
            formatted_phone_number: selectedPlace.formatted_phone_number,
            international_phone_number: selectedPlace.international_phone_number,
            opening_hours: selectedPlace.opening_hours ? {
              weekday_text: selectedPlace.opening_hours.weekday_text || [],
              // use isOpen() instead of deprecated open_now
              open_now: openingIsOpen ?? false,
              periods: (selectedPlace.opening_hours.periods || []).map((period: any) => ({
                open: { day: period.open?.day || 0, time: period.open?.time || '' },
                close: period.close ? { day: period.close.day || 0, time: period.close.time || '' } : undefined
              }))
            } : undefined,
            secondary_opening_hours: selectedPlace.secondary_opening_hours,
            website: selectedPlace.website,
            
            // Atmosphere fields
            editorial_summary: selectedPlace.editorial_summary,
            price_level: selectedPlace.price_level,
            rating: selectedPlace.rating,
            reservable: selectedPlace.reservable,
            reviews: selectedPlace.reviews?.map((review : any) => ({
              author_name: review.author_name || '',
              author_url: review.author_url || '',
              language: review.language || '',
              profile_photo_url: review.profile_photo_url || '',
              rating: review.rating || 0,
              relative_time_description: review.relative_time_description || '',
              text: review.text || '',
              time: review.time || 0
            })),
            takeout: selectedPlace.takeout,
            
            // Legacy fields for backward compatibility
            googleMapLink: googleMapLink,
            latitude: selectedPlace.geometry?.location ? selectedPlace.geometry.location.lat() : 0,
            longitude: selectedPlace.geometry?.location ? selectedPlace.geometry.location.lng() : 0,
            address: selectedPlace.formatted_address || '',
            placeId: selectedPlace.place_id
          };
  
          console.log('Setting comprehensive place data:', placeData);
          setPlace(placeData);
          onChange(placeData);
        });
      } catch (error) {
        console.error('Error initializing Google Places Autocomplete:', error);
      }
    };

    initializeAutocomplete();
  }, [onChange]);

  const handleClear = () => {
    setPlace(null);
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={placeholder}
          defaultValue={place?.formatted_address || place?.address || ''}
        />
        {place && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {place && (
        <div className="mt-2 bg-gray-50 p-3 rounded border">
          <p className="text-sm"><strong>Selected:</strong> {place.name}</p>
          <p className="text-sm text-gray-600">{place.address}</p>
        </div>
      )}
    </div>
  );
}
