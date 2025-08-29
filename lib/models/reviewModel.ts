import { Schema, models, model } from 'mongoose';
import { ReviewSummary } from '../types/review';

// Review Summary Schema
export const reviewSummarySchema = new Schema<ReviewSummary>({
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },
  ratingDistribution: {
    fiveStars: { type: Number, default: 0 },
    fourStars: { type: Number, default: 0 },
    threeStars: { type: Number, default: 0 },
    twoStars: { type: Number, default: 0 },
    oneStar: { type: Number, default: 0 }
  }
}, { _id: false });

// Individual Review Schema (for future use)
const individualReviewSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, maxlength: 1000 },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add indexes for better performance
individualReviewSchema.index({ doctorId: 1, createdAt: -1 });
individualReviewSchema.index({ patientId: 1 });
individualReviewSchema.index({ rating: 1 });

const Review = models.Review || model('Review', individualReviewSchema);

export default Review;