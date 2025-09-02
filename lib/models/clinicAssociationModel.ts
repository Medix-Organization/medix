import { Schema } from 'mongoose';
import { ClinicAssociation, DaySchedule } from '../types/workingHours';
import { dayScheduleSchema } from './dayScheduleModel';

// Clinic Association Schema
export const clinicAssociationSchema = new Schema<ClinicAssociation>({
  clinicId: {
    type: Schema.Types.ObjectId,
    ref: 'Clinic',
    required: true
  },
  workingHours: {
    type: [dayScheduleSchema],
    default: [],
    validate: {
      validator: function(schedules: DaySchedule[]) {
        // Ensure no duplicate days
        const days = schedules.map(s => s.dayOfWeek);
        return days.length === new Set(days).size;
      },
      message: 'Cannot have duplicate days in working hours'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    maxlength: 500
  }
}, { _id: false });