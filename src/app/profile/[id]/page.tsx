"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Pagination } from "@/app/components/Pagination";
import GuaranteeSection from "@/app/components/profile/GuaranteeSection";
import Footer from "@/app/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { DropdownSelector } from "@/app/components/DropdownSelector";
import { SortDropdown } from "@/app/components/SortDropdown";
import { RelatedWorkCard } from "@/app/components/profile/RelatedWorkCard";
import { StaffCard } from "@/app/components/StaffCard";
import { occupationList } from "@/data/occupationData";
import { ProfileView } from "@/app/components/profile/ProfileView";
import { BackHomeButtons } from "@/app/components/BackHomeButtons";
import ProMovieIcon from "@/app/components/icon/ProMovieIcon";
import HumanIcon from "@/app/components/icon/HumanIcon";
import GridLayoutSolidIcon from "@/app/components/icon/GridLayoutSolidIcon";
import GridLayout3x2Icon from "@/app/components/icon/GridLayout3x2Icon";
import ArrowDownRoundedIcon from "@/app/components/icon/ArrowDownRoundedIcon";
import { fetchCreatorDetail, fetchRelatedStaffs, fetchRelatedWorks } from "@/app/api/profile/api";
import { CreatorData, RelatedStaff, RelatedWork } from "@/app/types/types";
import { InlineLoading, LoadingScreen } from "@/app/components/Loading";

function isValidUrl(value:string) {
  try {
    new URL(value);
    return true;
  } catch (err) {
    return false;
  }
}

type activeTabState = "internal" | "external" | "staff";
type gridViewType = "normal" | "expanded";

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<activeTabState>("internal");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const staffItemsPerPage = 10;
  const staffItemsPerPageExpanded = staffItemsPerPage * 2;

  const id = params.id as string; // id = creator_id に対応  
  const [profile, setProfile] = useState<CreatorData>(null);

  const [showGuarantee, setShowGuarantee] = useState(false);
  const [viewType, setViewType] = useState<gridViewType>("normal");
  const [selectedOccupation, setSelectedOccupation] = useState<string[]>([]);

  // ソートドロップダウン用の状態
  const sortOptionsWork = [
    { key: "name_desc", label: "名前順" },
    { key: "updated_asc", label: "最新順" },
  ];
    const sortOptionsStaff= [
    { key: "name_asc", label: "名前順" },
    { key: "updated_desc", label: "最新順" },
    { key: "matters_desc", label: "案件数順" },
  ];
  const [sortOption, setSortOption] = useState<string>("name_asc");

    // 新規RelatedSection
  const [internalRelatedWorks, setInternalRelatedWorks] = useState<RelatedWork[]>([]);
  const [externalRelatedWorks, setExternalRelatedWorks] = useState<RelatedWork[]>([]);
  const [relatedStaffs, setRelatedStaffs] = useState<RelatedStaff[]>([]);
  const [totalInternalWorks, setTotalInternalWorks] = useState(0);
  const [totalExternalWorks, setTotalExternalWorks] = useState(0);
  const [totalStaffs, setTotalStaffs] = useState(0);
  const [reloadRelated, setReloadRelated] = useState(false);
  const [loadingRelated, setLoadingRelated] = useState(false);  // Relatedセクション読み込み中

  // データ取得
  useEffect(() => {
    console.log("🌟 fetchProfile 開始");
    if (!id) {
      console.warn("❌ creatorId がありません。処理を中断します");
      return;
    }

    const fetchProfile = async () => {
      try {
        if (!id) {
          console.warn("❌ creatorId がありません。処理を中断します");
          return;
        }
        // プロフィール情報取得
        const res = await fetchCreatorDetail(id);
        setProfile(res || null);
        
        // グリッド用
        setTotalInternalWorks(res.relatedworks?.filter((work: RelatedWork) => work.internal_matter).length ?? 0);
        setTotalExternalWorks(res.relatedworks?.filter((work: RelatedWork) => !work.internal_matter).length ?? 0);
        setTotalStaffs(res.relatedstaff?.length ?? 0);

      } catch (err: any) {
        console.error("❌ データ取得エラー:", err);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log("✅ 全データロード完了");
      }
    };

    fetchProfile();
  }, [id]);

  // creatorId、currentPage が変わったときにリスト更新
  useEffect(() => {
    const fetchData = async () => {
      setLoadingRelated(true);

      try {
        if (!id) {
          console.warn("❌ creatorId がありません。処理を中断します");
          return;
        }

        if (activeTab === "internal") {
          // Geek作品の取得
          const result = await fetchRelatedWorks({
            creator_id: id,
            limit: itemsPerPage,
            page: currentPage,
            internal_matter: true,
            sort: sortOption,
          });
          setInternalRelatedWorks(result.related_works);
        } else if (activeTab === "external") {
          // 外部作品の取得
          const result = await fetchRelatedWorks({
            creator_id: id,
            limit: itemsPerPage,
            page: currentPage,
            internal_matter: false,
            sort: sortOption,
          });
          setExternalRelatedWorks(result.related_works);
        } else if (activeTab === "staff") {
          // スタッフ情報の取得
          const result = await fetchRelatedStaffs({
            creator_id: id,
            limit: staffItemsPerPage,
            page: currentPage,
            sort: sortOption,
          });
          setRelatedStaffs(result.related_staff);
        }
      } catch (error) {
        console.error("❌ データ取得中にエラーが発生しました:", error);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchData();
  }, [id, reloadRelated]);


  // useEffect(() => {
  //   if (scrollToRelated && !loading) {
  //     relatedSectionRef.current?.scrollIntoView({
  //       behavior: "auto",
  //       block: "start",
  //     });
  //     setScrollToRelated(false);
  //   }
  // }, [scrollToRelated, loading]);



  if (loading) return <LoadingScreen />;
  if (error) return <div>Error: {error}</div>;

  return (
    <AuthGuard>
      <div className="w-full">
      {/* 上部～Contact までは白背景 */}
      <div className="bg-white py-4 px-8 lg:px-12">
        {/* 戻るボタンとホームボタン */}
        <BackHomeButtons />
        {/* プロフィール　セクション */}
        <ProfileView creator={profile?.creator} comments={profile?.comments}/>
      </div>

      {/* 以下をグレー背景にする */}
      <div className="bg-[#F2F6F9] w-full pt-0 lg:pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-8">

          {/* Related Works セクション */}
          <div className="bg-[#F2F6F9] w-full pt-16">
            <div className="max-w-7xl mx-auto lg:px-8">
              <div className="mb-8">
                <div className="flex items-center">
                  {
                    activeTab === "staff" ? (
                      <h2 className="text-2xl lg:text-4xl lg:mr-12">Related Staff</h2>
                    ) : (
                      <h2 className="text-2xl lg:text-4xl lg:mr-12">Related Works</h2>
                    )
                  }
                  {activeTab !== "staff" && (
                    <span className="hidden lg:inline-block text-2xl text-white bg-accent rounded-full px-8 py-2">
                      <span className="mr-8">
                        {activeTab === "internal" && "Geek作品"}
                        {activeTab === "external" && "外部作品"}
                      </span>
                      <span>
                        {activeTab === "internal" && `${totalInternalWorks}件`}
                        {activeTab === "external" && `${totalExternalWorks}件`}
                      </span>
                    </span>
                  )}
                  {activeTab === "staff" && (
                    <div className="hidden lg:flex items-center gap-8">
                      <DropdownSelector
                        options={occupationList}
                        selected={selectedOccupation}
                        onSelect={(values) => {
                          setSelectedOccupation(values);
                          setCurrentPage(1); // 選択時にページをリセット
                          setReloadRelated(prev => !prev);
                        }}
                        placeholder="職種"
                      />
                      <span
                        className="text-sm text-progress max-w-[200px] overflow-x-auto custom-scroll whitespace-nowrap block"
                        style={{ scrollbarWidth: "thin" }}
                      >
                        {selectedOccupation.length > 0 && selectedOccupation.join(", ")}
                      </span>
                    </div>
                  )}
                  <div className="ml-auto">
                    {/* lgタブ */}
                    <div
                      role="tablist"
                      className="tabs tabs-boxed hidden lg:flex bg-white rounded-lg justify-center items-center"
                    >
                      {[
                        { key: "internal", label: (<>{'Geek'}<br />{'作品'}</>), icon: <ProMovieIcon size={24} className="mt-1 mr-4" /> },
                        { key: "external", label: (<>{'外部'}<br />{'作品'}</>), icon: <ProMovieIcon size={24} className="mt-1 mr-4" /> },
                        { key: "staff", label: "スタッフ", icon: <HumanIcon size={20} className="mr-1" /> },
                      ].map((tab) => (
                        <button
                          key={tab.key}
                          role="tab"
                          className={`tab flex flex-col items-center px-4 py-3 text-xs min-h-[44px] ${
                            activeTab === tab.key
                              ? "bg-accent text-white"
                              : "bg-white text-base-primary"
                          }`}
                          style={{ minWidth: 0 }}
                          onClick={() => {
                            setActiveTab(tab.key as activeTabState);
                            setCurrentPage(1); // タブ切り替え時にページをリセット
                            setReloadRelated(prev => !prev);
                          }}
                        >
                          <span className="mb-1 flex justify-center">{tab.icon}</span>
                          <span className={activeTab === tab.key ? "text-white" : "text-base-primary"}>
                            {tab.label}
                          </span>
                        </button>
                      ))}
                    </div>
                    {/* mdタブ */}
                    <div
                      role="tablist"
                      className="tabs tabs-boxed flex lg:hidden bg-white rounded-lg justify-center items-center"
                    >
                      {[
                        { key: "internal", label: '作品', icon: <ProMovieIcon size={24} className="mt-0.5 mr-2" /> },
                        // { key: "external", label: (<>{'外部'}<br />{'作品'}</>), icon: <TbMovie size={20} className="mr-2" /> },
                        { key: "staff", label: "スタッフ", icon: <HumanIcon size={20} className="mr-1" /> },
                      ].map((tab) => (
                        <button
                          key={tab.key}
                          role="tab"
                          className={`tab flex flex-col items-center px-3 py-3 text-xs ${
                            activeTab === tab.key
                              ? "bg-accent text-white"
                              : "bg-white text-base-primary"
                          }`}
                          onClick={() => {
                            setActiveTab(tab.key as activeTabState);
                            setCurrentPage(1); // タブ切り替え時にページをリセット
                            setReloadRelated(prev => !prev);
                          }}
                        >
                          <span className="mb-1 flex justify-center">{tab.icon}</span>
                          <span className={activeTab === tab.key ? "text-white" : "text-base-primary"}>
                            {tab.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="block lg:hidden py-4"/>
                <div className="hidden lg:flex py-6 justify-end items-center text-accent">
                  <button
                    className={`mr-4 ${viewType === "normal" ? "text-accent" : "text-base-primary"}`}
                    onClick={() => {
                      setViewType("normal");
                      setItemsPerPage(12);
                      setCurrentPage(1);
                      setReloadRelated(prev => !prev);
                    }}
                  >
                    <GridLayoutSolidIcon size={22} className="inline-block" />
                  </button>
                  <button
                    className={`mr-10 mt-1 ${viewType === "expanded" ? "text-accent" : "text-base-primary"}`}
                    onClick={() => {
                      setViewType("expanded");
                      setItemsPerPage(16);
                      setCurrentPage(1);
                      setReloadRelated(prev => !prev);
                    }}
                  >
                    <GridLayout3x2Icon size={28} className="inline-block" />
                  </button>
                  <div className="relative top-0.5">
                    <SortDropdown
                      options={activeTab === "staff" ? sortOptionsStaff : sortOptionsWork}
                      selected={sortOption}
                      onSelect={(option) => {
                        setSortOption(option);
                        setCurrentPage(1);
                        setReloadRelated(prev => !prev);
                      }}
                    />
                  </div>
                </div>

                {loadingRelated ? (
                  <div className="flex justify-center items-center py-4">
                    <InlineLoading />
                  </div>
                ) : (
                  <>
                    {/* Geek作品 */}
                    {activeTab === "internal" && (
                      <>
                        <div
                          className={`grid gap-6 justify-center ${
                            viewType === "expanded"
                              ? "[grid-template-columns:repeat(auto-fit,260px)]"
                              : "[grid-template-columns:repeat(auto-fit,360px)]"
                          }`}
                        >
                          {internalRelatedWorks?.map((work: any, i: number) => (
                            <RelatedWorkCard key={i} work={work} useTags expanded={viewType === "expanded"} />
                          ))}
                        </div>
                        {totalInternalWorks > itemsPerPage && (
                          <Pagination
                            currentPage={currentPage}
                            totalItems={totalInternalWorks}
                            itemsPerPage={itemsPerPage}
                            onPrevious={() => {
                              setCurrentPage((p) => Math.max(p - 1, 1))
                              setReloadRelated(prev => !prev);
                            }}
                            onNext={() => {
                              setCurrentPage((p) => p + 1)
                              setReloadRelated(prev => !prev);
                            }}
                          />
                        )}
                      </>
                    )}

                    {/* 外部作品 */}
                    {activeTab === "external" && (
                      <>
                        <div
                          className={`grid gap-6 justify-center ${
                            viewType === "expanded"
                              ? "[grid-template-columns:repeat(auto-fit,260px)]"
                              : "[grid-template-columns:repeat(auto-fit,360px)]"
                          }`}
                        >
                          {externalRelatedWorks?.map((work: any, i: number) => (
                            <RelatedWorkCard key={i} work={work} expanded={viewType === "expanded"}/>
                          ))}
                        </div>
                        {totalExternalWorks > itemsPerPage && (
                          <Pagination
                            currentPage={currentPage}
                            totalItems={totalExternalWorks}
                            itemsPerPage={itemsPerPage}
                            onPrevious={() => {
                              setCurrentPage((p) => Math.max(p - 1, 1))
                              setReloadRelated(prev => !prev);
                            }}
                            onNext={() => {
                              setCurrentPage((p) => p + 1)
                              setReloadRelated(prev => !prev);
                            }}
                          />
                        )}
                      </>
                    )}
          
                    {/* スタッフ情報 */}
                    {activeTab === "staff" && (
                      <div className="mb-8">
                        <div className="grid gap-6 justify-center [grid-template-columns:repeat(auto-fit,200px)]">
                          {/* スタッフカードの表示は必要に応じてここで追加 */}
                          {relatedStaffs &&
                            relatedStaffs
                              .filter((staff: RelatedStaff) =>
                                selectedOccupation.length > 0
                                  ? staff.occupations.some(
                                      (occ: any) => selectedOccupation.includes(occ.occupation_name)
                                    )
                                  : true
                              )
                              .slice(
                                (currentPage - 1) * (viewType === "expanded" ? staffItemsPerPageExpanded : staffItemsPerPage),
                                currentPage * (viewType === "expanded" ? staffItemsPerPageExpanded : staffItemsPerPage)
                              )
                              .map((staff: any, i: number) => (
                                <StaffCard key={i} staff={staff} />
                              ))}
                        </div>
                        {/* ページネーションもフィルタ後の件数で */}
                        {relatedStaffs &&
                          relatedStaffs.filter((staff: RelatedStaff) =>
                            selectedOccupation.length > 0
                              ? staff.occupations.some(
                                  (occ: any) => selectedOccupation.includes(occ.occupation_name)
                                )
                              : true
                          ).length > (viewType === "expanded" ? staffItemsPerPageExpanded : staffItemsPerPage) && (
                            <Pagination
                              currentPage={currentPage}
                              totalItems={totalStaffs}
                              itemsPerPage={viewType === "expanded" ? staffItemsPerPageExpanded : staffItemsPerPage}
                              onPrevious={() => {
                                setCurrentPage((p) => Math.max(p - 1, 1))
                                setReloadRelated(prev => !prev);
                              }}
                              onNext={() => {
                                setCurrentPage((p) => p + 1)
                                setReloadRelated(prev => !prev);
                              }}
                            />
                          )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div className="hidden lg:block">
        <div className="flex flex-col items-center mt-16 mb-8 w-full relative">
          <button
            onClick={() => setShowGuarantee(!showGuarantee)}
            className="px-14 py-1 border border-gray-400 rounded-full text-accent text-sm flex items-center gap-4 z-10 bg-white"
          >
            <span className="text-sm">
              <ArrowDownRoundedIcon size={18} className={`transition-transform duration-200 ${showGuarantee ? "rotate-180" : ""}`} />
            </span>
            ギャランティー
          </button>
          <hr className="absolute border-t border-gray-300 w-full mt-4 z-0" />
        </div>

        {/* ギャランティーセクション */}
        {showGuarantee && <GuaranteeSection creator={profile?.creator} relatedWorks={internalRelatedWorks} show={showGuarantee} />}
      </div>
      <Footer />
      </div>
    </AuthGuard>
  );
}



