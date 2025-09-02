'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { searchClinics, createClinic } from '@/lib/actions/clinicActions';
import { getClinicWithDoctors } from '@/lib/actions/getClinicById';
import BilingualInput from './BilingualInput';
// The import is already correct at line 7
import LocationInput, { PlaceData } from './LocationInput';
import { ClinicType } from '@/lib/types/clinic';
import { ClinicAssociation, DaySchedule, TimeSlot } from '@/lib/types/workingHours';
import { LocalizedString } from '@/lib/types/common';
import { Types } from 'mongoose';

interface ClinicSelectorProps {
  selectedClinics: ClinicAssociation[];
  onChange: (clinics: ClinicAssociation[]) => void;
  error?: string;
  allowCreate?: boolean;
}

export default function ClinicSelector({ selectedClinics, onChange, error, allowCreate = true }: ClinicSelectorProps) {
  const t = useTranslations('onboarding.clinicSelector');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ClinicType[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedClinicDetails, setSelectedClinicDetails] = useState<ClinicType[]>([]);
  const [expandedClinic, setExpandedClinic] = useState<number | null>(null);
  const [workingHoursExpanded, setWorkingHoursExpanded] = useState<boolean[]>([]);
  // The newClinicData state definition is already correct at line 28
  const [newClinicData, setNewClinicData] = useState({
    name: { translations: { en: '', ar: '' } } as LocalizedString,
    address: { translations: { en: '', ar: '' } } as LocalizedString,
    pin: '',
    location: null as PlaceData | null,  // This is correct
    contactEmail: '',
    contactPhone: '',
    description: { translations: { en: '', ar: '' } } as LocalizedString,
    addressDetails: ''
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

  // Handle location selection
  // Fix the handleLocationSelect function
  const handleLocationSelect = (place: PlaceData | null) => {
    setNewClinicData(prev => ({
      ...prev,
      location: place
    }));
  };
  
  // Fix the LocationInput usage (around line 315)
  <LocationInput
    label={t('location')}
    placeholder={t('enterLocationPlaceholder')}
    value={newClinicData.location}
    onChange={handleLocationSelect}
    required
  />
  
  // Fix the handleCreateClinic function to use correct PlaceData properties
  const handleCreateClinic = async () => {
    try {
      if (!newClinicData.name.translations.en || !newClinicData.contactEmail || !newClinicData.contactPhone) {
        alert('Please fill in all required fields');
        return;
      }
  
      const clinicData = {
        name: newClinicData.name.translations.en, // Convert LocalizedString to string
        contact: {
          email: newClinicData.contactEmail,
          phone: newClinicData.contactPhone
        },
        description: {
          translations: {
            en: newClinicData.description.translations.en,
            ar: newClinicData.description.translations.ar
          }
        },
        address: {
          translations: {
            en: newClinicData.address.translations.en,
            ar: newClinicData.address.translations.ar
          }
        },
        location: newClinicData.location ? {
          googleMapLink: newClinicData.location.url || '',
          address: {
            street: newClinicData.location.formatted_address || '',
            city: '',
            state: '',
            country: 'SA',
            zipCode: ''
          },
          coordinates: {
            latitude: newClinicData.location.geometry?.location.lat || 0,
            longitude: newClinicData.location.geometry?.location.lng || 0
          }
        } : undefined,
        googlePlaceId: newClinicData.location?.place_id
      };
  
      const newClinic = await createClinic(clinicData);
      handleSelectClinic(newClinic);
      
      // Reset form
      setNewClinicData({
        name: { translations: { en: '', ar: '' } } as LocalizedString,
        address: { translations: { en: '', ar: '' } } as LocalizedString,
        pin: '',
        location: null,
        contactEmail: '',
        contactPhone: '',
        description: { translations: { en: '', ar: '' } } as LocalizedString,
        addressDetails: ''
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating clinic:', error);
      alert('Error creating clinic. Please try again.');
    }
  };

  // Toggle working hours editor
  const toggleWorkingHoursEditor = (index: number) => {
    setWorkingHoursExpanded(prev => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  // Utilities to update a single association immutably
  const updateAssociationAt = (idx: number, updater: (a: ClinicAssociation) => ClinicAssociation) => {
    const updated = selectedClinics.map((a, i) => (i === idx ? updater(a) : a));
    onChange(updated);
  };

  const toggleDayAvailability = (index: number, day: DaySchedule['dayOfWeek']) => {
    updateAssociationAt(index, (assoc) => {
      const wh = Array.isArray(assoc.workingHours) ? [...assoc.workingHours] : [];
      const di = wh.findIndex((d) => d.dayOfWeek === day);
      if (di >= 0) {
        wh[di] = { ...wh[di], isAvailable: !wh[di].isAvailable };
      } else {
        wh.push({ dayOfWeek: day, timeSlots: [], isAvailable: true });
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

  // Fetch clinic details for selected clinics - FIXED
  useEffect(() => {
    const fetchClinicDetails = async () => {
      const details: ClinicType[] = [];
      for (const association of selectedClinics) {
        try {
          // First try to find in search results
          let clinic = searchResults.find(c => c._id.toString() === association.clinicId.toString());
          
          // If not found in search results, fetch from database
          if (!clinic) {
            const fetchedClinic = await getClinicWithDoctors(association.clinicId.toString());
            clinic = fetchedClinic || undefined;
          }
          
          // Only use fallback if we absolutely can't find the clinic
          if (!clinic) {
            clinic = {
              _id: association.clinicId.toString(),
              name: 'Unknown Clinic',
              displayName: { text: 'Unknown Clinic' }
            } as ClinicType;
          }
          
          details.push(clinic);
        } catch (error) {
          console.error('Error fetching clinic details:', error);
          // Add fallback clinic on error
          details.push({
            _id: association.clinicId.toString(),
            name: 'Error Loading Clinic',
            displayName: { text: 'Error Loading Clinic' }
          } as ClinicType);
        }
      }
      setSelectedClinicDetails(details);
    };

    if (selectedClinics.length > 0) {
      fetchClinicDetails();
    } else {
      setSelectedClinicDetails([]);
    }
  }, [selectedClinics, searchResults]);

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
    setSelectedClinicDetails(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('searchLabel')}
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
            placeholder={t('searchPlaceholder')}
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
                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="font-medium text-base lg:text-lg">{getClinicName(clinic) || t('unnamedClinic')}</div>
                <div className="text-sm lg:text-base text-gray-600 truncate mt-1">{getClinicAddress(clinic)}</div>
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
            {showCreateForm ? t('cancel') : t('createNew')}
          </button>
        )}

        {/* Create New Clinic Form */}
        {allowCreate && showCreateForm && (
          <div className="border border-gray-200 rounded-md p-4 bg-gray-50 mt-2">
            <h4 className="text-md font-medium text-gray-900 mb-4">{t('createNewTitle')}</h4>
            
            <div className="space-y-4">
              <BilingualInput
                label={t('clinicName')}
                name="clinicName"
                value={newClinicData.name}
                onChange={(value) => setNewClinicData({ ...newClinicData, name: value })}
                required
                placeholder={{ 
                  en: t('clinicNamePlaceholder'), 
                  ar: 'اسم المركز الطبي' 
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contactEmail')} *
                  </label>
                  <input
                    type="email"
                    value={newClinicData.contactEmail}
                    onChange={(e) => setNewClinicData({ ...newClinicData, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('contactEmailPlaceholder')}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contactPhone')} *
                  </label>
                  <input
                    type="tel"
                    value={newClinicData.contactPhone}
                    onChange={(e) => setNewClinicData({ ...newClinicData, contactPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('contactPhonePlaceholder')}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('location')} *
                </label>
                <LocationInput
                  label={t('location')}
                  onChange={handleLocationSelect}
                  placeholder={t('location')}
                  value={newClinicData.location}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('address')}
                </label>
                <input
                  type="text"
                  value={newClinicData.addressDetails}
                  onChange={(e) => setNewClinicData({ ...newClinicData, addressDetails: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('addressPlaceholder')}
                />
              </div>

              <button
                type="button"
                onClick={handleCreateClinic}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {t('createButton')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Selected Clinics */}
      {selectedClinics.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-900">{t('selectedClinics')}</h4>
          {selectedClinics.map((association, index) => {
            const clinicDetail = selectedClinicDetails[index];
            const clinicName = clinicDetail ? getClinicName(clinicDetail) : `${t('unnamedClinic')} ${index + 1}`;
            
            return (
              <div key={index} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-900 truncate">{clinicName}</h5>
                    {clinicDetail && (
                      <p className="text-sm text-gray-600 truncate">{getClinicAddress(clinicDetail)}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveClinic(index)}
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 font-medium rounded-md border border-red-200 transition-colors whitespace-nowrap"
                  >
                    {t('removeClinic')}
                  </button>
                </div>

                {/* Working Hours Editor */}
                <div className="space-y-3">
                  <div 
                    className="flex items-center justify-between cursor-pointer p-2 bg-white rounded border hover:bg-gray-50"
                    onClick={() => toggleWorkingHoursEditor(index)}
                  >
                    <span className="font-medium text-gray-700">{t('workingHours')}</span>
                    <span className="text-xs text-gray-500">{t('toggleHours')}</span>
                  </div>
                  
                  {workingHoursExpanded[index] && (
                    <div className="bg-white p-4 rounded border space-y-4">
                      {DAYS.map((day) => {
                        const daySchedule = association.workingHours?.find(wh => wh.dayOfWeek === day);
                        const isEnabled = daySchedule?.isAvailable || false;
                        
                        return (
                          <div key={day} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={isEnabled}
                                  onChange={() => toggleDayAvailability(index, day)}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                  {t(`days.${day.toLowerCase()}`)}
                                </span>
                              </label>
                              {isEnabled && (
                                <button
                                  type="button"
                                  onClick={() => addTimeSlot(index, day)}
                                  className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 font-medium rounded-md border border-blue-200 transition-colors"
                                >
                                  {t('addTimeSlot')}
                                </button>
                              )}
                            </div>
                            
                            {isEnabled && daySchedule?.timeSlots && (
                              <div className="ml-2 sm:ml-6 space-y-3">
                                {daySchedule.timeSlots.map((slot, sIdx) => (
                                  <div key={sIdx} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 flex-1">
                                      <div className="flex items-center space-x-2">
                                        <label className="text-sm font-medium text-gray-600 min-w-0">{t('startTime')}:</label>
                                        <input
                                          type="time"
                                          value={slot.startTime}
                                          onChange={(e) => updateTimeSlot(index, day, sIdx, 'startTime', e.target.value)}
                                          className="w-32 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <label className="text-sm font-medium text-gray-600 min-w-0">{t('endTime')}:</label>
                                        <input
                                          type="time"
                                          value={slot.endTime}
                                          onChange={(e) => updateTimeSlot(index, day, sIdx, 'endTime', e.target.value)}
                                          className="w-32 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeTimeSlot(index, day, sIdx)}
                                      className="w-full sm:w-auto px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 font-medium rounded-md border border-red-200 transition-colors"
                                    >
                                      {t('removeTimeSlot')}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}