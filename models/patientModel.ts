import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IPatient extends Document {
  fullName: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  location: string;
}

const PatientSchema: Schema = new Schema<IPatient>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  location: {type: String, required: false},
});

// This is important to avoid model recompilation errors in Next.js hot reload
const Patient = models.Patient || model<IPatient>('Patient', PatientSchema);

export default Patient;