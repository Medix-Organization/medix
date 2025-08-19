import Tabs from "@/app/components/Tabs";
import Image from "next/image";
import React from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaGraduationCap, FaLocationDot } from "react-icons/fa6";
import { IoMdStar } from "react-icons/io";

const Page = async ({ params }: { params: Promise<any> }) => {
  const id = await params;
  console.log("ID from params:", id.id[0]);
  return (
    <main className="flex flex-col lg:flex-row gap-4 p-4 md:p-6  text-gray-800 mb-20 md:mb-0 md:max-w-5xl md:mx-auto lg:max-w-6xl xl:max-w-6xl xl:px-8">
      <section className="flex flex-col lg:flex-[0.8] lg:max-w-sm w-full bg-white rounded-lg shadow-md p-4 md:p-6 h-fit lg:self-start">
        <section className="">
          <section className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="flex-shrink-0">
              <Image
                src="/ahmad.jpg"
                alt="Doctor Profile"
                width={150}
                height={150}
                className="rounded-full w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 text-center sm:text-left w-full">
              <h1 className="text-2xl font-bold text-gray-900">Dr. Sarah Johnson</h1>
              <p className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-full w-fit mx-auto sm:mx-0">
                Cardiologist
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Experienced cardiologist specializing in heart disease prevention and treatment. Committed to providing comprehensive cardiac care.
              </p>
            </div>
          </section>
        </section>
        <div className="border-t mt-4 border-slate-200"></div>
        <section className="flex flex-col gap-3 mt-4">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <FaLocationDot className="text-gray-400 flex-shrink-0" />
                <p className="text-gray-600 text-sm">Riyadh, Sulaiman alhabeeb</p>
              </div>
              <div className="flex gap-2 items-center">
                <FaGraduationCap className="text-gray-400 flex-shrink-0" />
                <p className="text-gray-600 text-sm">+12 years of experience</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <BiSolidLike className="text-green-500 flex-shrink-0" />
                <p className="text-gray-600 text-sm">Recommendation: 97%</p>
              </div>
              <div className="flex gap-2 items-center">
                <IoMdStar color="#fbbf24" size={20} className="flex-shrink-0" />
                <p className="text-gray-600 text-sm">Reviews</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              Heart Surgery
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              Cardiology
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
              Emergency Care
            </span>
          </div>
        </section>
        <div className="border-t mt-3 border-slate-200"></div>
        <div className="flex justify-center sm:justify-end mt-2">
          <p className="text-sm font-semibold text-blue-600">Consultation 350 SAR</p>
        </div>
      </section>
      <section className="flex flex-col lg:flex-[1.2] w-full bg-white rounded-lg shadow-md p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-4">Doctor Profile</h1>
        <Tabs />
      </section>
    </main>
  );
};

export default Page;
