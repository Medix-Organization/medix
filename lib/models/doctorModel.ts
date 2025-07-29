import { Schema, models, model } from 'mongoose';
import type { Doctor } from '../types/doctor'
import { localizedStringSchema } from '../schemas/localizedString';

const DoctorSchema = new Schema<Doctor>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialty: { type: localizedStringSchema, required: true },
  subspecialty: { type: [localizedStringSchema], default: [] },
  clinicId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  languages: { type: String },
  experience: { type: Number },
  gender: { type: localizedStringSchema },
  phoneNumber: { type: String },
  workingHours: { type: String },
  coveredInsurance: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  location: { type: String },
  pageVisits: { type: Number, default: 0 }
});

const Doctor = models.Doctor || model<Doctor>('Doctor', DoctorSchema);

export default Doctor;