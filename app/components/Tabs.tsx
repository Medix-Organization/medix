"use client";
import { useState } from "react";

export default function Tabs() {
  const tabs = ["Description", "Gallery", "Google Reviews", "Medix Reviews"];
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tab Buttons */}
      <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 md:px-6 py-3 text-xs md:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 md:p-6">
        {activeTab === "Description" && (
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Description</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              This is the description section. Add your doctor's or clinic's
              detailed info here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        )}

        {activeTab === "Gallery" && (
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {/* Example images */}
              <div className="w-full h-32 sm:h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">Sample Image 1</span>
              </div>
              <div className="w-full h-32 sm:h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">Sample Image 2</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Google Reviews" && (
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Google Reviews</h2>
            <ul className="space-y-2 sm:space-y-3">
              <li className="p-2 sm:p-3 bg-gray-50 rounded-lg shadow-sm">
                <div className="text-sm sm:text-base">
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                  <span className="ml-2">Great experience!</span>
                </div>
              </li>
              <li className="p-2 sm:p-3 bg-gray-50 rounded-lg shadow-sm">
                <div className="text-sm sm:text-base">
                  <span className="text-yellow-500">⭐⭐⭐⭐</span>
                  <span className="ml-2">Friendly staff and good service.</span>
                </div>
              </li>
            </ul>
          </div>
        )}
        {activeTab === "Medix Reviews" && (
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Medix Reviews</h2>
            <ul className="space-y-2 sm:space-y-3">
              <li className="p-2 sm:p-3 bg-gray-50 rounded-lg shadow-sm">
                <div className="text-sm sm:text-base">
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                  <span className="ml-2">Excellent service and care!</span>
                </div>
              </li>
              <li className="p-2 sm:p-3 bg-gray-50 rounded-lg shadow-sm">
                <div className="text-sm sm:text-base">
                  <span className="text-yellow-500">⭐⭐⭐⭐</span>
                  <span className="ml-2">Very professional and attentive.</span>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
