import { Schema, models, model } from 'mongoose';
import type { Patient } from '../types/patient';

const PatientSchema: Schema = new Schema<Patient>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  location: {type: String, required: false},
});


const Patient = models.Patient || model<Patient>('Patient', PatientSchema);

export default Patient;