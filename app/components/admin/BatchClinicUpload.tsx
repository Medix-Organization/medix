'use client';
import { useState, useEffect, useRef } from 'react';
import { createClinic } from '@/lib/actions/clinicActions';
import { ClinicType } from '@/lib/types/clinic';

interface BatchClinicUploadProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface PlaceResult {
  place_id: string;
  name: string;
  formatted_address: string;
  formatted_phone_number?: string;
  website?: string;
  types: string[];
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
  photos?: google.maps.places.Photo[];
}

interface SelectedClinic {
  placeId: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  types: string[];
  coordinates: { lat: number; lng: number };
  selected: boolean;
}

export default function BatchClinicUpload({ onSuccess, onCancel }: BatchClinicUploadProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SelectedClinic[]>([]);
  const [selectedClinics, setSelectedClinics] = useState<SelectedClinic[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [results, setResults] = useState<{ success: number; errors: string[] } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    // Initialize Google Places Service
    if (typeof google !== 'undefined' && mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 24.7136, lng: 46.6753 }, // Riyadh coordinates
        zoom: 11,
      });
      serviceRef.current = new google.maps.places.PlacesService(map);
    }
  }, []);

  const searchClinics = () => {
    if (!serviceRef.current || !searchQuery.trim()) return;

    setLoading(true);
    setSearchResults([]);

    const request: google.maps.places.TextSearchRequest = {
      query: `${searchQuery} clinic hospital medical center Saudi Arabia`,
      type: 'hospital',
      region: 'SA', // Saudi Arabia
    };

    serviceRef.current.textSearch(request, (results, status) => {
      setLoading(false);
      
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const clinicResults: SelectedClinic[] = results
          .filter(place => {
            // Filter for medical-related places
            const medicalTypes = ['hospital', 'doctor', 'health', 'medical_center', 'clinic', 'dentist', 'pharmacy'];
            return place.types?.some(type => medicalTypes.includes(type));
          })
          .map(place => ({
            placeId: place.place_id!,
            name: place.name!,
            address: place.formatted_address!,
            types: place.types || [],
            coordinates: {
              lat: place.geometry!.location!.lat(),
              lng: place.geometry!.location!.lng()
            },
            selected: false
          }));
        
        setSearchResults(clinicResults);
        
        // Get detailed information for each place
        clinicResults.forEach((clinic, index) => {
          const detailRequest: google.maps.places.PlaceDetailsRequest = {
            placeId: clinic.placeId,
            fields: ['formatted_phone_number', 'website']
          };
          
          serviceRef.current!.getDetails(detailRequest, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
              setSearchResults(prev => prev.map((c, i) => 
                i === index ? {
                  ...c,
                  phone: place.formatted_phone_number,
                  website: place.website
                } : c
              ));
            }
          });
        });
      } else {
        console.error('Places search failed:', status);
      }
    });
  };

  const toggleClinicSelection = (placeId: string) => {
    setSearchResults(prev => prev.map(clinic => 
      clinic.placeId === placeId 
        ? { ...clinic, selected: !clinic.selected }
        : clinic
    ));
  };

  const addSelectedClinics = () => {
    const newSelected = searchResults.filter(clinic => clinic.selected);
    setSelectedClinics(prev => {
      const existing = prev.map(c => c.placeId);
      const toAdd = newSelected.filter(c => !existing.includes(c.placeId));
      return [...prev, ...toAdd];
    });
    
    // Reset search
    setSearchResults([]);
    setSearchQuery('');
  };

  const removeSelectedClinic = (placeId: string) => {
    setSelectedClinics(prev => prev.filter(clinic => clinic.placeId !== placeId));
  };

  const createClinicsFromPlaces = async () => {
    if (selectedClinics.length === 0) return;

    setCreating(true);
    const errors: string[] = [];
    let successCount = 0;

    for (const clinic of selectedClinics) {
      try {
        // Generate a simple PIN (you might want to make this more sophisticated)
        const pin = `GGL${Date.now().toString().slice(-6)}`;
        
        // Extract city from address (basic extraction)
        const addressParts = clinic.address.split(',');
        const city = addressParts[addressParts.length - 2]?.trim() || 'Riyadh';
        
        // Create clinic data matching the CreateClinicData interface
        const clinicData = {
          name: clinic.name,
          pin: pin,
          googlePlaceId: clinic.placeId,
          formattedAddress: clinic.address,
          types: clinic.types,
          businessStatus: 'OPERATIONAL',
          
          // Nested contact object
          contact: {
            phone: clinic.phone || '',
            email: '', // Will need to be added manually later
            website: clinic.website || ''
          },
          
          // Nested location object
          location: {
            googleMapLink: `https://www.google.com/maps/place/?q=place_id:${clinic.placeId}`,
            address: {
              street: clinic.address,
              city: city,
              country: 'Saudi Arabia'
            },
            coordinates: {
              latitude: clinic.coordinates.lat,
              longitude: clinic.coordinates.lng
            }
          },
          
          nationalPhoneNumber: clinic.phone || '',
          websiteUri: clinic.website || '',
          
          // Fix: Use translations structure for description
          description: {
            translations: {
              en: `Medical facility imported from Google Places. Types: ${clinic.types.join(', ')}`,
              ar: `منشأة طبية مستوردة من خرائط جوجل. الأنواع: ${clinic.types.join(', ')}`
            }
          },
          
          // Fix: Use translations structure for address
          address: {
            translations: {
              en: clinic.address,
              ar: clinic.address // You may want to translate this
            }
          },
          
          doctors: [],
          
          // Legacy fields for compatibility
          contactPhone: clinic.phone || '',
          contactEmail: '',
          city: city,
          
          // Add required fields with default values
          isActive: true,
          verificationStatus: 'pending'
        };

        await createClinic(clinicData);
        successCount++;
      } catch (error) {
        errors.push(`${clinic.name}: Failed to create - ${error}`);
      }
    }

    setResults({ success: successCount, errors });
    setCreating(false);
    
    if (successCount > 0) {
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Hidden map for Places Service */}
      <div ref={mapRef} style={{ display: 'none' }} />
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Add Clinics from Google Places</h3>
        
        {/* Instructions */}
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <h4 className="font-medium text-blue-900 mb-2">Instructions:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Search for clinics, hospitals, or medical centers</li>
            <li>• Select the ones you want to add to your platform</li>
            <li>• Review and confirm the selection</li>
            <li>• Note: Email addresses will need to be added manually later</li>
          </ul>
        </div>

        {/* Search Section */}
        <div className="space-y-4 mb-6">
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Search for clinics (e.g., 'dental clinic Riyadh', 'hospital Jeddah')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchClinics()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={searchClinics}
              disabled={!searchQuery.trim() || loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-900">Search Results ({searchResults.length})</h4>
              <button
                onClick={addSelectedClinics}
                disabled={!searchResults.some(c => c.selected)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Selected ({searchResults.filter(c => c.selected).length})
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {searchResults.map((clinic) => (
                <div
                  key={clinic.placeId}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    clinic.selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleClinicSelection(clinic.placeId)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{clinic.name}</h5>
                      <p className="text-sm text-gray-600 mt-1">{clinic.address}</p>
                      {clinic.phone && (
                        <p className="text-sm text-gray-600 mt-1">📞 {clinic.phone}</p>
                      )}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {clinic.types.slice(0, 3).map(type => (
                          <span key={type} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {type.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={clinic.selected}
                      onChange={() => toggleClinicSelection(clinic.placeId)}
                      className="ml-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Clinics */}
        {selectedClinics.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-900">Selected Clinics ({selectedClinics.length})</h4>
              <button
                onClick={createClinicsFromPlaces}
                disabled={creating}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? 'Creating...' : `Create ${selectedClinics.length} Clinics`}
              </button>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {selectedClinics.map((clinic) => (
                <div key={clinic.placeId} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">{clinic.name}</h5>
                    <p className="text-sm text-gray-600">{clinic.address}</p>
                  </div>
                  <button
                    onClick={() => removeSelectedClinic(clinic.placeId)}
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="mt-6 p-4 rounded-md border">
            <h4 className="font-medium mb-2">Creation Results:</h4>
            <p className="text-green-600 mb-2">Successfully created: {results.success} clinics</p>
            {results.errors.length > 0 && (
              <div>
                <p className="text-red-600 mb-2">Errors ({results.errors.length}):</p>
                <ul className="text-sm text-red-600 space-y-1 max-h-40 overflow-y-auto">
                  {results.errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}