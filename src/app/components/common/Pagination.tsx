import * as React from "react";
import { PaginationProps } from "@/types/businesscard";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  startItem = 0,
  endItem = 0, 
  onPrevious,
  onNext,
}) => {
  // 総ページ数を計算
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 「...」を含むページ番号一覧を生成
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;
  // ★ handlePageClick 関数を定義
  function handlePageClick(page: number) {
    // 現在ページより小さい場合は複数回 onPrevious()
    if (page < currentPage) {
      let diff = currentPage - page;
      for (let i = 0; i < diff; i++) {
        onPrevious();
      }
    }
    // 現在ページより大きい場合は複数回 onNext()
    else if (page > currentPage) {
      let diff = page - currentPage;
      for (let i = 0; i < diff; i++) {
        onNext();
      }
    }
  }

  return (
    <div className="flex items-center justify-center gap-4 m-10">
      {/* 左矢印ボタン */}
      <button
        onClick={onPrevious}
        disabled={isFirstPage}
        className={`w-8 h-8 flex items-center justify-center 
          rounded-full text-accent
          hover:bg-gray-100
          ${isFirstPage ? "opacity-20 cursor-not-allowed" : ""}`}
      >
        <SlArrowLeft size={16} />
      </button>

      {/* ページ番号の一覧表示 */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((page, idx) => {
          if (page === "...") {
            // 省略記号
            return (
              <span key={`ellipsis-${idx}`} className="text-gray-500 px-1">
                ...
              </span>
            );
          } else {
            const pageNum = page as number;
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageClick(pageNum)}
                className={`
                  w-8 h-8 flex items-center justify-center 
                  rounded-full text-accent 
                  ${
                    isActive
                      ? "bg-black text-white border-black"
                      : "text-gray-700"
                  }
                `}
              >
                {pageNum}
              </button>
            );
          }
        })}
      </div>

      {/* 右矢印ボタン */}
      <button
        onClick={onNext}
        disabled={isLastPage}
        className={`w-8 h-8 flex items-center justify-center 
          rounded-full text-accent
          hover:bg-gray-100
          ${isLastPage ? "opacity-20 cursor-not-allowed" : ""}`}
      >
        <SlArrowRight size={16} />
      </button>
    </div>
  );
};

/**
 * 現在のページと総ページ数から、ページ番号のリストを生成する
 * 例: 1 2 3 ... 10
 */
function getPageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
  const pages: (number | "...")[] = [];

  if (totalPages <= 5) {
    // 全部表示
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // ページ数が多い場合
  const firstPage = 1;
  const lastPage = totalPages;

  // 1. 常に最初と最後は表示
  pages.push(firstPage);

  // 2. 中央に向けてページを追加
  //    - currentPage が小さいとき
  if (currentPage <= 3) {
    // 2, 3, 4 を表示
    for (let i = 2; i <= 4; i++) {
      pages.push(i);
    }
    pages.push("...");
  }
  //    - currentPage が終盤のとき
  else if (currentPage >= totalPages - 2) {
    pages.push("...");
    for (let i = totalPages - 3; i < totalPages; i++) {
      pages.push(i);
    }
  }
  //    - 中央付近
  else {
    pages.push("...");
    pages.push(currentPage - 1);
    pages.push(currentPage);
    pages.push(currentPage + 1);
    pages.push("...");
  }

  // 3. 最後のページを追加
  pages.push(lastPage);

  return pages;
}