'use client';
import { useState, useEffect } from 'react';
import { DoctorType } from '@/lib/types/doctor';
import { ClinicAssociation, TimeSlot, DaySchedule } from '@/lib/types/workingHours';
import { LocalizedString } from '@/lib/types/common';

interface DoctorScheduleManagerProps {
  clinicId: string;
  clinicDoctors: DoctorType[];
  allDoctors: DoctorType[];
  onDoctorScheduleChange: (doctorId: string, workingHours: DaySchedule[], notes?: string) => void;
  onRemoveDoctor: (doctorId: string) => void;
}

// Helper function to get localized string
const getLocalizedString = (localizedString: string | LocalizedString, locale: string = 'en'): string => {
  if (typeof localizedString === 'string') {
    return localizedString;
  }
  return localizedString.translations[locale as keyof typeof localizedString.translations] || 
         localizedString.translations.en || 
         Object.values(localizedString.translations)[0] || '';
};

export default function DoctorScheduleManager({
  clinicId,
  clinicDoctors,
  allDoctors,
  onDoctorScheduleChange,
  onRemoveDoctor
}: DoctorScheduleManagerProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [doctorSchedules, setDoctorSchedules] = useState<Record<string, DaySchedule[]>>({});
  const [doctorNotes, setDoctorNotes] = useState<Record<string, string>>({});
  const [editingSchedule, setEditingSchedule] = useState<{
    doctorId: string;
    dayIndex: number;
    slotIndex: number;
  } | null>(null);
  const [tempTimeSlot, setTempTimeSlot] = useState<TimeSlot>({ startTime: '', endTime: '' });
  const [tempNotes, setTempNotes] = useState('');

  // Available doctors (not already assigned to this clinic)
  const availableDoctors = allDoctors.filter(doctor => 
    !clinicDoctors.some(clinicDoctor => clinicDoctor._id === doctor._id)
  );

  // Define days of week with proper typing
  const daysOfWeek: Array<'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'> = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const initializeSchedule = (doctorId: string) => {
    const defaultSchedule: DaySchedule[] = daysOfWeek.map((day) => ({
      dayOfWeek: day,
      isAvailable: false,
      timeSlots: []
    }));
    
    setDoctorSchedules(prev => ({ ...prev, [doctorId]: defaultSchedule }));
    setDoctorNotes(prev => ({ ...prev, [doctorId]: '' }));
  };

  const handleDoctorSelect = () => {
    if (selectedDoctor && !doctorSchedules[selectedDoctor]) {
      initializeSchedule(selectedDoctor);
    }
  };

  const handleScheduleChange = (doctorId: string, dayIndex: number, field: keyof DaySchedule, value: any) => {
    setDoctorSchedules(prev => {
      const updated = { ...prev };
      if (!updated[doctorId]) {
        initializeSchedule(doctorId);
        return updated;
      }
      
      updated[doctorId] = [...updated[doctorId]];
      updated[doctorId][dayIndex] = { ...updated[doctorId][dayIndex], [field]: value };
      
      if (field === 'isAvailable' && !value) {
        updated[doctorId][dayIndex].timeSlots = [];
      }
      
      return updated;
    });
  };

  const addTimeSlot = (doctorId: string, dayIndex: number) => {
    setDoctorSchedules(prev => {
      const updated = { ...prev };
      if (!updated[doctorId]) return updated;
      
      updated[doctorId] = [...updated[doctorId]];
      updated[doctorId][dayIndex] = {
        ...updated[doctorId][dayIndex],
        timeSlots: [...updated[doctorId][dayIndex].timeSlots, { startTime: '09:00', endTime: '17:00' }]
      };
      
      return updated;
    });
  };

  const removeTimeSlot = (doctorId: string, dayIndex: number, slotIndex: number) => {
    setDoctorSchedules(prev => {
      const updated = { ...prev };
      if (!updated[doctorId]) return updated;
      
      updated[doctorId] = [...updated[doctorId]];
      updated[doctorId][dayIndex] = {
        ...updated[doctorId][dayIndex],
        timeSlots: updated[doctorId][dayIndex].timeSlots.filter((_, index) => index !== slotIndex)
      };
      
      return updated;
    });
  };

  const startEditingSlot = (doctorId: string, dayIndex: number, slotIndex: number) => {
    const slot = doctorSchedules[doctorId]?.[dayIndex]?.timeSlots[slotIndex];
    if (slot) {
      setTempTimeSlot({ ...slot });
      setEditingSchedule({ doctorId, dayIndex, slotIndex });
    }
  };

  const saveTimeSlot = () => {
    if (!editingSchedule) return;
    
    const { doctorId, dayIndex, slotIndex } = editingSchedule;
    setDoctorSchedules(prev => {
      const updated = { ...prev };
      if (!updated[doctorId]) return updated;
      
      updated[doctorId] = [...updated[doctorId]];
      updated[doctorId][dayIndex] = {
        ...updated[doctorId][dayIndex],
        timeSlots: updated[doctorId][dayIndex].timeSlots.map((slot, index) => 
          index === slotIndex ? { ...tempTimeSlot } : slot
        )
      };
      
      return updated;
    });
    
    setEditingSchedule(null);
  };

  const saveSchedule = (doctorId: string) => {
    const schedule = doctorSchedules[doctorId];
    const notes = doctorNotes[doctorId];
    if (schedule) {
      onDoctorScheduleChange(doctorId, schedule, notes);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Manage Doctor Schedules</h3>
        <p className="text-sm text-gray-600 mb-6">
          Add doctors from the Medix system and set their working schedules for this clinic.
        </p>
      </div>

      {/* Add Doctor Section */}
      <div className="bg-gray-50 rounded-lg p-6 border">
        <h4 className="text-md font-medium text-gray-900 mb-4">Add Doctor to Clinic</h4>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a doctor from Medix system...</option>
              {availableDoctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {getLocalizedString(doctor.fullName)} - {getLocalizedString(doctor.specialty)}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleDoctorSelect}
            disabled={!selectedDoctor}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            Add Doctor
          </button>
        </div>
        {availableDoctors.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">
            All available doctors have been added to this clinic.
          </p>
        )}
      </div>

      {/* Current Clinic Doctors */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">Current Clinic Doctors</h4>
        {clinicDoctors.length === 0 ? (
          <p className="text-gray-500 text-sm">No doctors assigned to this clinic yet.</p>
        ) : (
          <div className="space-y-4">
            {clinicDoctors.map((doctor) => {
              const association = doctor.clinicAssociations?.find(
                (assoc: ClinicAssociation) => assoc.clinicId.toString() === clinicId
              );
              
              return (
                <div key={doctor._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h5 className="font-medium text-gray-900">
                        {getLocalizedString(doctor.fullName)}
                      </h5>
                      <p className="text-sm text-gray-600">
                        {getLocalizedString(doctor.specialty)}
                      </p>
                      {doctor.email && (
                        <p className="text-xs text-gray-500">{doctor.email}</p>
                      )}
                    </div>
                    <button
                      onClick={() => onRemoveDoctor(doctor._id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  
                  {association && (
                    <div className="mt-4">
                      <h6 className="font-medium text-gray-800 mb-2">Working Schedule</h6>
                      {association.workingHours?.map((day: DaySchedule, dayIndex: number) => (
                        <div key={dayIndex} className="mb-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">
                              {day.dayOfWeek}
                            </span>
                            <span className="text-xs text-gray-500">
                              {day.isAvailable ? `${day.timeSlots?.length || 0} slots` : 'Not available'}
                            </span>
                          </div>
                          {day.isAvailable && day.timeSlots && (
                            <div className="ml-4 text-xs text-gray-600">
                              {day.timeSlots.map((slot: TimeSlot, slotIndex: number) => (
                                <span key={slotIndex} className="mr-2">
                                  {slot.startTime} - {slot.endTime}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      {association.notes && (
                        <div className="mt-2">
                          <span className="text-xs font-medium text-gray-700">Notes: </span>
                          <span className="text-xs text-gray-600">{association.notes}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Schedule Editor for Selected Doctor */}
      {selectedDoctor && doctorSchedules[selectedDoctor] && (
        <div className="bg-white border rounded-lg p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">
            Set Schedule for {getLocalizedString(
              allDoctors.find(d => d._id === selectedDoctor)?.fullName || ''
            )}
          </h4>
          
          <div className="space-y-4">
            {doctorSchedules[selectedDoctor].map((day: DaySchedule, dayIndex: number) => (
              <div key={dayIndex} className="border rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={day.isAvailable}
                      onChange={(e) => handleScheduleChange(selectedDoctor, dayIndex, 'isAvailable', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="font-medium">{day.dayOfWeek}</span>
                  </label>
                  {day.isAvailable && (
                    <button
                      onClick={() => addTimeSlot(selectedDoctor, dayIndex)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Time Slot
                    </button>
                  )}
                </div>
                
                {day.isAvailable && (
                  <div className="space-y-2">
                    {day.timeSlots.map((slot: TimeSlot, slotIndex: number) => (
                      <div key={slotIndex} className="flex items-center space-x-2">
                        <input
                          type="time"
                          value={slot.startTime}
                          onChange={(e) => {
                            const newSlots = [...day.timeSlots];
                            newSlots[slotIndex] = { ...newSlots[slotIndex], startTime: e.target.value };
                            handleScheduleChange(selectedDoctor, dayIndex, 'timeSlots', newSlots);
                          }}
                          className="px-2 py-1 border rounded text-sm"
                        />
                        <span>to</span>
                        <input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) => {
                            const newSlots = [...day.timeSlots];
                            newSlots[slotIndex] = { ...newSlots[slotIndex], endTime: e.target.value };
                            handleScheduleChange(selectedDoctor, dayIndex, 'timeSlots', newSlots);
                          }}
                          className="px-2 py-1 border rounded text-sm"
                        />
                        <button
                          onClick={() => removeTimeSlot(selectedDoctor, dayIndex, slotIndex)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (optional)
              </label>
              <textarea
                value={doctorNotes[selectedDoctor] || ''}
                onChange={(e) => setDoctorNotes(prev => ({ ...prev, [selectedDoctor]: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any additional notes about this doctor's schedule..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setSelectedDoctor('');
                  setDoctorSchedules(prev => {
                    const updated = { ...prev };
                    delete updated[selectedDoctor];
                    return updated;
                  });
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => saveSchedule(selectedDoctor)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}