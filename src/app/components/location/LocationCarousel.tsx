import { noDataPlaceholder } from "@/utils/format";
import { SkeletonImage } from "../common/SkeletonImage";
import { CarouselGroup } from "../common/CarouselGroup";

type LocationCarouselProps = {
  file_name?: string | null;
  title?: string | null;
  subtitle?: string | null;
  onClick?: () => void;
};

export const LocationCarousel = ({
  file_name,
  title,
  subtitle,
  onClick, // ✅ 追加
}: LocationCarouselProps) => {
  return (
    <div className="flex flex-col items-start w-[200px] shrink-0">
      {/* 画像枠（上下中央に配置） */}
      <div
        className="bg-[#EFEFEF] w-full h-[140px] flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={onClick} 
      >
        <SkeletonImage
          src={file_name ?? "/images/no_image.png"}
          alt="ロケーション画像"
          width={200}
          height={140}
          className="object-contain h-full"
        />
      </div>

      {/* テキスト部分 */}
      <div className="flex flex-col text-xs mt-2 text-center gap-0.5">
        <span className="break-all text-left">{title ?? noDataPlaceholder}</span>
        {subtitle && <span className="break-all text-left">{subtitle}</span>}
      </div>
    </div>
  );
};

type LocationCarouselGroupProps = {
  title?: string;
  data: LocationCarouselProps[];
  onImageClick?: (url: string) => void;
};

export const LocationCarouselGroup = ({
  title,
  data = [],
  onImageClick,
}: LocationCarouselGroupProps) => {
  return (
    <CarouselGroup title={title}>
      {data.length > 0 &&
        data.map((item, index) => (
          <LocationCarousel
            key={index}
            file_name={item.file_name}
            title={item.title}
            subtitle={item.subtitle}
            onClick={() => item.file_name && onImageClick?.(item.file_name)}
          />
        ))}
    </CarouselGroup>
  );
};