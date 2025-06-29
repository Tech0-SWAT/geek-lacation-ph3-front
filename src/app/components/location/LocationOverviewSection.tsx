"use client";

import { useState } from "react";
import { LocationCarouselGroup } from "./LocationCarousel";
import { ImageModal } from "../common/ImageModal";

type LocationOverviewSectionProps = {
  data: any;
};

export const LocationOverviewSection = ({ data }: LocationOverviewSectionProps) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  // 指定した image_type の画像を抽出してCarousel用に整形
  const convertImages = (type: string) => {
    return (data?.images ?? [])
      .filter((img: any) => img.image_type === type)
      .map((img: any) => ({
        file_name: img.url
      }));
  };
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalImages, setModalImages] = useState<string[]>([]);

  // CarouselGroup に渡す画像 + クリックイベントを追加
  const renderGroup = (title: string, type: string) => {
    const images = convertImages(type).map(img => img.file_name ?? "");
    if (!images.length) return null;

    return (
      <LocationCarouselGroup
        title={title}
        data={images.map(url => ({ file_name: url }))}
        onImageClick={(url: string) => {
          const index = images.findIndex(i => i === url);
          setSelectedIndex(index);
          setModalImages(images);
        }}
      />
    );
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col justify-start items-start px-8 gap-y-8 py-8">
      {renderGroup("ロケ地", "location")}
      {renderGroup("アングル写真", "angle")}
      {renderGroup("その他設備・搬入経路", "facility")}
      {renderGroup("過去作品一覧", "pastwork")}
      {selectedIndex !== null && modalImages.length > 0 && (
        <ImageModal
          images={modalImages}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onPrev={() =>
            setSelectedIndex((prev) => (prev! - 1 + modalImages.length) % modalImages.length)
          }
          onNext={() =>
            setSelectedIndex((prev) => (prev! + 1) % modalImages.length)
          }
        />
      )}
    </div>
  );
};