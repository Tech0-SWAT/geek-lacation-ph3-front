import React from "react";
import { RelatedWorkCard } from "@/app/components/profile/RelatedWorkCard";
import { StaffCard } from "@/app/components/LocationCard";

export const RelatedSectionEditView = () => {
  const dummyList = Array(4).fill(0);

  return (
    <div className="bg-[#F2F6F9] w-full pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg font-semibold text-accent mb-4">Related Works</h2>

      {/* 一覧部分 */}
      <div className="grid gap-4">
        {dummyList.map((_, index) => (
          <div key={index} className="bg-white rounded shadow-md border p-6 space-y-6">
            {/* 左右2列 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 左カラム */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500">作品タイトル</label>
                  <input className="w-full border px-3 py-1 rounded text-sm" defaultValue="爆CM『彼女、CM』" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500">登録日付</label>
                    <input className="w-full border px-2 py-1 rounded text-sm" defaultValue="2025" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500"> </label>
                    <input className="w-full border px-2 py-1 rounded text-sm" defaultValue="01" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500"> </label>
                    <input className="w-full border px-2 py-1 rounded text-sm" defaultValue="24" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500">商品コード</label>
                  <input className="w-full border px-3 py-1 rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">商品名</label>
                  <input className="w-full border px-3 py-1 rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">撮影場所</label>
                  <input className="w-full border px-3 py-1 rounded text-sm" />
                </div>
              </div>

              {/* 右カラム */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500">登録種別</label>
                  <p className="text-sm">プロ本人が登録</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500">素材</label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <button className="text-xs px-2 py-1 border rounded">⬇</button>
                      <img src="/sample1.jpg" alt="preview" className="w-24 h-14 object-cover rounded" />
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-xs px-2 py-1 border rounded">⬇</button>
                      <img src="/sample1.jpg" alt="preview" className="w-24 h-14 object-cover rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ページネーション仮置き */}
      <div className="mt-10 flex justify-center gap-2 text-accent">
        <button className="px-2">◀</button>
        <button className="font-bold">1</button>
        <button>2</button>
        <button>3</button>
        <span className="px-1">...</span>
        <button>12</button>
        <button className="px-2">▶</button>
      </div>
    </div>
  );
};
