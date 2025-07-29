import { Document, Types } from 'mongoose';
import { LocalizedString } from './common'

export interface Doctor extends Document {
  fullName: string;
  email: string;
  password: string;
  specialty: LocalizedString | null;
  subspecialty: LocalizedString[] | null;
  clinicId: Types.ObjectId | null;
  languages: string | null;
  experience: number | null;
  gender: LocalizedString | null;
  phoneNumber: string | null;
  workingHours: string | null;
  coveredInsurance: LocalizedString[] | null ;
  location: string | null;
  createdAt: Date;
  pageVisits: number;
}