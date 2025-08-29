import { Schema } from 'mongoose';
import { DaySchedule, TimeSlot } from '../types/workingHours';
import { timeSlotSchema } from './timeSlotModel';

// Day Schedule Schema
export const dayScheduleSchema = new Schema<DaySchedule>({
  dayOfWeek: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  timeSlots: {
    type: [timeSlotSchema],
    default: [],
    validate: {
      validator: function(slots: TimeSlot[]) {
        // Validate that time slots don't overlap
        for (let i = 0; i < slots.length; i++) {
          for (let j = i + 1; j < slots.length; j++) {
            const slot1Start = new Date(`1970-01-01T${slots[i].startTime}:00`);
            const slot1End = new Date(`1970-01-01T${slots[i].endTime}:00`);
            const slot2Start = new Date(`1970-01-01T${slots[j].startTime}:00`);
            const slot2End = new Date(`1970-01-01T${slots[j].endTime}:00`);
            
            // Check for overlap
            if ((slot1Start < slot2End && slot1End > slot2Start)) {
              return false;
            }
          }
        }
        return true;
      },
      message: 'Time slots cannot overlap'
    }
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { _id: false });