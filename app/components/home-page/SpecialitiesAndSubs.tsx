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
    <>
      <div className="flex justify-evenly">
        <h1>All Speialities</h1>
        {specialties.map((speciality, i) => (
          <div key={speciality.id} className="flex flex-col items-center">
            <button
              className={`transition-all duration-150 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center border-slate-400 justify-center bg-white shadow-sm overflow-hidden ${
                activeSpecialty.label == speciality.label
                  ? "border-blue-500"
                  : null
              }`}
              onClick={() => setActiveSpecialty(speciality)}
            >
              <Image
                width={100}
                height={100}
                src={speciality.icon}
                alt={speciality.label}
                className="w-full h-full object-cover hover:shadow-2xl hover:cursor-pointer"
              />
            </button>
            <div
              className={` mt-3 text-center text-sm md:text-base mb-3 ${
                activeSpecialty.label === speciality.label
                  ? "text-blue-600 font-semibold "
                  : "text-gray-600"
              }`}
            >
              {t(`specialties.${i}.label`)}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6 mt-2 w-full justify-center text-sm transition-all duration-150 ease-in-out">
        {activeSpecialty.tags.map((tag, i) => (
          <button
            key={i}
            onClick={() => setActiveTag(tag)}
            className={`flex items-center gap-2 px-2 py-2 rounded-full border  hover:cursor-pointer hover:shadow-2xl transition-all duration-150
                    ${
                      tag === activeTag
                        ? "bg-blue-100 border-blue-500 text-blue-600 shadow-lg"
                        : "bg-white border-gray-300 text-gray-600"
                    }`}
          >
            {t(
              `specialties.${[specialties.indexOf(activeSpecialty)]}.tags.${[
                i,
              ]}`
            )}
          </button>
        ))}
      </div>
    </>
  );
};

export default SpecialitiesAndSubs;
