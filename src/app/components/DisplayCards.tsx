// DisplayImages.tsx
import { useState } from "react";
import LocationCard from "./LocationCard";
import { BusinessCard } from "./businesscard/BusinessCard";
import { dummyData } from "@/data/dummyData"; // エイリアス設定に合わせてパスを調整
import { Pagination } from "./Pagination";

type ImageType = {
  url: string;
  type: string;
  caption?: string | null;
};

type LocationItem = {
  name: string;
  address: string;
  tel?: string;
  mail?: string;
  categories: string[];
  images: ImageType[];
};

type Props = {
  images: LocationItem[];
};


export default function DisplayCards({ images }) {
  // const datalist = dummyData
  const datalist = images
  console.log("datalist",datalist)

  const [currentPage, setCurrentPage] = useState(1);
  // 1ページあたりのアイテム数
  const itemsPerPage = 12;
  // 総アイテム数
  const totalItems = datalist.length;
  // 現在のページに応じて表示するデータを切り出し
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = datalist.slice(startIndex, endIndex);
  // ページングに表示する "◯ - ◯"
  const startItem = startIndex + 1; // 1-based
  const endItem = Math.min(endIndex, totalItems);

  // 「前へ」ボタン
  const onPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 「次へ」ボタン
  const onNext = () => {
    if (endIndex < totalItems) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pt-[80px] bg-[#F2F6F9]">
      <div className="w-full mx-auto px-12">
        <div className="max-w-7xl mx-auto p-4">
        <p className="mb-[100px] text-[36px] font-semibold text-left m-0 flex items-center gap-4">
        <span>Location List</span>
        <span className="bg-black text-white px-4 py-1 rounded-full text-2xl">{totalItems}件</span>
      </p>

          <div className="grid gap-8 justify-center [grid-template-columns:repeat(auto-fit,360px)]">
            {currentItems.map((data, index) => (
              <LocationCard
                key={index}
                name={data.name}
                address={data.address}
                tel={data.tel}
                mail={data.mail}
                categories={data.categories ?? []}
                images={data.images ?? []}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              startItem={startItem}
              endItem={endItem}
              onPrevious={onPrevious}
              onNext={onNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}