'use client';
import { useState } from 'react';
import { FaPlus, FaTrash, FaUserMd } from 'react-icons/fa';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  licenseNumber?: string;
  phone?: string;
  email?: string;
}

interface DoctorManagementProps {
  clinicId: string;
  onComplete: () => void;
}

const commonSpecializations = [
  'General Practitioner',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedic Surgeon',
  'Gynecologist',
  'Ophthalmologist',
  'ENT Specialist',
  'Neurologist',
  'Psychiatrist',
  'Radiologist',
  'Anesthesiologist',
  'Dentist',
  'Physiotherapist'
];

export default function DoctorManagement({ clinicId, onComplete }: DoctorManagementProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialization: '',
    licenseNumber: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddDoctor = () => {
    if (newDoctor.name.trim() && newDoctor.specialization.trim()) {
      setDoctors(prev => [...prev, {
        id: Date.now().toString(),
        name: newDoctor.name.trim(),
        specialization: newDoctor.specialization.trim(),
        licenseNumber: newDoctor.licenseNumber.trim() || undefined,
        phone: newDoctor.phone.trim() || undefined,
        email: newDoctor.email.trim() || undefined
      }]);
      setNewDoctor({ name: '', specialization: '', licenseNumber: '', phone: '', email: '' });
    }
  };

  const handleRemoveDoctor = (id: string) => {
    setDoctors(prev => prev.filter(doctor => doctor.id !== id));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Save doctors to clinic
      // await saveClinicDoctors(clinicId, doctors);
      console.log('Saving doctors for clinic:', clinicId, doctors);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onComplete();
    } catch (error) {
      console.error('Error saving doctors:', error);
      alert('Failed to save doctors. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold mb-6">Add Your Clinic Doctors</h2>
      <p className="text-gray-600 mb-6">Add the doctors who work at your clinic. You can add more doctors later.</p>

      {/* Add Doctor Form */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FaUserMd className="mr-2 text-blue-600" /> Add New Doctor
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name *</label>
            <input
              type="text"
              value={newDoctor.name}
              onChange={(e) => setNewDoctor(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dr. Ahmed Al-Rashid"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specialization *</label>
            <select
              value={newDoctor.specialization}
              onChange={(e) => setNewDoctor(prev => ({ ...prev, specialization: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select specialization</option>
              {commonSpecializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
            <input
              type="text"
              value={newDoctor.licenseNumber}
              onChange={(e) => setNewDoctor(prev => ({ ...prev, licenseNumber: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="LIC123456"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={newDoctor.phone}
              onChange={(e) => setNewDoctor(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+966 50 123 4567"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={newDoctor.email}
              onChange={(e) => setNewDoctor(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="doctor@clinic.com"
            />
          </div>
        </div>
        
        <button
          onClick={handleAddDoctor}
          disabled={!newDoctor.name.trim() || !newDoctor.specialization.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <FaPlus className="mr-2" /> Add Doctor
        </button>
      </div>

      {/* Doctors List */}
      {doctors.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Added Doctors ({doctors.length})</h3>
          <div className="space-y-3">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <FaUserMd className="text-blue-600 mr-2" />
                    <span className="font-medium text-blue-900">{doctor.name}</span>
                  </div>
                  <div className="text-sm text-blue-600 mb-1">{doctor.specialization}</div>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                    {doctor.licenseNumber && <span>License: {doctor.licenseNumber}</span>}
                    {doctor.phone && <span>Phone: {doctor.phone}</span>}
                    {doctor.email && <span>Email: {doctor.email}</span>}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveDoctor(doctor.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <div className="text-sm text-gray-500">
          {doctors.length} doctor(s) added
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => onComplete()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Skip for Now
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Completing...' : 'Complete Setup'}
          </button>
        </div>
      </div>
    </div>
  );
}