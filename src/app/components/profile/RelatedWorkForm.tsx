"use client";

import React from "react";
import UploadIcon from "@/app/components/icon/UploadIcon";

type RelatedWork = {
  title: string;
  updated_at: Date;
  product_number: string;
  thumbnail_url: string;
};

type Props = {
  work: RelatedWork;
};

export const RelatedWorkForm = ({ work }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-base-primary p-8 rounded-lg bg-white">
      <div>
        <label className="block text-sm font-semibold mb-1">作品タイトル</label>
        <input className="w-full border px-3 py-2 rounded bg-white" defaultValue={work.title} />

        <label className="block text-sm font-semibold mt-6 mb-1">登録年月日</label>
        <div className="flex gap-2">
          {/* <input className="w-20 border px-2 py-1 rounded bg-white" defaultValue={work.updated_at.getFullYear()} /> */}
          <span className="text-sm self-center">年</span>
          {/* <input className="w-16 border px-2 py-1 rounded bg-white" defaultValue={(work.updated_at.getMonth() + 1).toString().padStart(2, "0")} /> */}
          <span className="text-sm self-center">月</span>
          {/* <input className="w-16 border px-2 py-1 rounded bg-white" defaultValue={work.updated_at.getDate().toString().padStart(2, "0")} /> */}
          <span className="text-sm self-center">日</span>
        </div>

        <label className="block text-sm font-semibold mt-6 mb-1">商品ジャンル</label>
        <input className="w-full border px-3 py-2 rounded bg-white" defaultValue={work.product_number} />

        <label className="block text-sm font-semibold mt-6 mb-1">商品名</label>
        <input className="w-full border px-3 py-2 rounded bg-white" />

        <label className="block text-sm font-semibold mt-6 mb-1">受賞歴</label>
        <input className="w-full border px-3 py-2 rounded bg-white" />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">動画URL</label>
        <input className="w-full border px-3 py-2 rounded bg-white" />

        <div className="mt-6">
          <label className="block text-sm font-semibold mb-1">作品画像① サムネイル画像</label>
          <div className="flex gap-4 items-start">
            <div className="w-40 h-32 border rounded flex items-center justify-center bg-white">
              <UploadIcon size={24} />
            </div>
            <img src={work.thumbnail_url} alt="preview1" className="w-40 h-32 object-cover rounded" />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold mb-1">作品画像②</label>
          <div className="flex gap-4 items-start">
            <div className="w-40 h-32 border rounded flex items-center justify-center bg-white">
              <UploadIcon size={24} />
            </div>
            <img src={work.thumbnail_url} alt="preview2" className="w-40 h-32 object-cover rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};