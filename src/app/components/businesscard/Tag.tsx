import * as React from "react";
import { TagProps } from "@/types/businesscard";

export const Tag: React.FC<TagProps> = ({ text }) => {
  return (
    <div className="gap-1 self-stretch px-2 py-1 my-auto p-2 rounded-xl text-[10px] text-white bg-[#222222] text-center w-[100px] ">
      {text}
    </div>
  );
};

export default Tag;
