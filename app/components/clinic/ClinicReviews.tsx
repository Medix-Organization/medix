'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Review } from '@/lib/types/review';
import { LocalizedString } from '@/lib/types/common';
import { FaStar, FaThumbsUp, FaFlag, FaUser } from 'react-icons/fa';

interface ClinicReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export default function ClinicReviews({ 
  reviews, 
  averageRating, 
  totalReviews 
}: ClinicReviewsProps) {
  const t = useTranslations('clinic');
  const locale = useLocale();
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating'>('newest');

  const displayedReviews = showAll ? reviews : reviews.slice(0, 5);

  // Helper function to get localized text
  const getLocalizedText = (localizedString: LocalizedString): string => {
    return localizedString.translations[locale as 'en' | 'ar'] || localizedString.translations.en;
  };

  const sortedReviews = [...displayedReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const reviewDate = new Date(date);
    const diffInMs = now.getTime() - reviewDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{t('noReviews')}</p>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          {t('writeFirstReview')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{t('reviews')}</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              {t('writeReview')}
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center my-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-gray-600">
                {totalReviews} {t('totalReviews')}
              </p>
            </div>
            
            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm w-8">{rating}</span>
                  <FaStar className="h-4 w-4 text-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ 
                        width: `${totalReviews > 0 ? (ratingDistribution[rating as keyof typeof ratingDistribution] / totalReviews) * 100 : 0}%` 
                      }}
                    />
                  </div>
                  <span className="text-sm w-8">
                    {ratingDistribution[rating as keyof typeof ratingDistribution]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex space-x-2">
        <button 
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            sortBy === 'newest' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setSortBy('newest')}
        >
          {t('newest')}
        </button>
        <button 
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            sortBy === 'oldest' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setSortBy('oldest')}
        >
          {t('oldest')}
        </button>
        <button 
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            sortBy === 'rating' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setSortBy('rating')}
        >
          {t('highestRated')}
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <FaUser className="text-gray-600" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">
                      {review.patientName || t('anonymousPatient')}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatTimeAgo(review.date)}
                      </span>
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {t('verified')}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button className="text-gray-400 hover:text-gray-600">
                    <FaFlag className="h-4 w-4" />
                  </button>
                </div>
                
                <p className="mt-3 text-gray-700">{getLocalizedText(review.comment)}</p>
                
                {/* Display tags if available */}
                {review.tags && review.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {review.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center space-x-4 mt-4">
                  <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                    <FaThumbsUp className="h-4 w-4 mr-1" />
                    {t('helpful')} ({review.helpful})
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reviews.length > 5 && (
        <div className="text-center">
          <button 
            className="text-center">
            {showAll ? t('showLess') : t('showAllReviews')} 
            ({reviews.length - 5} {t('more')})
          </button>
        </div>
      )}
    </div>
  );
}