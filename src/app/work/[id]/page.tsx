"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { BackHomeButtons } from "@/app/components/BackHomeButtons";
import Navbar from "@/app/components/Navbar";
import { DownloadPopup } from "@/app/components/profile/DownloadPopup";
import DownloadIcon from "@/app/components/icon/DownloadIcon";
import { InfoCard } from "@/app/components/InfoCard";

const WorkPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const [slides, setSlides] = useState([
    { id: 1, src: "/images/mountains-8375693_1280.jpg", isVideo: false },
    { id: 2, src: "/images/light-3176887_1280.jpg", isVideo: false },
    { id: 3, src: "/images/mountains-8375693_1280.jpg", isVideo: false },
    { id: 4, src: "/images/light-3176887_1280.jpg", isVideo: false },
  ]);

    const [showMore, setShowMore] = useState(false);
    const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  useEffect(() => {
    const fetchSlides = async () => {
      // 今後の拡張用: APIから取得
    };
    fetchSlides();
  }, [id]);

  const mockWork = {
    title: "サントリーホールディングス 企業 大人じゃん・06息子篇 60秒",
    categories: ["CM", "飲料（ソフトドリンク）"],
    tags: ["その他", "01_CM", "02_Youtube", "03_Youtube_デリバリー", "04_Twitter", "05_tiktok"],
    productCode: "25A165 サントリー新成人",
    deliveryDate: "2024/12/23",
    productName: "BOSS 無糖ブラック",
    client: "サントリーホールディングス株式会社",
    award: "2024年度 日本のアートディレクション ADC賞",
    shootingLocation: "長野県北安曇郡白馬村北城",
    productionMaterials: "カットデータ、カットシート、PPM"
  };

  return (
    <AuthGuard>
      <div className="w-full min-h-screen flex flex-col">
        <Navbar />
              <div className="bg-white py-4 px-8 lg:px-0">
        <BackHomeButtons />

              </div>

        <div className="bg-white px-24 pb-4">
          <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-5">
              {/* カテゴリバッジ */}
              <div className="flex gap-2 overflow-x-auto max-w-full whitespace-nowrap" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  {mockWork.categories.map((category, index) => (
                      <span
                          key={index}
                          className="bg-base-primary text-white text-xs px-6 py-1 rounded inline-block"
                      >
                          {category}
                      </span>
                  ))}
              </div>

              {/* タグバッジ */}
              <div className="flex gap-2 overflow-x-auto custom-scroll max-w-full whitespace-nowrap">
                  {mockWork.tags.map((tag, index) => (
                      <span
                          key={index}
                          className="min-w-[160px] border border-accent text-accent text-xs px-6 py-1 rounded-full flex justify-center inline-block"
                      >
                          {tag}
                      </span>
                  ))}
              </div>

              <h2 className="text-2xl font-bold text-left">{mockWork.title}</h2>
          </div>
      </div>

        <div className="flex flex-col items-center px-4">
          {/* カルーセル本体 */}
          <div className="w-full mx-auto flex items-center justify-center gap-4 px-4 h-auto">
            {/* 左矢印 */}
            <button
              onClick={() =>
                setCurrentSlideIndex(
                  currentSlideIndex > 0
                    ? currentSlideIndex - 1
                    : slides.length - 1
                )
              }
              className="z-10"
            >
              <svg
                width="32"
                height="155"
                viewBox="0 0 32 155"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.959 153.167L1.58399 77.5L29.959 1.83328"
                  stroke="#727272"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* スライド */}
            <div className="carousel w-full max-w-[1200px] h-full flex-1 mx-4">
{slides.map((slide, index) => (
    <div
      key={slide.id}
      className={`carousel-item w-full h-full aspect-video transition-all duration-500 ${
        index === currentSlideIndex ? "block animate-slide-in" : "hidden"
      }`}
    >
      {slide.isVideo ? (
        <video
          controls
          className="w-full h-full object-cover rounded-lg aspect-video"
          poster="/images/mountains-8375693_1280.jpg"
        >
          <source src={slide.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={slide.src}
          className="w-full h-full object-cover rounded-lg aspect-video"
          alt={`Slide ${slide.id}`}
        />
      )}
    </div>
))}

            </div>

            {/* 右矢印 */}
            <button
              onClick={() =>
                setCurrentSlideIndex((currentSlideIndex + 1) % slides.length)
              }
              className="z-10"
            >
              <svg
                width="32"
                height="155"
                viewBox="0 0 32 155"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.04297 1.83337L30.418 77.5L2.04297 153.167"
                  stroke="#727272"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* インジケータ */}
          <div className="flex space-x-3 z-10 p-6">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlideIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlideIndex ? "bg-black" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </div>

          {/* ダウンロードボタン */}
          <div className="flex justify-center w-full mb-16">
            <DownloadPopup
            position="bottom"
              icon={
                <button className="relative px-24 py-3 bg-accent text-white rounded flex items-center justify-center"
                  onClick={() => setShowDownloadPopup(true)}
                >
                    <span className="text-sx pr-12">Download</span>
                    <span className="absolute right-20">
                    <DownloadIcon size={20} className="mb-1 text-white" />
                    </span>
                </button>
              }
            />

          </div>

        {/* 背景はグレーに */}
        <div className="bg-[#F2F6F9] w-full pt-2 pb-4">
          <div className="max-w-7xl mx-auto px-24 text-sm text-black">

            {/* 作品情報詳細 */}
            <InfoCard
              enableToggle
              expandedContent={
                <>
                  <div className="divider px-6"/>
                  <div className="pt-2 px-12 space-y-4">
                      <p className="text-gray-400">Staff</p>
                      <div className="space-y-1 text-accent">
                          <div className="space-x-3 flex items-center">
                              <span className="w-[112px] text-right">Pr :</span>
                              <span className="font-medium underline">{"ユーザー名"}</span>
                          </div>
                          <div className="space-x-3 flex items-center">
                              <span className="w-[112px] text-right">PM :</span>
                              <span className="font-medium underline">{"ユーザー名"}</span>
                          </div>
                          <div className="space-x-3 flex items-center">
                              <span className="w-[112px] text-right">ディレクター :</span>
                              <span className="font-medium underline">{"ユーザー名"}</span>
                          </div>
                          <div className="space-x-3 flex items-center">
                              <span className="w-[112px] text-right">カメラマン :</span>
                              <span className="font-medium underline">{"ユーザー名"}</span>
                          </div>
                          <div className="space-x-3 flex items-center">
                              <span className="w-[112px] text-right">照明技師 :</span>
                              <span className="font-medium underline">{"ユーザー名"}</span>
                          </div>
                          <div className="space-x-3 flex items-center">
                              <span className="w-[112px] text-right">美術 :</span>
                              <span className="font-medium underline">{"ユーザー名"}</span>
                          </div>
                          <div className="space-x-3 flex items-center">
                              <span className="w-[112px] text-right">スタイリスト :</span>
                              <span className="font-medium underline">{"ユーザー名"}</span>
                          </div>
                          <div className="space-x-3 flex items-center">
                              <span className="w-[112px] text-right">ヘアメイク :</span>
                              <span className="font-medium underline">{"ユーザー名"}</span>
                          </div>
                          <div className="space-x-3 flex items-center">
                              <span className="w-[112px] text-right">カラリスト :</span>
                              <span className="font-medium underline">{"ユーザー名"}</span>
                          </div>
                          <div className="space-x-3 flex items-center">
                              <span className="w-[112px] text-right">ミキサー :</span>
                              <span className="font-medium underline">{"ユーザー名"}</span>
                          </div>
                          <div className="space-x-3 flex items-center">
                              <span className="w-[112px] text-right">音楽 :</span>
                              <span className="font-medium underline">{"ユーザー名"}</span>
                          </div>
                          <div className="space-x-3 flex items-center">
                              <span className="w-[112px] text-right">エディター :</span>
                              <span className="font-medium underline">{"ユーザー名"}</span>
                          </div>
                      </div>
                  </div>
                </>
              }
            >
              <div className="flex flex-col md:flex-row gap-6 px-12 pt-6 pb-4 grid grid-cols-1 md:grid-cols-2">
                <div className="flex-1 space-y-6">
                  <div className="space-y-2">
                      <p className="text-gray-400">Product Code</p>
                      <p className="font-medium">{mockWork.productCode}</p>
                  </div>
                  <div className="space-y-2">
                      <p className="text-gray-400">Delivery Date</p>
                      <p className="font-medium">{mockWork.deliveryDate}</p>
                  </div>
                  <div className="space-y-2">
                      <p className="text-gray-400">Product Name</p>
                      <p className="font-medium">{mockWork.productName}</p>
                  </div>
                  <div className="space-y-2">
                      <p className="text-gray-400">Client</p>
                      <p className="font-medium">{mockWork.client}</p>
                  </div>
                </div>
                <div className="flex-1 space-y-6">
                  <div className="space-y-2">
                      <p className="text-gray-400">Award</p>
                      <p className="font-medium">{mockWork.award}</p>
                  </div>
                  <div className="space-y-2">
                      <p className="text-gray-400">Shooting Location</p>
                      <p className="font-medium">{mockWork.shootingLocation}</p>
                  </div>
                  <div className="space-y-2">
                      <p className="text-gray-400">Production Materials</p>
                      <p className="font-medium">{mockWork.productionMaterials}</p>
                  </div>
                </div>
              </div>
            </InfoCard>
          </div>
        </div>

        <div className="flex mb-auto" />
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default WorkPage;
