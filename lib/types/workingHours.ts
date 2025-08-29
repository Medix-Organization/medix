import { Types } from 'mongoose';

export interface TimeSlot {
  startTime: string; // Format: "HH:MM" (24-hour format)
  endTime: string;   // Format: "HH:MM" (24-hour format)
}

export interface DaySchedule {
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  timeSlots: TimeSlot[];
  isAvailable: boolean; // Allows doctors to mark days as unavailable
}

export interface ClinicAssociation {
  clinicId: Types.ObjectId; // Changed from string to Types.ObjectId
  workingHours: DaySchedule[];
  isActive: boolean; // Allows doctors to temporarily disable clinic association
  joinedDate?: Date;
  notes?: string; // Optional notes about this clinic association
}