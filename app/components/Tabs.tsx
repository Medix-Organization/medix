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
            {/* <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Description</h2> */}
            <div className="max-w-none space-y-3">
              {/* Nationality and Role Section */}
              <div className="space-y-1 bg-slate-200 rounded-md p-3">
                 <div className="text-gray-800 font-semibold text-sm sm:text-base">
                  Consultant General Dermatology
                </div>
                <div className="text-gray-600 font-semibold text-sm sm:text-base">
                  Saudi National
                </div>
               
              </div>

              {/* Qualifications Section */}
              <div className="space-y-3">
                <h3 className="text-gray-800 font-semibold text-sm sm:text-base">Qualifications</h3>
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>MD in Dermatology from King Saud University</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>Fellowship in Cosmetic Dermatology from Harvard Medical School</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>Board Certified by Saudi Commission for Health Specialties</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>Member of American Academy of Dermatology</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>Certificate in Advanced Laser Therapy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>10+ years of clinical experience in dermatology</span>
                  </li>
                </ul>
              </div>

              {/* Services Provided Section */}
              <div className="space-y-3">
                <h3 className="text-gray-800 font-semibold text-sm sm:text-base">Services Provided by the Doctor</h3>
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>General dermatology consultations and skin examinations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>Cosmetic procedures including botox and dermal fillers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>Laser treatments for hair removal and skin rejuvenation</span>
                  </li>
                </ul>
              </div>

              {/* Materials and Devices Section */}
              <div className="space-y-3">
                <h3 className="text-gray-800 font-semibold text-sm sm:text-base">Materials and Devices</h3>
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>Advanced CO2 Laser System for skin resurfacing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>IPL (Intense Pulsed Light) for pigmentation treatment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>Dermatoscope for detailed skin analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>Cryotherapy equipment for wart and lesion removal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span>High-quality injectable fillers and neurotoxins</span>
                  </li>
                </ul>
              </div>
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
