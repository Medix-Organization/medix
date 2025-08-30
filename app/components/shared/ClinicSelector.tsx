'use client';
import { useState, useEffect } from 'react';
import { searchClinics } from '@/lib/actions/clinicActions';
import type { ClinicType } from '@/lib/types/clinic';
import type { ClinicAssociation, DaySchedule, TimeSlot } from '@/lib/types/workingHours';
import type { LocalizedString } from '@/lib/types/common';
import BilingualInput from './BilingualInput';
import LocationInput, { PlaceData } from './LocationInput';

interface ClinicSelectorProps {
  selectedClinics: ClinicAssociation[];
  onChange: (clinics: ClinicAssociation[]) => void;
  error?: string;
  allowCreate?: boolean; // New prop
}

// Removed the local PlaceData definition; using the exported one from LocationInput
export default function ClinicSelector({ selectedClinics, onChange, error, allowCreate = true }: ClinicSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ClinicType[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [newClinicData, setNewClinicData] = useState({
    name: { translations: { en: '', ar: '' } } as LocalizedString,
    address: { translations: { en: '', ar: '' } } as LocalizedString,
    pin: '',
    location: null as PlaceData | null,
    contactEmail: '',
    contactPhone: '',
    description: { translations: { en: '', ar: '' } } as LocalizedString
  });

  // Resolve name/address safely for both legacy and Places-shaped ClinicType
  const getClinicName = (clinic: ClinicType): string => {
    if (clinic.displayName?.text) return clinic.displayName.text;
    if (typeof clinic.name === 'string' && clinic.name) return clinic.name;
    const legacy = (clinic as any)?.name?.translations;
    return legacy?.en || legacy?.ar || '';
  };

  const getClinicAddress = (clinic: ClinicType): string => {
    if (clinic.formattedAddress) return clinic.formattedAddress;
    const legacy = (clinic as any)?.address?.translations;
    return legacy?.en || legacy?.ar || '';
  };

  // Days of the week for working hours UI
  const DAYS: DaySchedule['dayOfWeek'][] = [
    'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'
  ];

  // Utilities to update a single association immutably
  const updateAssociationAt = (idx: number, updater: (a: ClinicAssociation) => ClinicAssociation) => {
    const updated = selectedClinics.map((a, i) => (i === idx ? updater(a) : a));
    onChange(updated);
  };

  const toggleDayAvailability = (index: number, day: DaySchedule['dayOfWeek'], available: boolean) => {
    updateAssociationAt(index, (assoc) => {
      const wh = Array.isArray(assoc.workingHours) ? [...assoc.workingHours] : [];
      const di = wh.findIndex((d) => d.dayOfWeek === day);
      if (di >= 0) {
        wh[di] = { ...wh[di], isAvailable: available };
      } else {
        wh.push({ dayOfWeek: day, timeSlots: [], isAvailable: available });
      }
      return { ...assoc, workingHours: wh };
    });
  };

  const addTimeSlot = (index: number, day: DaySchedule['dayOfWeek']) => {
    updateAssociationAt(index, (assoc) => {
      const wh = Array.isArray(assoc.workingHours) ? [...assoc.workingHours] : [];
      const di = wh.findIndex((d) => d.dayOfWeek === day);
      if (di >= 0) {
        const ds = wh[di];
        const slots: TimeSlot[] = [...ds.timeSlots, { startTime: '09:00', endTime: '17:00' }];
        wh[di] = { ...ds, timeSlots: slots, isAvailable: true };
      } else {
        wh.push({
          dayOfWeek: day,
          timeSlots: [{ startTime: '09:00', endTime: '17:00' }],
          isAvailable: true
        });
      }
      return { ...assoc, workingHours: wh };
    });
  };

  const updateTimeSlot = (
    index: number,
    day: DaySchedule['dayOfWeek'],
    slotIndex: number,
    field: 'startTime' | 'endTime',
    value: string
  ) => {
    updateAssociationAt(index, (assoc) => {
      const wh = Array.isArray(assoc.workingHours) ? [...assoc.workingHours] : [];
      const di = wh.findIndex((d) => d.dayOfWeek === day);
      if (di >= 0) {
        const ds = wh[di];
        const slots = ds.timeSlots.map((s, i) => (i === slotIndex ? { ...s, [field]: value } : s));
        wh[di] = { ...ds, timeSlots: slots };
      }
      return { ...assoc, workingHours: wh };
    });
  };

  const removeTimeSlot = (index: number, day: DaySchedule['dayOfWeek'], slotIndex: number) => {
    updateAssociationAt(index, (assoc) => {
      const wh = Array.isArray(assoc.workingHours) ? [...assoc.workingHours] : [];
      const di = wh.findIndex((d) => d.dayOfWeek === day);
      if (di >= 0) {
        const ds = wh[di];
        const slots = ds.timeSlots.filter((_, i) => i !== slotIndex);
        wh[di] = { ...ds, timeSlots: slots };
      }
      return { ...assoc, workingHours: wh };
    });
  };

  // Search clinics when query changes
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        try {
          const results = await searchClinics(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error('Error searching clinics:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  const handleSelectClinic = (clinic: ClinicType) => {
    const newAssociation: ClinicAssociation = {
      clinicId: clinic._id as any,
      workingHours: [],
      isActive: true,
      joinedDate: new Date()
    };
    
    onChange([...selectedClinics, newAssociation]);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleRemoveClinic = (index: number) => {
    const updated = selectedClinics.filter((_, i) => i !== index);
    onChange(updated);
  };

 
 
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search & Select Clinics *
        </label>
        
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Search for existing clinics..."
          />
          {isSearching && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-2 border border-gray-200 rounded-md max-h-60 overflow-y-auto">
            {searchResults.map((clinic) => (
              <button
                key={clinic._id}
                type="button"
                onClick={() => handleSelectClinic(clinic)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                <div className="font-medium">{getClinicName(clinic) || 'Unnamed clinic'}</div>
                <div className="text-sm text-gray-600">{getClinicAddress(clinic)}</div>
              </button>
            ))}
          </div>
        )}

        {/* Create New Clinic Button */}
        {allowCreate && (
          <button
            type="button"
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
          >
            {showCreateForm ? 'Cancel' : "Can't find your clinic? Create a new one"}
          </button>
        )}

        {/* Create New Clinic Form */}
        {allowCreate && showCreateForm && (
          <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
            <h4 className="text-md font-medium text-gray-900 mb-4">Create New Clinic</h4>
            
            <div className="space-y-4">
              <BilingualInput
                label="Clinic Name"
                name="clinicName"
                value={newClinicData.name}
                onChange={(value) => setNewClinicData({ ...newClinicData, name: value })}
                required
                placeholder={{ en: 'Medical Center Name', ar: 'اسم المركز الطبي' }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email *</label>
                  <input
                    type="email"
                    value={newClinicData.contactEmail}
                    onChange={(e) => setNewClinicData({ ...newClinicData, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="info@clinic.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone *</label>
                  <input
                    type="tel"
                    value={newClinicData.contactPhone}
                    onChange={(e) => setNewClinicData({ ...newClinicData, contactPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+966 11 123 4567"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PIN/License Number *</label>
                <input
                  type="text"
                  value={newClinicData.pin}
                  onChange={(e) => setNewClinicData({ ...newClinicData, pin: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Clinic registration number"
                  required
                />
              </div>

              <LocationInput
                label="Clinic Location"
                placeholder="Search for clinic location..."
                value={newClinicData.location}
                onChange={(place) => setNewClinicData({ ...newClinicData, location: place })}
                required
              />

              <BilingualInput
                label="Address Details"
                name="address"
                value={newClinicData.address}
                onChange={(value) => setNewClinicData({ ...newClinicData, address: value })}
                placeholder={{ en: 'Building, Street, District', ar: 'المبنى، الشارع، الحي' }}
              />

              <div className="flex gap-2">
                
               
              </div>
            </div>
          </div>
        )}

        {/* Selected Clinics */}
        {selectedClinics.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Clinics:</h4>
            <div className="space-y-4">
              {selectedClinics.map((association, index) => (
                <div key={index} className="bg-blue-50 px-3 py-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Clinic Association {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveClinic(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Working hours editor */}
                  <div className="mt-3 bg-white rounded-md p-3 border border-gray-200">
                    {DAYS.map((day) => {
                      const ds = association.workingHours?.find((d) => d.dayOfWeek === day);
                      const available = ds?.isAvailable ?? false;
                      const slots = ds?.timeSlots ?? [];
                      return (
                        <div key={day} className="mb-3">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={available}
                              onChange={(e) => toggleDayAvailability(index, day, e.target.checked)}
                            />
                            <span className="font-medium">{day}</span>
                          </label>

                          {available && (
                            <div className="ml-6 mt-2 space-y-2">
                              {slots.map((slot, sIdx) => (
                                <div key={sIdx} className="flex items-center gap-2">
                                  <input
                                    type="time"
                                    value={slot.startTime}
                                    onChange={(e) => updateTimeSlot(index, day, sIdx, 'startTime', e.target.value)}
                                    className="border rounded px-2 py-1"
                                  />
                                  <span>-</span>
                                  <input
                                    type="time"
                                    value={slot.endTime}
                                    onChange={(e) => updateTimeSlot(index, day, sIdx, 'endTime', e.target.value)}
                                    className="border rounded px-2 py-1"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeTimeSlot(index, day, sIdx)}
                                    className="text-red-600 text-sm"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => addTimeSlot(index, day)}
                                className="text-blue-600 text-sm"
                              >
                                + Add time slot
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      </div>
    );
}