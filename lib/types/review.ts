import { Document, Types } from 'mongoose';
import { LocalizedString } from './common';

export interface Review {
  id: string;
  patientName: string;
  rating: number; // 1-5 stars
  comment: LocalizedString;
  date: Date;
  verified: boolean;
  helpful: number; // number of people who found this helpful
  tags: string[]; // e.g., ["Listens Well", "Professional", "On Time"]
}

export interface ReviewSummary {
  overallRating: number;
  averageRating : number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  snippets: Review[]; // 2-3 featured reviews
  commonTags: string[]; // most common positive tags
}