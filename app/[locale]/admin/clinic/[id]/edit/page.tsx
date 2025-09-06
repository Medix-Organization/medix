'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { getClinicWithDoctors } from '@/lib/actions/getClinicById';
import { updateClinic } from '@/lib/actions/clinicActions';
import { 
  addOperationsToClinic, 
  removeOperationsFromClinic,
  getAllOperations,
  addDoctorToClinic,
  removeDoctorFromClinic,
  getAllDoctors
} from '@/lib/actions/clinicOperationsActions';
import { ClinicType } from '@/lib/types/clinic';
import LocationInput, { PlaceData } from '@/app/components/shared/LocationInput';
import DoctorScheduleManager from '@/app/components/admin/DoctorScheduleManager';
import OperationsManager from '@/app/components/admin/OperationsManager';
import { createOperation } from '@/lib/actions/operationActions';


interface ClinicEditPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default function ClinicEditPage({ params }: ClinicEditPageProps) {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [clinic, setClinic] = useState<ClinicType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [clinicId, setClinicId] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    pin: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    description: '',
    businessStatus: 'OPERATIONAL'
  });
  const [location, setLocation] = useState<PlaceData | null>(null);
  const [operations, setOperations] = useState<any[]>([]);
  const [allOperations, setAllOperations] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [allDoctors, setAllDoctors] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const resolvedParams = await params;
        setClinicId(resolvedParams.id);
        
        // Load clinic data
        const clinicData = await getClinicWithDoctors(resolvedParams.id);
        
        // Load all operations and doctors
        const [allOps, allDocs] = await Promise.all([
          getAllOperations(),
          getAllDoctors()
        ]);
        
        if (clinicData) {
          setClinic(clinicData);
          setFormData({
            name: clinicData.name || clinicData.displayName?.text || '',
            pin: clinicData.pin || '',
            contactEmail: clinicData.contactEmail || '',
            contactPhone: clinicData.contactPhone || clinicData.nationalPhoneNumber || '',
            website: clinicData.website || '',
            description: clinicData.description?.translations?.en || clinicData.editorialSummary?.text || '',
            businessStatus: clinicData.businessStatus || 'OPERATIONAL'
          });
          
          // Set location data
          if (clinicData.googlePlaceId) {
            setLocation({
              place_id: clinicData.googlePlaceId,
              name: clinicData.name || '',
              formatted_address: clinicData.formattedAddress || '',
              geometry: clinicData.location ? {
                location: {
                  lat: clinicData.location.latitude || 0,
                  lng: clinicData.location.longitude || 0
                }
              } : undefined,
            } as PlaceData);
          }
          
          // Set operations and doctors
          setOperations(clinicData.operations || []);
          setDoctors(clinicData.doctors || []);
        }
        
        setAllOperations(allOps);
        setAllDoctors(allDocs);
      } catch (err) {
        setError('Failed to load clinic data');
        console.error('Error loading clinic:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (place: PlaceData | null) => {
    setLocation(place);
  };

  const handleOperationsChange = async (selectedOperations: string[]) => {
    try {
      const currentOperationIds = operations.map(op => op._id);
      const toAdd = selectedOperations.filter(id => !currentOperationIds.includes(id));
      const toRemove = currentOperationIds.filter(id => !selectedOperations.includes(id));
      
      if (toAdd.length > 0) {
        await addOperationsToClinic(clinicId, toAdd);
      }
      if (toRemove.length > 0) {
        await removeOperationsFromClinic(clinicId, toRemove);
      }
      
      // Update local state
      const updatedOperations = allOperations.filter(op => selectedOperations.includes(op._id));
      setOperations(updatedOperations);
    } catch (error) {
      console.error('Error updating operations:', error);
      setError('Failed to update operations');
    }
  };

  const handleDoctorScheduleChange = async (doctorId: string, schedule: any[], notes?: string) => {
    try {
      await addDoctorToClinic(clinicId, doctorId, schedule, notes);
      // Refresh doctor data
      const updatedDoctors = await getAllDoctors();
      setAllDoctors(updatedDoctors);
    } catch (error) {
      console.error('Error updating doctor schedule:', error);
      setError('Failed to update doctor schedule');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
  
    try {
      const updateData: Partial<ClinicType> = {
        name: formData.name,
        pin: formData.pin,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        website: formData.website,
        businessStatus: formData.businessStatus as 'OPERATIONAL' | 'CLOSED_TEMPORARILY' | 'CLOSED_PERMANENTLY',
      };

      // Convert description to LocalizedString if provided
      if (formData.description) {
        updateData.description = {
          translations: {
            en: formData.description,
            ar: formData.description
          }
        };
      }

      // Add location data if available
      if (location) {
        updateData.googlePlaceId = location.place_id;
        updateData.formattedAddress = location.formatted_address;
        if (location.geometry?.location) {
          updateData.location = {
            latitude: location.geometry.location.lat,
            longitude: location.geometry.location.lng
          };
        }
      }
  
      await updateClinic(clinicId, updateData);
      alert('Clinic updated successfully!');
      router.push('/admin');
    } catch (err) {
      setError('Failed to update clinic');
      console.error('Error updating clinic:', err);
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!clinic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Clinic Not Found</h1>
          <button
            onClick={() => router.push('/admin')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Clinic</h1>
              <p className="mt-1 text-sm text-gray-500">Update clinic information, operations, and doctor schedules</p>
            </div>
            <button
              onClick={() => router.push('/admin')}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back to Admin
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'basic', label: 'Basic Info' },
              { id: 'operations', label: 'Operations' },
              { id: 'doctors', label: 'Doctors & Schedules' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-white shadow rounded-lg">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clinic Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN/License
                  </label>
                  <input
                    type="text"
                    name="pin"
                    value={formData.pin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Website and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Status
                  </label>
                  <select
                    name="businessStatus"
                    value={formData.businessStatus}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="OPERATIONAL">Operational</option>
                    <option value="CLOSED_TEMPORARILY">Temporarily Closed</option>
                    <option value="CLOSED_PERMANENTLY">Permanently Closed</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <LocationInput
                  label="Clinic Location"
                  placeholder="Search for clinic location..."
                  value={location}
                  onChange={handleLocationChange}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the clinic..."
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => router.push('/admin')}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {/* Operations Tab */}
          {activeTab === 'operations' && (
            <div className="p-6">
              <OperationsManager
                clinicOperations={operations.map(id => allOperations.find(op => op._id === id)).filter(Boolean)}
                allOperations={allOperations}
                onOperationsChange={handleOperationsChange}
              />
            </div>
          )}

          {/* Doctors & Schedules Tab */}
          {activeTab === 'doctors' && (
            <div className="p-6">
              <DoctorScheduleManager
                clinicId={clinicId}
                clinicDoctors={doctors}
                allDoctors={allDoctors}
                onDoctorScheduleChange={handleDoctorScheduleChange}
                onRemoveDoctor={(doctorId) => removeDoctorFromClinic(clinicId, doctorId)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}