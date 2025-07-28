import { Schema, models, model } from 'mongoose';
import type { Doctor } from '../types/doctor'

const DoctorSchema = new Schema<Doctor>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  specialty: { type: String, required: true },
  subspecialty: { type: [String], default: [] },
  clinicId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  languages: { type: String },
  experience: { type: Number },
  gender: { type: String },
  phoneNumber: { type: String },
  workingHours: { type: String },
  coveredInsurance: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  location: { type: String },
});

const Doctor = models.Doctor || model<Doctor>('Doctor', DoctorSchema);

export default Doctor;