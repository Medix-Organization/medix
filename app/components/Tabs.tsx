"use client";
import { useState } from "react";

export default function Tabs() {
  const tabs = ["Description", "Gallery", "Google Reviews", "Medix Reviews"];
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <div className="w-full">
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
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Description</h2>
            <div className="max-w-none">
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                This is the description section. Add your doctor's or clinic's
                detailed info here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        )}

        {activeTab === "Gallery" && (
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Example images */}
              <div className="w-full h-32 sm:h-40 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors">
                <span className="text-gray-500 text-sm">Sample Image 1</span>
              </div>
              <div className="w-full h-32 sm:h-40 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors">
                <span className="text-gray-500 text-sm">Sample Image 2</span>
              </div>
              <div className="w-full h-32 sm:h-40 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors">
                <span className="text-gray-500 text-sm">Sample Image 3</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Google Reviews" && (
          <div>
            <div className="space-y-3 sm:space-y-4">
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                      JD
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-yellow-500 text-sm sm:text-base">⭐⭐⭐⭐⭐</span>
                      <span className="text-gray-500 text-xs sm:text-sm">John Doe</span>
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed break-words">
                      Great experience! The doctor was very professional and took time to explain everything clearly. Highly recommended.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                      MS
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-yellow-500 text-sm sm:text-base">⭐⭐⭐⭐</span>
                      <span className="text-gray-500 text-xs sm:text-sm">Maria Smith</span>
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed break-words">
                      Friendly staff and good service. The clinic is clean and well-organized. Will definitely come back.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "Medix Reviews" && (
          <div>
            <div className="space-y-3 sm:space-y-4">
              <div className="p-3 sm:p-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                      AB
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-yellow-500 text-sm sm:text-base">⭐⭐⭐⭐⭐</span>
                      <span className="text-gray-600 text-xs sm:text-sm font-medium">Ahmed Bin Ali</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full whitespace-nowrap">Verified Patient</span>
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed break-words">
                      Excellent service and care! Dr. Sarah was very thorough in her examination and provided clear treatment options. The booking through Medix was seamless.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 sm:p-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                      FK
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-yellow-500 text-sm sm:text-base">⭐⭐⭐⭐</span>
                      <span className="text-gray-600 text-xs sm:text-sm font-medium">Fatima Khalil</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full whitespace-nowrap">Verified Patient</span>
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed break-words">
                      Very professional and attentive. The consultation was detailed and I felt comfortable throughout the visit. Great experience with Medix platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
