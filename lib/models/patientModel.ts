import { Schema, models, model } from 'mongoose';
import type { Patient } from '../types/patient';
import { localizedStringSchema } from '../schemas/localizedString';

const PatientSchema: Schema = new Schema<Patient>({
  fullName: { type: localizedStringSchema, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  location: { type: localizedStringSchema, required: false }, 
}, { timestamps: true });

const Patient = models.Patient || model<Patient>('Patient', PatientSchema);

export default Patient;