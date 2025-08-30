import { Schema, models, model } from 'mongoose';
import type { ClinicType } from '../types/clinic';
import { localizedStringSchema } from '../schemas/localizedString';
import { locationSchema } from './locationModel';

const ClinicSchema: Schema = new Schema<ClinicType>({
  name: { type: localizedStringSchema, required: true },
  address: { type: localizedStringSchema, required: true },
  pin: { type: String, required: true },
  
  // Location information
  location: { type: locationSchema, required: true },
  
  // Contact information
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  description: { type: localizedStringSchema },
  
  // Clinic metadata
  isActive: { type: Boolean, default: true },
  verificationStatus: { 
    type: String, 
    enum: ['pending', 'verified', 'rejected'], 
    default: 'pending' 
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field to populate doctors associated with this clinic
ClinicSchema.virtual('doctors', {
  ref: 'Doctor',
  localField: '_id',
  foreignField: 'clinicAssociations.clinicId',
  justOne: false
});

// Index for better query performance
ClinicSchema.index({ 'location.coordinates': '2dsphere' });
ClinicSchema.index({ name: 'text', 'address.translations': 'text' });

export const Clinic = models?.Clinic || model<ClinicType>('Clinic', ClinicSchema);
export default Clinic;