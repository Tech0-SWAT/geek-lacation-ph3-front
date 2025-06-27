"use client";

import React from "react";
import Link from "next/link";
import { SkeletonImage } from "@/app/components/SkeletonImage";
import { TagBadge } from "@/app/components/TagBadge";

type Occupation = {
  id: string | number;
  occupation_name?: string;
};

type Staff = {
  creator_id: string;
  name: string;
  file_name: string;
  occupations: Occupation[];
};

type StaffCardProps = {
  staff: Staff;
};

export const StaffCard = ({ staff }: StaffCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[200px] h-[200px] mx-auto mb-1">
        <Link href={`/profile/${staff.creator_id}`}>
          <SkeletonImage
            src={staff.file_name}
            alt={staff.name}
            fill
            sizes="(max-width: 100%)"
            className="object-cover rounded-md"
          />
        </Link>
      </div>

      <div className="px-3 py-1 my-3 gap-2 flex flex-col">
        {staff.occupations.map((occ) => (
          <TagBadge
            key={occ.id}
            label={occ.occupation_name ?? "N/A"}
            className="text-xs mx-1 w-[200px]"
          />
        ))}
      </div>

      <div className="text-sm font-bold text-gray-700">{staff.name}</div>
    </div>
  );
};
