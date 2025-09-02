'use client';
import { useState } from 'react';
import { LocalizedString } from '@/lib/types/common';

interface BilingualInputProps {
  label: string;
  name: string;
  value: LocalizedString;
  onChange: (value: LocalizedString) => void;
  required?: boolean;
  type?: 'input' | 'textarea';
  placeholder?: {
    en: string;
    ar: string;
  };
  error?: string;
}

export default function BilingualInput({
  label,
  name,
  value,
  onChange,
  required = false,
  type = 'input',
  placeholder,
  error
}: BilingualInputProps) {
  const [activeTab, setActiveTab] = useState<'en' | 'ar'>('en');

  const handleChange = (lang: 'en' | 'ar', newValue: string) => {
    onChange({
      translations: {
        ...value.translations,
        [lang]: newValue
      }
    });
  };

  const InputComponent = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {/* Language Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab('en')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'en'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          English
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ar')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'ar'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          العربية
        </button>
      </div>

      {/* Input Fields */}
      <div className="space-y-3">
        <div className={activeTab === 'en' ? 'block' : 'hidden'}>
          <InputComponent
            name={`${name}_en`}
            value={value.translations.en || ''}
            onChange={(e) => handleChange('en', e.target.value)}
            placeholder={placeholder?.en}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            {...(type === 'textarea' && { rows: 4 })}
          />
        </div>
        
        <div className={activeTab === 'ar' ? 'block' : 'hidden'}>
          <InputComponent
            name={`${name}_ar`}
            value={value.translations.ar || ''}
            onChange={(e) => handleChange('ar', e.target.value)}
            placeholder={placeholder?.ar}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            dir="rtl"
            {...(type === 'textarea' && { rows: 4 })}
          />
        </div>
      </div>
      
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}