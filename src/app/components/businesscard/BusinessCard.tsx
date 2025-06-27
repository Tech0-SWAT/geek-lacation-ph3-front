import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "./Tag";
import { BusinessCardProps } from "@/types/businesscard";

import {
  FaPhone,
  FaEnvelope,
  FaBuilding,
} from "react-icons/fa";

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch (err) {
    return false;
  }
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  uuid,
  name,
  furigana,
  image,
  personInfo,
  tags,
  date,
  fileType,
  title,
  work,
  inquiry_email,
  inquiry_phone,
  company,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [productUrl, setProductUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ログ出力で渡される props を確認
  console.log("BusinessCard props - image:", image, "work:", work);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // スタッフ画像の取得
  useEffect(() => {
    setImageUrl(null);
    if (!image) return;
    if (isValidUrl(image)) {
      setImageUrl(image);
      return;
    }
    const fetchBlobUrl = async () => {
      try {
        console.log("Fetching staff image for:", image);
        const res = await fetch(
          `/api/get_staff_imaga_by_azure_storage?fileName=${encodeURIComponent(image)}`
        );
        console.log("Staff image response status:", res.status);
        if (!res.ok) {
          throw new Error("Failed to fetch blob URL for staff image");
        }
        const data = await res.json();
        console.log("Staff image data:", data);
        setImageUrl(data.url);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchBlobUrl();
  }, [image]);

  // 商品画像の取得
  useEffect(() => {
    setProductUrl(null);
    if (!work) return;
    if (isValidUrl(work)) {
      console.log("isValidUrl work:", work);
      setProductUrl(work);
      return;
    }
    const fileName = work.endsWith(".jpg") ? work : work + ".jpg";
    console.log("Fetching product image(work) for:", fileName);
    const fetchBlobUrl = async () => {
      if(work){
        try {
          const res = await fetch(
            `/api/get_product_image_by_azure_storage?fileName=${encodeURIComponent(fileName)}`
            ,{cache:"no-store"});
          console.log("Product image response status:", res.status);
          if (!res.ok) {
            throw new Error("Failed to fetch blob URL for product image");
          }
          const data = await res.json();
          console.log("Product image data:", data);
          setProductUrl(data.url);
        } catch (err: any) {
          setError(err.message);
        }
      }
    };
    fetchBlobUrl();
  }, [work]);

  return (
    <div className="w-full max-w-md bg-white border border-gray-300 rounded-md shadow-sm overflow-hidden">
      {/* エラー表示（デバッグ用） */}
      {error && <div className="text-red-500">Error: {error}</div>}
      
      {/* 黒いバー */}
      <div className="bg-black w-full h-2" />
      <div className="p-5 flex flex-row items-start">
        {/* 左側: 顔写真＆タグ */}
        <div className="w-[120px]  flex flex-col items-start">
          <Link href={`/profile/${uuid}`}>
          <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden mb-4 cursor-pointer">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
          </Link>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Tag key={index} text={tag} />
              ))}
            </div>
          )}
        </div>
        {/* 右側: 名前＋連絡先 */}
        <div className="ml-4 flex flex-col items-start">
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <p className="text-xs text-gray-500 mb-9">{furigana}</p>
            <div className="flex items-center text-gray-700 mb-2">
            <FaBuilding className="inline-block w-5 mr-3 text-black" />
            <span className="text-[10px]">{company}</span>
          </div>
          <div className="flex items-center text-gray-700 mb-2">
          <FaPhone className="inline-block w-5 mr-3 text-black" />
            <span className="text-[12px]">{inquiry_phone}</span>
          </div>
          <div className="flex items-center text-gray-700">
          <FaEnvelope className="inline-block w-5 mr-3 text-black" />
            <span className="text-[10px]">{inquiry_email}</span>
          </div>
        </div>
      </div>
      {/* 仕切り線 */}
      <hr className="border-[#E2E2E2] mx-4" />
      {/* 下部: 作品画像＋タイトル・日付 */}
      <div className="px-4 py-4 mt-2 flex flex-col items-start">
        <div className="w-full h-auto mb-1 cursor-default">
          {productUrl ? (
            <Image
              src={productUrl}
              alt="作品画像"
              width={600}
              height={350}
              className="object-cover rounded-md"
              unoptimized
            />
          ) : (
            <div className="w-full h-[183px] bg-gray-200" />
          )}
        </div>
        <p className="text-left text-gray-800 text-[10px]  whitespace-pre-line">
          {title}
          <br />
          {date}
        </p>
      </div>
    </div>
  );
};
