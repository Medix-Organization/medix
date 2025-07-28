import { Document } from 'mongoose';

export interface Patient extends Document {
  fullName: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  location: string | null;
}