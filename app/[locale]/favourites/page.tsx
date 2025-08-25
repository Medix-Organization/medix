import DoctorCard from "@/app/components/home-page/doctorCard";
import { doctors } from "@/lib/dummyData";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { getTranslations } from "next-intl/server";

export default async function FavouritesPage() {
  const t = await getTranslations('home.favourites');
  // Using first 3 doctors as dummy favourites
  const favouriteDoctors = doctors.slice(0, 3);

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      <main className="w-full">
        {/* Container for larger screens */}
        <div className="md:max-w-4xl md:mx-auto lg:max-w-5xl xl:max-w-6xl">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-6 md:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <FaHeart className="text-2xl text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            </div>
            <p className="text-gray-600">{t('subtitle')}</p>
          </div>

          {/* Favourites List */}
          <section className="px-4 pb-6 md:px-6 lg:px-8 pt-6">
            {favouriteDoctors.length > 0 ? (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {favouriteDoctors.length} {favouriteDoctors.length === 1 ? t('doctorsCount') : t('doctorsCountPlural')}
                </h3>
                <div className="space-y-0">
                  {favouriteDoctors.map((d) => (
                    <DoctorCard key={d.id} d={d} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('empty.title')}</h3>
                <p className="text-gray-500">{t('empty.description')}</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}