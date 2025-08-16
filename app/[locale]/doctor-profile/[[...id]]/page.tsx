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
    <main className="flex flex-col lg:flex-row gap-4 lg:gap-7 p-4 lg:p-10 bg-gray-50 text-gray-800 h-full">
      <section className="flex flex-col lg:flex-[1] w-full bg-white rounded-lg shadow-md p-4 lg:p-6 h-fit lg:max-h-[600px] lg:self-center">
        <section className="">
          <section className="flex flex-col sm:flex-row items-center sm:items-start">
            <div className="flex-shrink-0 mb-4 sm:mb-0">
              <Image
                src="/ahmad.jpg"
                alt="Doctor Profile"
                width={150}
                height={150}
                className="rounded-full sm:w-[200px] sm:h-[200px] w-[150px] h-[150px]"
              />
            </div>
            <div className="flex flex-col sm:ml-4 gap-2 text-center sm:text-left">
              <h1 className="text-2xl font-bold">Dr. Sarah Johnson</h1>
              <p className="p-2 px-3 border rounded-3xl w-fit bg-blue-500 text-white">
                Cardiologist
              </p>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
                pariatur quisquam quis mollitia distinctio voluptas eum in cum a
                beatae! Ut dignissimos beatae alias quo ipsum et qui atque
                dolores.
              </p>
            </div>
          </section>
        </section>
        <div className="px-9 border mt-9 border-slate-200"></div>
        <section className=" flex flex-col gap-4 mt-6 text-sm ">
          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
            <div className="flex flex-col gap-2">
              <div className="flex  gap-2 items-center">
                <FaLocationDot />
                <p className="text-gray-600">Riyadh , Sulaiman alhabeeb</p>
              </div>
              <div className="flex  gap-2 items-center">
                <FaGraduationCap />
                <p className="text-gray-600">+12 years of experience</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex  gap-2 items-center">
                <BiSolidLike />
                <p className="text-gray-600">Recommendation : 97%</p>
              </div>
              <div className="flex  gap-2 items-center">
                <IoMdStar color="yellow" size={25} />
                <p className="text-gray-600">Reviews</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <p className="p-1 bg-slate-200 text-sm px-3 rounded-3xl w-fit ">
              tag1
            </p>
            <p className="p-1 bg-slate-200 text-sm px-3 rounded-3xl w-fit ">
              tag2
            </p>
            <p className="p-1 bg-slate-200 text-sm px-3 rounded-3xl w-fit ">
              tag3
            </p>
            <p className="p-1 bg-slate-200 text-sm px-3 rounded-3xl w-fit ">
              tag4
            </p>
            <p className="p-1 bg-slate-200 text-sm px-3 rounded-3xl w-fit ">
              tag5
            </p>
          </div>
        </section>
        <div className="px-9 border mt-5 border-slate-200"></div>
        <div className=" flex justify-end mt-2  ">
          <p className="">Consultation 350 SAR</p>
        </div>
      </section>
      <section className="flex flex-col lg:flex-[2] w-full bg-white rounded-lg shadow-md p-4 lg:p-6">
        <h1 className="text-2xl font-bold mb-4">Doctor Profile</h1>
        <Tabs />
      </section>
    </main>
  );
};

export default Page;
