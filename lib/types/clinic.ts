import { Document } from 'mongoose';

export interface Clinic extends Document {
  name: string;
  createdAt: Date;
  address: string | null;
  pin: string | null;
}