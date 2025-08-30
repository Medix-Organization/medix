'use client';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import ClinicManagement from '@/app/components/admin/ClinicManagement';

interface AdminPageProps {
  params: Promise<{ locale: string }>;
}

export default function AdminPage({ params }: AdminPageProps) {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState('clinics');

  // Simple admin check - you can enhance this with proper role-based access
//   if (isLoaded && (!user || !user.emailAddresses[0]?.emailAddress.includes('admin'))) {
//     redirect('/');
//   }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.firstName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('clinics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'clinics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Clinic Management
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'doctors'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Doctor Management
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'clinics' && <ClinicManagement />}
        {activeTab === 'doctors' && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Doctor Management</h3>
            <p className="text-gray-500">Coming soon...</p>
          </div>
        )}
        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
            <p className="text-gray-500">Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}