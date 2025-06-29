// DisplayCards.tsx
import { useState } from "react";
import LocationCard from "./LocationCard";
import { BusinessCard } from "./businesscard/BusinessCard";
import { dummyData } from "@/data/dummyData"; // エイリアス設定に合わせてパスを調整
import { Pagination } from "./Pagination";
import { useFilter } from "@/app/context/FilterContext"; // 追加: コンテキストからフェッチデータ取得


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

import { Sidebar } from "./Sidebar";

interface DisplayCardsProps {
  images: any[];
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onIntegratedSearch: () => void;
}

export default function DisplayCards({ images, isSidebarOpen, onToggleSidebar, onIntegratedSearch }: DisplayCardsProps) {
  // const datalist = dummyData
  const { fetchedData } = useFilter();
  console.log("Displaycardsで読んでいるコンテキストの fetchedData:", fetchedData);
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
    <div className="pt-[80px] bg-[#F9F8F2]">
      {/* フレックスレイアウトでサイドバーとカードエリアを横並び配置 */}
      <div className="flex w-full">
        {/* デスクトップ版サイドバー */}
        <div className="hidden lg:block bg-white rounded-r-3xl mb-12 shadow-lg">
          <Sidebar isOpen={isSidebarOpen} onToggle={onToggleSidebar} onIntegratedSearch={onIntegratedSearch} />
        </div>
        
        {/* カードエリア */}
        <div className="flex-1 lg:ml-6">
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
        
        {/* モバイル版サイドバー（従来通り） */}
        <div className="lg:hidden">
          <Sidebar isOpen={isSidebarOpen} onToggle={onToggleSidebar} onIntegratedSearch={onIntegratedSearch} />
        </div>
      </div>
    </div>
  );
}