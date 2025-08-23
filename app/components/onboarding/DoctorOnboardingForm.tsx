'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface DoctorOnboardingFormProps {
  locale: string;
}

export default function DoctorOnboardingForm({ locale }: DoctorOnboardingFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    specialization: '',
    subSpecialization: '',
    licenseNumber: '',
    yearsOfExperience: '',
    education: '',
    hospitalAffiliation: '',
    consultationFee: '',
    bio: '',
    languages: '',
    availableHours: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/onboarding/doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        router.push(`/${locale}/doctor-profile`)
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Error submitting form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Medical License Number *
          </label>
          <input
            type="text"
            id="licenseNumber"
            name="licenseNumber"
            required
            value={formData.licenseNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
            Specialization *
          </label>
          <select
            id="specialization"
            name="specialization"
            required
            value={formData.specialization}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Specialization</option>
            <option value="cardiology">Cardiology</option>
            <option value="dermatology">Dermatology</option>
            <option value="neurology">Neurology</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="psychiatry">Psychiatry</option>
            <option value="general">General Medicine</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="subSpecialization" className="block text-sm font-medium text-gray-700 mb-2">
            Sub-Specialization
          </label>
          <input
            type="text"
            id="subSpecialization"
            name="subSpecialization"
            value={formData.subSpecialization}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience *
          </label>
          <input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            required
            min="0"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="consultationFee" className="block text-sm font-medium text-gray-700 mb-2">
            Consultation Fee (USD) *
          </label>
          <input
            type="number"
            id="consultationFee"
            name="consultationFee"
            required
            min="0"
            value={formData.consultationFee}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
          Education *
        </label>
        <textarea
          id="education"
          name="education"
          required
          rows={3}
          value={formData.education}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Medical degree, university, graduation year..."
        />
      </div>
      
      <div>
        <label htmlFor="hospitalAffiliation" className="block text-sm font-medium text-gray-700 mb-2">
          Hospital/Clinic Affiliation
        </label>
        <input
          type="text"
          id="hospitalAffiliation"
          name="hospitalAffiliation"
          value={formData.hospitalAffiliation}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
          Professional Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          value={formData.bio}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Brief description of your experience and approach to patient care..."
        />
      </div>
      
      <div>
        <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-2">
          Languages Spoken
        </label>
        <input
          type="text"
          id="languages"
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., English, Arabic, French"
        />
      </div>
      
      <div>
        <label htmlFor="availableHours" className="block text-sm font-medium text-gray-700 mb-2">
          Available Hours
        </label>
        <input
          type="text"
          id="availableHours"
          name="availableHours"
          value={formData.availableHours}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Mon-Fri 9AM-5PM"
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-md font-semibold transition-colors"
      >
        {isSubmitting ? 'Completing Registration...' : 'Complete Registration'}
      </button>
    </form>
  )
}