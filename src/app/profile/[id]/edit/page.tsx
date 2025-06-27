"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Pagination } from "@/app/components/Pagination";
import Footer from "@/app/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { InfoCard } from "@/app/components/InfoCard";
import { RelatedWorkForm } from "@/app/components/profile/RelatedWorkForm";
import CloseIcon from "@/app/components/icon/CloseIcon";
import EditIcon from "@/app/components/icon/EditIcon";
import SaveIcon from "@/app/components/icon/SaveIcon";
import Navbar from "@/app/components/Navbar";
import { fetchCreatorDetail, fetchRelatedWorks } from "@/app/api/profile/api";
import { CreatorData, RelatedWork } from "@/app/types/types";
import { LoadingScreen } from "@/app/components/Loading";
import { PersonImage } from "@/app/components/SkeletonImage";

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch (err) {
    return false;
  }
}

export default function ProfileEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [profile, setProfile] = useState<CreatorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [externalRelatedWorks, setExternalRelatedWorks] = useState<Array<RelatedWork>>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSaveClick = () => {
    setIsSaved(true);

    if (window.innerWidth < 1024) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } else {
      setShowToast(false);
    }

    setTimeout(() => setIsSaved(false), 2000);
  };

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetchCreatorDetail(id);
        setProfile(res || null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          console.warn("❌ creatorId がありません。処理を中断します");
          return;
        }

        const result = await fetchRelatedWorks({
          creator_id: id,
          limit: itemsPerPage,
          page: currentPage,
          internal_matter: false,
          sort: "name_asc",
        });

        setExternalRelatedWorks(result.related_works);
        console.log("外部作品の取得結果:", result.related_works);
      } catch (error) {
        console.error("❌ データ取得中にエラーが発生しました:", error);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchData();
  }, [id, currentPage]);

  if (loading) return <LoadingScreen />;
  if (error) return <div>Error: {error}</div>;

  const totalWorks = profile.relatedworks?.length || 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWorks = profile.relatedworks?.slice(startIndex, endIndex);

  return (
    <AuthGuard>
      <div className="w-full">
        {/* 上部セクション */}
        <div className="bg-white py-4 px-8 lg:px-12">
          <div className="bg-white px-12 py-4 text-accent">
            <Navbar />
            <div className="max-w-7xl mx-auto flex justify-between items-center pt-8">
              <button
                className="text-sm text-gray-700 flex items-center gap-1"
                onClick={() => router.back()}
                disabled={isSaved}
              >
                <CloseIcon />
                閉じる
              </button>

              {!isSaved && (
                <div className="bg-black text-white text-sm px-8 md:px-12 py-2 rounded-full flex items-center gap-2">
                  <EditIcon size={16} />
                  編集中
                </div>
              )}
              {isSaved && !showToast && (
                <div className="bg-progress text-white text-sm px-8 md:px-12 py-2 rounded-full flex items-center gap-2">
                  <EditIcon size={16} />
                  編集内容を保存しました
                </div>
              )}
              {isSaved && showToast && (
                <div className="bg-progress text-white text-sm px-8 md:px-12 py-2 rounded-full flex items-center gap-2">
                  <EditIcon size={16} />
                  編集済
                </div>
              )}

              <button
                className="border border-gray-400 text-sm px-6 py-1 rounded flex items-center gap-2 text-gray-800"
                onClick={handleSaveClick}
                disabled={isSaved}
              >
                <SaveIcon size={20} />
                保存
              </button>
            </div>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start p-4 gap-4">
            <div className="mb-12 mr-4 gap-5 flex flex-col">
              <div className="relative w-[360px] h-[360px] mb-4 md:mb-0 shrink-0">
                <PersonImage
                  file_name={profile?.creator?.file_name}
                  gender={profile?.creator?.gender}
                  alt="プロフィール写真"
                  width={360}
                  height={360}
                  className="object-cover rounded-lg w-full h-full"
                />
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex flex-row items-center">
                <h1 className="text-4xl text-black mr-3">{profile.creator.name}</h1>
                {profile.creator.name_furigana && (
                  <h2 className="text-sm text-black mx-2 mt-3">{profile.creator.name_furigana}</h2>
                )}
              </div>

              <InfoCard headerContent={<h2 className="text-xl font-semibold text-accent">Profile</h2>}>
                <div className="space-y-4">
                  <h3 className="font-semibold mb-1 px-1 text-black">経歴</h3>
                  <textarea
                    defaultValue={profile.creator.bio}
                    minLength={6}
                    className="w-full min-h-[140px] border border-gray-300 px-3 py-2 rounded custom-scroll text-sm text-black bg-white"
                  />
                </div>
              </InfoCard>
            </div>
          </div>
        </div>

        {/* Related Works セクション */}
        <div className="bg-[#F2F6F9] w-full pt-8 pb-2">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="w-full py-10 px-8 lg:px-12 text-accent">
              <div className="flex flex-col gap-12">
                {currentWorks.map((work, index) => (
                  <RelatedWorkForm key={index} work={work} />
                ))}
              </div>
              {totalWorks > itemsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalItems={totalWorks}
                  itemsPerPage={itemsPerPage}
                  startItem={startIndex + 1}
                  endItem={Math.min(endIndex, totalWorks)}
                  onPrevious={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  onNext={() => setCurrentPage((p) => p + 1)}
                />
              )}
            </div>
          </div>
        </div>

        {/* 編集履歴 */}
        <div className="p-4 p-16">
          <InfoCard headerContent={<h2 className="text-xl font-semibold text-accent md:ml-4">編集履歴</h2>}>
            <div className="overflow-x-auto custom-scroll">
              <div className="max-h-[300px] overflow-y-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead className="sticky top-0 bg-white z-10">
                    <tr className="text-left border-b border-base-primary">
                      <th className="pl-12 py-2">編集者</th>
                      <th className="pl-12 py-2">対象項目</th>
                      <th className="px-12 py-2">更新日</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* 編集履歴の行はここに追加 */}
                  </tbody>
                </table>
              </div>
            </div>
          </InfoCard>
        </div>

        <div className="py-4" />
        <Footer />
      </div>
    </AuthGuard>
  );
}
