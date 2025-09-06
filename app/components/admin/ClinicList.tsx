'use client';
import { useState } from 'react';
import { ClinicType } from '@/lib/types/clinic';
import { useRouter } from 'next/navigation';

interface ClinicListProps {
  clinics: ClinicType[];
  loading: boolean;
  onRefresh: () => void;
}

export default function ClinicList({ clinics, loading, onRefresh }: ClinicListProps) {
  const [selectedClinic, setSelectedClinic] = useState<ClinicType | null>(null);
  const router = useRouter();

  // Helper function to get clinic name
  const getClinicName = (clinic: ClinicType) => {
    return clinic.name || clinic.displayName?.text || 'Unnamed Clinic';
  };

  // Helper function to get clinic address
  const getClinicAddress = (clinic: ClinicType) => {
    return clinic.formattedAddress || 
           (clinic as any)?.address?.translations?.en || 
           'Address not available';
  };

  // Helper function to get contact info
  const getContactEmail = (clinic: ClinicType) => {
    return clinic.contactEmail || 'Email not available';
  };

  const getContactPhone = (clinic: ClinicType) => {
    return clinic.nationalPhoneNumber || 
           clinic.internationalPhoneNumber || 
           clinic.contactPhone || 
           'Phone not available';
  };

  // Add this import at the top
 

  // In the clinic card, add this button after the "View on Map" link (around line 160):
 

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading clinics...</span>
      </div>
    );
  }

  if (clinics.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No clinics found</h3>
        <p className="text-gray-500 mb-4">Get started by adding your first clinic.</p>
        <button
          onClick={onRefresh}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Clinics ({clinics.length})
        </h3>
        <button
          onClick={onRefresh}
          className="text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Clinic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinics.map((clinic) => (
          <div
            key={clinic._id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedClinic(clinic)}
          >
            {/* All your clinic content here - make sure it's inside the map function */}
            {/* The 'clinic' variable is only available inside this map function */}
            
            {/* Clinic Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {getClinicName(clinic)}
                </h4>
                {clinic.types && (
                  <p className="text-sm text-gray-600">
                    {clinic.types.join(', ')}
                  </p>
                )}
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                clinic.businessStatus === 'OPERATIONAL' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {clinic.businessStatus || 'Active'}
              </span>
            </div>
               <div className="mt-4 flex space-x-2">
    {(clinic.googleMapsUri || (clinic as any)?.location?.googleMapLink) && (
      <a
        href={clinic.googleMapsUri || (clinic as any)?.location?.googleMapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        View on Map
      </a>
    )}
    
    <button
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/admin/clinic/${clinic._id}/edit`);
      }}
      className="inline-flex items-center text-green-600 hover:text-green-800 text-sm"
    >
      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
      Edit Clinic
    </button>
  </div>
            {/* Clinic Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{getClinicAddress(clinic)}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{getContactEmail(clinic)}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="truncate">{getContactPhone(clinic)}</span>
              </div>
              
              {clinic.pin && (
                <div className="flex items-center text-gray-600">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>PIN: {clinic.pin}</span>
                </div>
              )}

              {clinic.rating && (
                <div className="flex items-center text-gray-600">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{clinic.rating} ({clinic.userRatingsTotal || 0} reviews)</span>
                </div>
              )}
            </div>

            {/* Location Link */}
            {(clinic.googleMapsUri || (clinic as any)?.location?.googleMapLink) && (
              <div className="mt-4">
                <a
                  href={clinic.googleMapsUri || (clinic as any)?.location?.googleMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View on Map
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Clinic Detail Modal */}
      {selectedClinic && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={() => setSelectedClinic(null)}>
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Clinic Details
              </h3>
              <button
                onClick={() => setSelectedClinic(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">{getClinicName(selectedClinic)}</h4>
                {selectedClinic.types && (
                  <p className="text-gray-600">{selectedClinic.types.join(', ')}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedClinic.pin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">PIN/License</label>
                    <p className="text-gray-900">{selectedClinic.pin}</p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{getContactEmail(selectedClinic)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">{getContactPhone(selectedClinic)}</p>
                </div>
                
                {selectedClinic.businessStatus && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p className="text-gray-900">{selectedClinic.businessStatus}</p>
                  </div>
                )}

                {selectedClinic.rating && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <p className="text-gray-900">{selectedClinic.rating} ⭐ ({selectedClinic.userRatingsTotal || 0} reviews)</p>
                  </div>
                )}

                {selectedClinic.website && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Website</label>
                    <a href={selectedClinic.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      {selectedClinic.website}
                    </a>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <p className="text-gray-900">{getClinicAddress(selectedClinic)}</p>
              </div>
              
              {selectedClinic.editorialSummary && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="text-gray-900">{selectedClinic.editorialSummary.text}</p>
                </div>
              )}
              
              {selectedClinic.openingHours?.weekdayText && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Opening Hours</label>
                  <div className="text-gray-900">
                    {selectedClinic.openingHours.weekdayText.map((day, index) => (
                      <p key={index} className="text-sm">{day}</p>
                    ))}
                  </div>
                </div>
              )}
              
              {(selectedClinic.googleMapsUri || (selectedClinic as any)?.location?.googleMapLink) && (
                <div>
                  <a
                    href={selectedClinic.googleMapsUri || (selectedClinic as any)?.location?.googleMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View on Google Maps
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}