'use client';

import { useState, useEffect } from 'react';
import { ClinicType } from '@/lib/types/clinic';
import { useTranslations } from 'next-intl';
import { FiClock, FiDollarSign, FiUser, FiInfo } from 'react-icons/fi';

interface OperationType {
  _id: string;
  category: string;
  subspecialty: string;
  responsibleRole: string;
  consultationRequired: boolean;
  approximateDuration: number;
  information?: string;
  price?: number;
}

interface ClinicOperationsProps {
  clinic: ClinicType;
  locale: string;
}

export default function ClinicOperations({ clinic, locale }: ClinicOperationsProps) {
  const t = useTranslations('clinic.operations');
  const [operations, setOperations] = useState<OperationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // Fetch operations for this clinic
    const fetchOperations = async () => {
      try {
        // This would be an API call to get operations
        // For now, using mock data
        const mockOperations: OperationType[] = [
          {
            _id: '1',
            category: 'Dermatology',
            subspecialty: 'Acne Consultation',
            responsibleRole: 'Dr. Smith',
            consultationRequired: true,
            approximateDuration: 30,
            information: 'Comprehensive acne assessment and treatment planning',
            price: 150
          },
          {
            _id: '2',
            category: 'Laser Treatments',
            subspecialty: 'Laser Hair Removal',
            responsibleRole: 'Clinic Staff',
            consultationRequired: false,
            approximateDuration: 45,
            information: 'Professional laser hair removal service',
            price: 200
          }
        ];
        setOperations(mockOperations);
      } catch (error) {
        console.error('Error fetching operations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOperations();
  }, [clinic._id]);

  const categories = ['all', ...new Set(operations.map(op => op.category))];
  const filteredOperations = selectedCategory === 'all' 
    ? operations 
    : operations.filter(op => op.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {t('title')}
        </h2>
        
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? t('allCategories') : category}
            </option>
          ))}
        </select>
      </div>

      {filteredOperations.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t('noOperations')}
          </h3>
          <p className="text-gray-600">
            {t('noOperationsDescription')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOperations.map((operation) => (
            <div key={operation._id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-2">
                    {operation.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {operation.subspecialty}
                  </h3>
                </div>
                {operation.price && (
                  <div className="text-right">
                    <div className="flex items-center text-green-600 font-semibold">
                      <FiDollarSign className="w-4 h-4" />
                      <span>{operation.price} SAR</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <FiClock className="w-4 h-4" />
                  <span>{operation.approximateDuration} {t('minutes')}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <FiUser className="w-4 h-4" />
                  <span>{operation.responsibleRole}</span>
                </div>

                {operation.consultationRequired && (
                  <div className="flex items-center space-x-2 text-amber-600">
                    <FiInfo className="w-4 h-4" />
                    <span className="text-sm">{t('consultationRequired')}</span>
                  </div>
                )}

                {operation.information && (
                  <p className="text-gray-600 text-sm mt-3">
                    {operation.information}
                  </p>
                )}
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                {t('bookService')}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}