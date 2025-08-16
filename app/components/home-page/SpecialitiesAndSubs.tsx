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
        <div className="flex justify-between items-center gap-2 overflow-x-auto pb-2">
          {specialties.map((speciality, i) => (
            <div key={speciality.id} className="flex flex-col items-center min-w-0 flex-shrink-0">
              <button
                className={`transition-all duration-200 w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border-2 ${
                  activeSpecialty.label === speciality.label
                    ? "bg-blue-600 border-blue-600"
                    : "bg-white border-blue-600"
                }`}
                onClick={() => setActiveSpecialty(speciality)}
              >
                {activeSpecialty.label === speciality.label ? (
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <Image
                      width={24}
                      height={24}
                      src={speciality.icon}
                      alt={speciality.label}
                      className="w-6 h-6 object-cover"
                    />
                  </div>
                ) : (
                  <Image
                    width={32}
                    height={32}
                    src={speciality.icon}
                    alt={speciality.label}
                    className="w-8 h-8 object-cover"
                  />
                )}
              </button>
              <div
                className={`mt-2 text-center text-xs font-medium ${
                  activeSpecialty.label === speciality.label
                    ? "text-blue-600"
                    : "text-gray-600"
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
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {activeSpecialty.tags.map((tag, i) => (
            <button
              key={i}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                tag === activeTag
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
