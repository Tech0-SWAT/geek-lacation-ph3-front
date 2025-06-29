import React from "react";

// フルスクリーンのリッチローディング（初期読み込み用）
export const LoadingScreen = () => {
  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-center gap-6">
      <span className="loading loading-spinner text-accent w-12 h-12"></span>
      <div className="text-accent text-lg animate-pulse">読み込み中です...</div>
    </div>
  );
};

// RelatedSection などの簡易スピナー（1行で使える）
export const InlineLoading = () => {
  return <span className="loading loading-spinner text-accent w-6 h-6" />;
};
