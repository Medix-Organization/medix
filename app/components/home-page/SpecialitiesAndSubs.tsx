"use client";
import { specialties, subs } from "@/lib/dummyData";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const SpecialitiesAndSubs = () => {
  const t = useTranslations("home");
  const [activeSpecialty, setActiveSpecialty] = React.useState(specialties[0]);
  const [activeTag, setActiveTag] = React.useState(subs[0]);
  return (
    <div className="bg-white">
      {/* All Specialities Section */}
      <div className="px-4 py-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">All Specialities</h2>
        <div className="flex justify-between items-center gap-4 overflow-x-auto pb-2 md:justify-center md:gap-8 md:max-w-2xl md:mx-auto lg:max-w-3xl lg:gap-12">
          {specialties.map((speciality, i) => (
            <div key={speciality.id} className="flex flex-col items-center min-w-0 flex-shrink-0">
              <button
                className={` transition-all duration-200 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden border-2 ${
                  activeSpecialty.label === speciality.label
                    ? "border-green-400"
                    : "border-none"
                }`}
                onClick={() => setActiveSpecialty(speciality)}
              >
                <img
                  width={40}
                  height={40}
                  src={speciality.icon}
                  alt={speciality.label}
                  className="object-cover rounded-full"
                />
              </button>
              <div
                className={`text-center text-xs font-bold max-w-[80px] leading-tight h-10 flex items-center justify-center ${activeSpecialty.label === speciality.label
                    ? "text-blue-600"
                    : "text-gray-800"
                  }`}
              >
                {t(`specialties.${i}.label`)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub Specialities Section */}
      <div className="px-4 pb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Sub Specialities</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:justify-center md:flex-wrap md:overflow-visible md:max-w-4xl md:mx-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {activeSpecialty.tags.map((tag, i) => (
            <button
              key={i}
              onClick={() => setActiveTag(tag)}
              className={`px-5 py-3 font-bold rounded-full text-sm transition-all duration-200 whitespace-nowrap flex-shrink-0 shadow-sm ${tag === activeTag
                  ? "bg-blue-600 text-white shadow-blue-200"
                  : "bg-gray-200 text-gray-700  hover:bg-gray-200 hover:border-gray-300"
                }`}
            >
              {t(
                `specialties.${specialties.indexOf(activeSpecialty)}.tags.${i}`
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialitiesAndSubs;
