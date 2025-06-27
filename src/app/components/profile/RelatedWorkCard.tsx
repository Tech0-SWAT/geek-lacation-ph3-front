"use client";

import React, { useState, useEffect } from "react";
import { TagBadge } from "@/app/components/TagBadge";
import { SkeletonImage } from "@/app/components/SkeletonImage";
import { RelatedWork } from "@/app/types/types";

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

type RelatedWorkCardProps = {
  work: RelatedWork;
  useTags?: boolean;
  expanded?: boolean;
};

export const RelatedWorkCard = ({
  work,
  useTags = false,
  expanded = false,
}: RelatedWorkCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!work?.thumbnail_url) return;

      if (isValidUrl(work.thumbnail_url)) {
        setImageUrl(work.thumbnail_url);
        return;
      }

      const fileName = work.thumbnail_url.endsWith(".jpg")
        ? work.thumbnail_url
        : `${work.thumbnail_url}.jpg`;

      try {
        console.log("Fetching product image(work) for:", fileName);
        const res = await fetch(
          `/api/get_product_image_by_azure_storage?fileName=${encodeURIComponent(fileName)}`,
          { cache: "no-store" }
        );
        console.log("Product image response status:", res.status);
        if (!res.ok) {
          throw new Error("Failed to fetch blob URL for product image");
        }
        const data = await res.json();
        console.log("Product image data:", data);
        setImageUrl(data.url);
      } catch (err) {
        console.warn("画像の取得エラー:", err);
        setImageUrl(null);
      }
    };

    fetchImageUrl();
  }, [work?.thumbnail_url]);

  const imageWidth = expanded ? "w-[260px]" : "w-[360px]";
  const imageHeight = expanded ? "h-[149px]" : "h-[206px]";

  const EmployeeTagBlock = ({
    label,
    employees,
    expanded = false,
  }: {
    label: string;
    employees: any[] | any;
    expanded?: boolean;
  }) => {
    const employeeList = Array.isArray(employees)
      ? employees
      : employees
      ? [employees]
      : [];

    return (
      <div
        className={
          expanded
            ? "flex flex-col items-start gap-1 w-full"
            : "flex items-start gap-8"
        }
      >
        <TagBadge label={label} className="min-w-[130px] text-[8px] mb-1" />
        <div
          className={
            expanded
              ? "flex flex-wrap gap-y-1 gap-x-8 w-full"
              : "flex flex-wrap gap-y-1 gap-x-8"
          }
        >
          {employeeList.length > 0 ? (
            employeeList.map((emp: any, idx: number) => (
              <span key={idx}>{emp?.employee_name ?? "N/A"}</span>
            ))
          ) : (
            <span>N/A</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col items-center ${imageWidth} cursor-pointer`}
      onClick={() => {
        window.location.href = `/work/${work.product_id}`;
      }}
    >
      {/* Image block */}
      <div className={`relative ${imageWidth} ${imageHeight} rounded overflow-hidden`}>
{imageUrl ? (
  <>
    {console.log("✅ SkeletonImage に渡す imageUrl:", imageUrl)}
    <SkeletonImage
      src={imageUrl}
      alt={work.title}
      fill
      sizes="(max-width: 100%)"
      className="rounded object-cover object-center"
      unoptimized
    />
  </>
) : (
  <div
    className={`flex items-center justify-center text-gray-500 text-lg rounded bg-gray-200 ${imageWidth} ${imageHeight}`}
  >
    No Image
  </div>
)}
      </div>

      {/* Text block */}
      <div className={`p-2 text-left text-s mb-1 ${imageWidth}`}>
        <div className="text-black mt-1 mb-1">{work.title}</div>
        <div className="text-black">{work.product_number}</div>
      </div>

      {/* Tag block */}
      {useTags && (
        <div className={`flex flex-wrap gap-3 mb-8 ${imageWidth}`}>
          <EmployeeTagBlock
            label="プロデューサー"
            employees={work.associated_employees?.Producer}
            expanded={expanded}
          />
          <EmployeeTagBlock
            label="プロダクションマネージャー"
            employees={work.associated_employees?.PM}
            expanded={expanded}
          />
        </div>
      )}
    </div>
  );
};
