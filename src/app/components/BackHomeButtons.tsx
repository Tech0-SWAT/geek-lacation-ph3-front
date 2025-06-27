"use client";

import { useRouter } from "next/navigation";
import { SlArrowLeft } from "react-icons/sl";
import { GrHomeRounded } from "react-icons/gr";
import React from "react";
import ArrowBackIosIcon from "./icon/ArrowBackIosIcon";
import HomeIcon from "./icon/HomeIcon";

export const BackHomeButtons = () => {
  const router = useRouter();

  return (
    <div className="bg-white lg:py-4 lg:px-12">
        <div className="text-accent text-xl max-w-7xl mx-auto p-4 flex items-center justify-between">
        <button
            className="flex items-center mb-4 gap-4"
            onClick={() => router.back()}
        >
            <ArrowBackIosIcon size={24}/>
            <p className="text-xl lg:text-2xl mt-0.5">Back</p>
        </button>
        <button
            className="flex items-center mb-4 gap-2"
            onClick={() => router.push("/")}
        >
            <HomeIcon size={20} />
            <p className="text-xl lg:text-2xl mt-0.5">Home</p>
        </button>
        </div>
    </div>
  );
};
