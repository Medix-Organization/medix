import { Document } from 'mongoose';

export interface Patient extends Document {
  fullName: string;
  email: string;
  password: string;
  createdAt: Date;
  location: string | null;
}