import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IDoctor extends Document {
  fullName: string;
  email: string;
  passwordHash: string;
  specialty: string;
  subspecialty: string[];
  clinicInfo: {
    address: string;
    pin: string;
  };
  languages: string;
  experience: number;
  Gender: string;
  phoneNumber: number;
  workingHours: string;
  coveredInsurance: string[];
  createdAt: Date;
  location: string;
}

const DoctorSchema = new Schema<IDoctor>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  specialty: { type: String, required: true },
  subspecialty: { type: [String], default: [] },
  clinicInfo: {
    address: { type: String, required: true },
    pin: { type: String, required: true }
  },
  languages: { type: String },
  experience: { type: Number },
  Gender: { type: String },
  phoneNumber: { type: Number },
  workingHours: { type: String },
  coveredInsurance: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  location: { type: String },
});

const Doctor = models.Doctor || model<IDoctor>('Doctor', DoctorSchema);

export default Doctor;