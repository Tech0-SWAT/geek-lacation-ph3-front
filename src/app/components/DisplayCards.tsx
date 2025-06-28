// DisplayCards.tsx
import { useState } from "react";
import { BusinessCard } from "./businesscard/BusinessCard";
import { dummyData } from "@/data/dummyData"; // エイリアス設定に合わせてパスを調整
import { Pagination } from "./Pagination";
import { Sidebar } from "./Sidebar";

interface DisplayCardsProps {
  images: any[];
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function DisplayCards({ images, isSidebarOpen, onToggleSidebar }: DisplayCardsProps) {
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
      {/* フレックスレイアウトでサイドバーとカードエリアを横並び配置 */}
      <div className="flex w-full px-12">
        {/* デスクトップ版サイドバー */}
        <div className="hidden lg:block">
          <Sidebar isOpen={isSidebarOpen} onToggle={onToggleSidebar} />
        </div>
        
        {/* カードエリア */}
        <div className="flex-1 lg:ml-6">
          <div className="max-w-7xl mx-auto p-4">
            <p className="mb-[100px] text-[36px] font-semibold text-left m-0">
              該当者：{totalItems}名
            </p>
            <div className="grid gap-8 justify-center [grid-template-columns:repeat(auto-fit,360px)]">
              {/* imageは本来file_nameだが一旦仮置き,work={data.product_image_path}も */}
              {currentItems.map((data:any, index:any) => (
                <BusinessCard
                  key={index}
                   name={data.name || data.creator_name}
                  furigana={data.name_furigana}
                   uuid={data.creator_id}
                   image={data.file_name}
                  personInfo={data.personInfo}
                   tags={data.occupations}
                   date={data.product_number || data.latest_product_number}
                  fileType={data.fileType}
                   title={data.product_title || data.latest_product_title}
                   work={data.latest_product_number || data.product_number }
                   company={data.company_name}
                   inquiry_email={data.inquiry_email || data.latest_inquiry_email}
                   inquiry_phone={data.inquiry_phone || data.latest_inquiry_phone}
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
          <Sidebar isOpen={isSidebarOpen} onToggle={onToggleSidebar} />
        </div>
      </div>
    </div>
  );
}
