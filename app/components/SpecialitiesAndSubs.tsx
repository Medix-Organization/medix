'use client';
import { specialties, subs } from '@/lib/dummyData'
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react'

const SpecialitiesAndSubs = () => {
    const t = useTranslations('home');
    const [activeSpecialty, setActiveSpecialty] = React.useState(specialties[0].label);
    const [activeSub, setActiveSub] = React.useState(subs[0]);
    return (
        <>
            <div className="flex justify-evenly">
                {specialties.map((s , i) => (
                    <div key={s.id} className="flex flex-col items-center">
                        <button className={`transition-all duration-150 w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-blue-200 flex items-center justify-center bg-white shadow-sm overflow-hidden ${activeSpecialty == s.label ? 'scale-110': "scale-75"}` }
                        onClick={() => setActiveSpecialty(s.label)}
                        >
                            <Image
                                width={100}
                                height={100}
                                src={s.icon}
                                alt={s.label}
                                className="w-full h-full object-cover hover:shadow-2xl hover:cursor-pointer"
                            />
                        </button>
                        <div className={` mt-3 text-center text-sm md:text-base mb-3 ${activeSpecialty
    === s.label ? 'text-blue-600 font-semibold scale-110' : 'text-gray-600'
                        }`}>{t(`specialties.${i}.label`)}</div>
                    </div>
                ))}
            </div>

            {/* التخصصات الفرعية */}
            <div className="flex gap-4 mb-6 mt-2 w-full justify-center">
                {subs.map((sub , i) => (
                    <button
                        key={sub}
                        onClick={() => setActiveSub(sub)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border  hover:cursor-pointer hover:shadow-2xl transition-all duration-150
                    ${activeSub === sub ? "bg-blue-100 border-blue-500 text-blue-600 shadow-lg" : "bg-white border-gray-300 text-gray-600"}`}
                    >
                        {t(`subs.${i}`)}
                    </button>
                ))}
            </div>
        </>
    )
}

export default SpecialitiesAndSubs