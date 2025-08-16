"use client";
import { useState } from "react";

export default function Tabs() {
  const tabs = ["Description", "Gallery", "Google Reviews", "Medix Reviews"];
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
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
      <div className="p-4">
        {activeTab === "Description" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">
              This is the description section. Add your doctor’s or clinic’s
              detailed info here.
            </p>
          </div>
        )}

        {activeTab === "Gallery" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Gallery</h2>
            <div className="grid grid-cols-2 gap-2">
              {/* Example images */}
              <img
                src="/images/sample1.jpg"
                alt="Sample 1"
                className="w-full h-40 object-cover rounded-lg"
              />
              <img
                src="/images/sample2.jpg"
                alt="Sample 2"
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
          </div>
        )}

        {activeTab === " Google Reviews" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Reviews</h2>
            <ul className="space-y-2">
              <li className="p-3 bg-gray-50 rounded-lg shadow-sm">
                ⭐⭐⭐⭐⭐ Great experience!
              </li>
              <li className="p-3 bg-gray-50 rounded-lg shadow-sm">
                ⭐⭐⭐⭐ Friendly staff and good service.
              </li>
            </ul>
          </div>
        )}
        {activeTab === "Medix Reviews" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Medix Reviews</h2>
            <ul className="space-y-2">
              <li className="p-3 bg-gray-50 rounded-lg shadow-sm">
                ⭐⭐⭐⭐⭐ Excellent service and care!
              </li>
              <li className="p-3 bg-gray-50 rounded-lg shadow-sm">
                ⭐⭐⭐⭐ Very professional and attentive.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
