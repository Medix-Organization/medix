import { Document, Types } from 'mongoose';

export interface Doctor extends Document {
  fullName: string;
  email: string;
  passwordHash: string;
  specialty: string | null;
  subspecialty: string[] | null;
  clinicId: Types.ObjectId | null;
  languages: string | null;
  experience: number | null;
  gender: string | null;
  phoneNumber: string | null;
  workingHours: string | null;
  coveredInsurance: string[] | null ;
  location: string | null;
  createdAt: Date;
}