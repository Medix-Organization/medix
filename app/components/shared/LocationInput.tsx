'use client';
import { useEffect, useRef, useState } from 'react';

// Declare the google namespace for TypeScript
declare global {
  namespace google {
    export namespace maps {
      export namespace places {
        class Autocomplete {
          constructor(inputField: HTMLInputElement, opts?: any);
          getPlace(): any;
          addListener(event: string, handler: () => void): void;
        }
      }
    }
  }
  interface Window {
    google: typeof google;
  }
}

type PlaceData = {
  name: string;
  address: string;
  placeId: string;
  googleMapLink?: string;
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
    if (!window.google || !inputRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['establishment', 'geocode'],
    });

    autocomplete.addListener('place_changed', () => {
      const selectedPlace = autocomplete.getPlace();
  
      if (!selectedPlace.place_id || !selectedPlace.formatted_address) return;
  
      // Generate a valid Google Maps URL that matches the validation pattern
      let googleMapLink = '';
      
      if (selectedPlace.url && selectedPlace.url.includes('google.com/maps')) {
        // Use the official URL if it's already a valid Google Maps URL
        googleMapLink = selectedPlace.url;
      } else if (selectedPlace.place_id) {
        // Use the correct Google Maps URL format that matches validation
        googleMapLink = `https://www.google.com/maps/place/?q=place_id:${selectedPlace.place_id}`;
      } else if (selectedPlace.geometry?.location) {
        // Use coordinates format that matches validation
        const lat = selectedPlace.geometry.location.lat();
        const lng = selectedPlace.geometry.location.lng();
        googleMapLink = `https://www.google.com/maps/@${lat},${lng},15z`;
      } else {
        // Fallback to search format that matches validation
        const query = encodeURIComponent(`${selectedPlace.name || ''} ${selectedPlace.formatted_address || ''}`.trim());
        googleMapLink = `https://www.google.com/maps/search/${query}`;
      }
  
      const placeData: PlaceData = {
        name: selectedPlace.name || '',
        address: selectedPlace.formatted_address || '',
        placeId: selectedPlace.place_id,
        googleMapLink: googleMapLink
      };
  
      setPlace(placeData);
      onChange(placeData);
    });
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
          defaultValue={place?.address || ''}
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