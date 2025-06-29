import CarouselArrowIcon from "../icon/CarouselArrowIcon";
import React from "react";

type CarouselGroupProps = {
  title?: string;
  children: React.ReactNode; // ここは実際のデータ型に合わせて調整してください
}

export const CarouselGroup = ({
  title,
  children,
}: CarouselGroupProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {title && <h2 className="px-8 xl:px-16 text-2xl font-semibold text-accent">{title}</h2>}
      <div className="flex flex-row gap-4 items-center justify-between">
        <CarouselArrowIcon className="shrink-0"/>
        <div className="flex flex-nowrap gap-4 items-center overflow-x-auto custom-scroll" style={{ scrollbarWidth: "thin" }}>
          {children}
          <div className="flex-grow"/>
        </div>
        <CarouselArrowIcon className="shrink-0 rotate-180"/>
      </div>
    </div>
  );
}
