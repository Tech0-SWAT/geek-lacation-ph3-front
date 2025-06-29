"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";
import { BackHomeButtons } from "@/app/components/BackHomeButtons";
import { LoadingScreen } from "@/app/components/common/Loading";
import Navbar from "@/app/components/Navbar"
import { LocationBasicInfoSection } from "@/app/components/location/LocationBasicInfoSection";
import { LocationOverviewSection } from "@/app/components/location/LocationOverviewSection";
import { LocationDetailInfoSection } from "@/app/components/location/LocationDetailInfoSection";
import { TagBadgeButton } from "@/app/components/common/TagBadgeButton";

function isValidUrl(value:string) {
  try {
    new URL(value);
    return true;
  } catch (err) {
    return false;
  }
}

const LocationDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const id = params.id as string; // id = creator_id に対応  

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations/${id}`);
        if (!res.ok) throw new Error("ロケ地データの取得に失敗しました");
        const data = await res.json();
        setLocation(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "不明なエラーが発生しました");
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchLocationDetails();
    }
  }, [id]);

  if (loading) return <LoadingScreen />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full">
      <Navbar />
      <div className="bg-white py-4 px-8 lg:px-12">
        {/* 戻るボタンとホームボタン */}
        <BackHomeButtons />

        {/* ロケーションタグ　セクション */}
        <div className="max-w-7xl mx-auto flex flex-col justify-start items-start px-8 pb-8 gap-y-5">
          <h1 className="text-4xl font-bold text-accent">{location?.name ?? "ロケ地タイトル"}</h1>

          {/* このロケーション専用の仮タグ */}
          <div className="flex w-full items-start gap-4 overflow-x-auto custom-scroll"
            style={{ scrollbarWidth: "thin" }}
          >
            <div className="flex flex-wrap gap-2">
              {location.categories.map((tag, index) => (
              <TagBadgeButton key={index} label={tag} className="px-12 py-0.5" />
              ))}
            </div>
          </div>
        </div>

        {/* ロケーション基本情報　セクション */}
        <LocationBasicInfoSection data={location}/>
      </div>

      {/* ロケーション画像ギャラリーセクション */}
      <LocationOverviewSection data={location} />

      {/* ロケーション詳細セクション */}
      <LocationDetailInfoSection data={location} />
      
      <Footer />
    </div>
  );
}
export default LocationDetailsPage;