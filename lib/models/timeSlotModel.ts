import { Schema } from 'mongoose';
import { TimeSlot } from '../types/workingHours';

// Time Slot Schema
export const timeSlotSchema = new Schema<TimeSlot>({
  startTime: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: 'Start time must be in HH:MM format (24-hour)'
    }
  },
  endTime: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: 'End time must be in HH:MM format (24-hour)'
    }
  }
}, { _id: false });

// Add custom validation to ensure endTime is after startTime
timeSlotSchema.pre('validate', function() {
  if (this.startTime && this.endTime) {
    const start = new Date(`1970-01-01T${this.startTime}:00`);
    const end = new Date(`1970-01-01T${this.endTime}:00`);
    
    if (end <= start) {
      throw new Error('End time must be after start time');
    }
  }
});