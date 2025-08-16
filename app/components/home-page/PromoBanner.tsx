import React from 'react';

const PromoBanner = () => {
  return (
    <div className="mx-4 my-6 bg-gradient-to-r from-orange-100 to-red-50 rounded-2xl p-4 border border-orange-200">
      <div className="flex items-center justify-center gap-3">
        <div className="text-2xl">🎁</div>
        <div className="flex-1">
          <div className="text-lg font-bold text-gray-900">
            20% OFF First Consultation
          </div>
          <div className="text-sm text-gray-600">
            Use Code: DERMA20
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;