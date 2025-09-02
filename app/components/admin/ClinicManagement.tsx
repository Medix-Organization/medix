'use client';
import { useState, useEffect } from 'react';
import { getAllClinics, createClinic } from '@/lib/actions/clinicActions';
import { ClinicType } from '@/lib/types/clinic';
import SingleClinicForm from './SingleClinicForm';
import ClinicList from './ClinicList';
import BatchClinicUpload from './BatchClinicUpload';
import QuickClinicAdd from './QuickClinicAdd';

export default function ClinicManagement() {
  const [clinics, setClinics] = useState<ClinicType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'list' | 'add' | 'batch' | 'quick'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadClinics();
  }, []);

  const loadClinics = async () => {
    try {
      setLoading(true);
      const allClinics = await getAllClinics();
      setClinics(allClinics);
    } catch (error) {
      console.error('Error loading clinics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClinicAdded = () => {
    loadClinics();
    setActiveView('list');
  };

  const filteredClinics = clinics.filter(clinic => {
    const searchLower = searchQuery.toLowerCase();
    
    // Handle new Google Places API structure (name as string)
    const nameMatch = clinic?.name?.toLowerCase().includes(searchLower) ||
                     clinic?.displayName?.text?.toLowerCase().includes(searchLower);
    
    // Handle legacy structure (name as LocalizedString) for backward compatibility
    const legacyNameMatch = (clinic as any)?.name?.translations?.en?.toLowerCase().includes(searchLower) ||
                           (clinic as any)?.name?.translations?.ar?.includes(searchQuery);
    
    // Handle address matching
    const addressMatch = clinic?.formattedAddress?.toLowerCase().includes(searchLower) ||
                        (clinic as any)?.address?.translations?.en?.toLowerCase().includes(searchLower) ||
                        (clinic as any)?.address?.translations?.ar?.includes(searchQuery);
    
    return nameMatch || legacyNameMatch || addressMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Clinic Management</h2>
          <p className="text-gray-600">Manage clinics in your platform</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setActiveView('quick')}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Quick Add from Google
          </button>
          <button
            onClick={() => setActiveView('add')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Single Clinic
          </button>
          <button
            onClick={() => setActiveView('batch')}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Batch Upload
          </button>
        </div>
      </div>

      {/* View Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveView('list')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeView === 'list'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Clinic List ({clinics.length})
          </button>
          <button
            onClick={() => setActiveView('quick')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeView === 'quick'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Quick Add
          </button>
          <button
            onClick={() => setActiveView('add')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeView === 'add'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Manual Add
          </button>
          <button
            onClick={() => setActiveView('batch')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeView === 'batch'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Batch Upload
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeView === 'list' && (
        <div className="space-y-4">
          {/* Search */}
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search clinics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <ClinicList clinics={filteredClinics} loading={loading} onRefresh={loadClinics} />
        </div>
      )}

      {activeView === 'quick' && (
        <QuickClinicAdd
          onSuccess={handleClinicAdded}
          onCancel={() => setActiveView('list')}
        />
      )}

      {activeView === 'add' && (
        <SingleClinicForm onSuccess={handleClinicAdded} onCancel={() => setActiveView('list')} />
      )}

      {activeView === 'batch' && (
        <BatchClinicUpload onSuccess={handleClinicAdded} onCancel={() => setActiveView('list')} />
      )}
    </div>
  );
}