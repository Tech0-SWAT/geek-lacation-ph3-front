import { act, useEffect, useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { TagBadge } from "../TagBadge";
import { InfoCard } from "../InfoCard";
import { InfoPopup } from "./InfoPopup";
import { DownloadPopup } from "./DownloadPopup";
import { Comment, Creator, CreatorData } from "@/app/types/types";
import ProhibitedIcon from "../icon/ProhibitedIcon";
import HomepageIcon from "../icon/HomepageIcon";
import InstagramIcon from "../icon/InstagramIcon";
import CompanyIcon from "../icon/CompanyIcon";
import DownloadIcon from "../icon/DownloadIcon";
import PhoneIcon from "../icon/PhoneIcon";
import MailIcon from "../icon/MailIcon";
import HumanIcon from "../icon/HumanIcon";
import FaxIcon from "../icon/FaxIcon";
import AddressIcon from "../icon/AddressIcon";
import SnsIcon from "../icon/SnsIcon";
import EditIcon from "../icon/EditIcon";
import DownloadRightIcon from "../icon/DownloadRightIcon";
import { useRouter } from "next/navigation";
import { formatPhoneNumber } from "@/utils/format";
import { PersonImage, SkeletonImage } from "../SkeletonImage";

type ProfileViewProps = {
  creator: Creator;
  comments: Array<Comment> | null;
};

export const ProfileView = ({ 
    creator, 
    comments 
}: ProfileViewProps) => {
  type activeTabState = "basic" | "price" | "private";
  type privateActiveTabState = "company" | "private";
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<activeTabState>("basic");
    const [privateActiveTab, setPrivateActiveTab] = useState<privateActiveTabState>("company");

    const getPhone = (contact: Creator["personal_contact"] | undefined | null) =>
    contact?.home_phone || contact?.mobile_phone || "N/A";

    const getCompanyPhone = (company: Creator["company"] | undefined | null) =>
    company?.contact_phone || "N/A";


  function formatYen(num: number): string {
    if (num >= 1_0000_0000_0000) { // 1兆
        const cho = Math.floor(num / 1_0000_0000_0000);
        const oku = Math.floor((num % 1_0000_0000_0000) / 100000000);
        const man = Math.floor((num % 100000000) / 10000);
        let result = `${cho}兆`;
        if (oku > 0) result += `${oku}億`;
        if (man > 0) result += `${man}万円`;
        else if (oku === 0) result += "円";
        return result;
    } else if (num >= 100000000) { // 1億
        const oku = Math.floor(num / 100000000);
        const man = Math.floor((num % 100000000) / 10000);
        let result = `${oku}億`;
        if (man > 0) result += `${man}万円`;
        else result += "円";
        return result;
    } else if (num >= 10000) {
        return `${Math.floor(num / 10000)}万円`;
    }
    return `${num}円`;
    }

    const min = creator?.min_transaction_amount ?? 0;
    const median = creator?.median_transaction_amount ?? 0;
    const average = creator?.avg_transaction_amount ?? 0;
    const max = creator?.max_transaction_amount ?? 0;

    // グラデーション中央を中央値に寄せる
    const medianRate = ((median - min) / (max - min)) * 100;
    const gradientStyle = {
        background: `linear-gradient(to right, #ffffff 0%, #222222 ${medianRate}%, #ffffff 100%)`
    };


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
    <div>
        <div className="max-w-6xl mx-auto flex flex-row items-start gap-6">
            {/* 左側 */}
            <div className="flex flex-col items-center">
                <div className="relative w-[180px] h-[180px] md:w-[240px] md:h-[240px] mb-4 shrink-0">
                    <PersonImage
                        file_name={creator?.file_name}
                        gender={creator?.gender}
                        alt="プロフィール写真"
                        width={180}
                        height={180}
                        className="object-cover rounded-lg w-full h-full"
                    />
                </div>
            </div>

            {/* 右側 */}
            <div className="mt-2 flex-1 md:ml-4">
                <div className="flex flex-col items-start gap-3 md:gap-4">
                    <div className="flex flex-col">
                        <h1 className="text-2xl md:text-4xl text-black">{creator?.name}</h1>
                        {creator?.name_furigana && (
                            <h2 className="text-sm text-black">{creator.name_furigana}</h2>
                        )}
                    </div>

                    {/* 職種タグ */}
                    <div className="flex flex-row gap-2 justify-start items-center">
                        {Array.isArray(creator?.occupations) && creator?.occupations.length > 0 && (
                            creator.occupations.map((occ: any, idx: number) => (
                                <TagBadge
                                    key={idx}
                                    label={occ.occupation_name}
                                    className="w-[160px] h-[24px] text-xs border rounded-full px-3 py-1 flex items-center justify-center"
                                />
                            ))
                        )}
                    </div>

                    <InfoPopup
                        minWidth="380px"
                        backgroundColor="#ffdddd"
                        icon={
                            <div
                                className="border border-error px-4 py-1 bg-white text-error text-xs rounded-full flex items-center gap-1.5 hover:bg-red-100"
                            >
                                <ProhibitedIcon size={16} className="text-error" />
                                <span className="text-[10px]">取引禁止</span>
                            </div>
                        }
                    >
                        <p className="p-4 text-sm text-error">{creator?.caution_reason}</p>
                    </InfoPopup>

                    <div className="flex flex-row gap-4 text-sm text-accent ml-3">
                        {creator?.portfolio_site && (
                            <a
                                href={creator.portfolio_site}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline break-all"
                            >
                                <HomepageIcon size={20} />
                            </a>
                        )}
                        {creator?.instagram && (
                            <a
                                href={creator.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline break-all"
                            >
                                <InstagramIcon size={20} />
                            </a>
                        )}
                        {creator?.sns_link && creator.sns_link.length > 0 && (
                            <a
                                href={creator.sns_link[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline break-all"
                            >
                                <CompanyIcon size={20} />
                            </a>
                        )}
                    </div>

                    <DownloadPopup
                        position="bottom-left"
                        icon={
                            <div className="px-7 py-2 bg-accent text-white rounded flex justify-center items-center"
                            >
                            <span className="text-sm underline mr-6">Profile Download</span>
                            <DownloadIcon size={20} className="text-white mb-1" />
                            </div>
                        }
                        />
                </div>
            </div>
        </div>
         <div
            role="tablist"
            className="tabs tabs-boxed bg-[#f4f4f5] rounded-lg flex justify-center items-center mt-8"
            style={{ minWidth: 0 }}
        >
            {[
            { key: "basic", label: "基本情報" },
            { key: "price", label: "費用" },
            { key: "private", label: "個人会社情報" },
            ].map((tab) => (
            <button
                key={tab.key}
                role="tab"
                className={`tab flex flex-col items-center px-6 py-4 text-xs flex-1 ${
                activeTab === tab.key
                    ? "bg-white text-accent"
                    : "bg-transparent text-base-primary"
                }`}
                style={{ minWidth: 0 }}
                onClick={() => {
                setActiveTab(tab.key as activeTabState);
                }}
            >
                <span>
                {tab.label}
                </span>
            </button>
            ))}
        </div>

        {/* BasicProfile タグ */}
        {activeTab === "basic" && (
            <InfoCard
                headerContent={<h3 className="text-lg font-semibold relative right-1">Profile</h3>}
            >
                {creator?.bio && (
                <div className="mb-12">
                    <p className="text-base-primary text-sm whitespace-pre-line">{creator.bio}</p>
                </div>
                )}
                <div className="flex items-center gap-4 px-1 text-sm">
                <CompanyIcon size={20} />
                <span className="text-xs">所属</span>
                <div className="flex flex-grow" />
                <span className="text-[10px]">{creator?.company?.company_name ?? "N/A"}</span>
                </div>
                <hr className="my-4" />
                <div className="flex items-center gap-4 px-1 text-sm">
                <PhoneIcon size={20} />
                <span className="text-xs">電話番号</span>
                <div className="flex flex-grow" />
                <span className="text-[10px]">{formatPhoneNumber(creator?.inquiry_contact?.inquiry_phone)}</span>
                </div>
                <hr className="my-4" />
                <div className="flex items-center gap-4 px-1 text-sm">
                <MailIcon size={20} />
                <span className="text-xs">メールアドレス</span>
                <div className="flex flex-grow" />
                <span className="text-[10px]">{creator?.inquiry_contact?.inquiry_email ?? "N/A"}</span>
                </div>
            </InfoCard>
            )}

        {activeTab === "price" && (
            <InfoCard
                headerContent={<h3 className="text-lg font-semibold relative right-1">費用</h3>}
            >
                <div className="pt-4 pb-20">
                    <div className="mb-14 flex items-center gap-6 text-accent">
                        <p className="text-xm font-bold">案件数</p>
                        <div className="bg-accent text-white px-3 py-1 rounded-full text-sm">
                            {34}件
                        </div>
                    </div>
                    <div className=" relative h-2 rounded-full shadow-md" style={gradientStyle}>
                    {[
                        { label: "最小", value: min, color: "bg-white" },
                        { label: "中央値", value: median, color: "bg-black" },
                        { label: "平均値", value: average, color: "bg-white" },
                        { label: "最大", value: max, color: "bg-white" },
                    ].map((point, index) => {
                        const range = max - min;
                        const innerMin = min + range * 0.02;
                        const innerMax = max - range * 0.02;
                        const left =
                        point.value === max ? "calc(100% - 2rem)" :
                        point.value === min ? "calc(0% + 0.5rem)" :
                        `calc(${((point.value - innerMin) / (innerMax - innerMin)) * 100}% - 1rem)`;
                        return (
                            <div
                                key={index}
                                className="absolute -top-8 flex flex-col items-center gap-2"
                                style={{ left }}
                            >
                            <div className="text-xs text-center mt-1 text-accent">{point.label}</div>
                            <div className={`w-4 h-4 rounded-full ${point.color} border border-base-primary`}></div>
                            <div className="text-xs text-center mt-1 text-accent">{formatYen(point.value)}</div>
                            </div>
                        );
                    })}
                    </div>
                </div>
            </InfoCard>
        )}
        {activeTab === "private" && (
            <InfoCard
                headerContent={
                    <div className="flex flex-row w-full items-center ">
                        <h3 className="text-lg font-semibold relative right-1">所属先情報</h3>
                        <div className="flex-grow" />
                        <div
                            role="tablist"
                            className="tabs tabs-boxed bg-transparent rounded-lg flex justify-center items-center"
                            style={{ minWidth: 0 }}
                        >
                            {[
                            { key: "company", label: "所属先", icon: <CompanyIcon size={16} /> },
                            { key: "private", label: "個人", icon: <HumanIcon size={16} /> },
                            ].map((tab) => (
                            <button
                                key={tab.key}
                                role="tab"
                                className={`tab flex flex-col items-center px-2 text-xs flex-1 ${
                                privateActiveTab === tab.key
                                    ? "bg-accent text-white"
                                    : "bg-transparent text-base-primary"
                                }`}
                                onClick={() => {
                                setPrivateActiveTab(tab.key as privateActiveTabState);
                                }}
                            >
                                <span className="flex items-center justify-center gap-2 px-1 min-w-[70px]">
                                {tab.icon}
                                {tab.label}
                                </span>
                            </button>
                            ))}
                        </div>
                    </div>
                }
            >
                {privateActiveTab === "company" && (
                <>
                    <div className="flex items-center gap-4 px-1 text-sm">
                        <CompanyIcon size={20} />
                        <span className="text-xs">所属</span>
                        <div className="flex flex-grow" />
                        <span className="text-[10px]">{creator?.company?.company_name ?? "N/A"}</span>
                    </div>
                    <hr className="my-4" />
                    {/* 会社電話番号 */}
                    <div className="flex items-center gap-4 px-1 text-sm">
                    <PhoneIcon size={20} />
                    <span className="text-xs">電話番号</span>
                    <div className="flex flex-grow" />
                    <span className="text-[10px]">{formatPhoneNumber(creator?.company?.contact_phone)}</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex items-center gap-4 px-1 text-sm">
                        <MailIcon size={20} />
                        <span className="text-xs">メールアドレス</span>
                        <div className="flex flex-grow" />
                        <span className="text-[10px]">{creator?.personal_contact?.personal_email ?? "N/A"}</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex items-center gap-4 px-1 text-sm">
                        <FaxIcon size={20} />
                        <span className="text-xs">FAX</span>
                        <div className="flex flex-grow" />
                        <span className="text-[10px]">{formatPhoneNumber(creator?.company?.contact_fax)}</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex items-center gap-4 px-1 text-sm">
                        <MailIcon size={20} />
                        <span className="text-xs">メールアドレス</span>
                        <div className="flex flex-grow" />
                        <span className="text-[10px]">{creator?.company?.contact_email ?? "N/A"}</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex items-center gap-4 px-1 text-sm">
                        <AddressIcon size={20} />
                        <span className="text-xs">住所</span>
                        <div className="flex flex-grow" />
                        <span className="text-[10px]">
                        {"〒"}{creator?.company?.com_postal_code ?? ""} {" "}
                        {creator?.company?.com_address ?? "N/A"}
                        </span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex items-center gap-4 px-1 text-sm">
                        <HomepageIcon size={20} />
                        <span className="text-xs">ホームページ</span>
                        <div className="flex flex-grow" />
                        <a
                        href={creator?.company?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-[10px]"
                        >
                        {creator?.company?.website}
                        </a>
                    </div>
                </>)}
                
                {privateActiveTab === "private" && (
                <>
                    {/* 個人連絡先（home or mobile） */}
                    <div className="flex items-center gap-4 px-1 text-sm">
                    <PhoneIcon size={20} />
                    <span className="text-xs">電話番号</span>
                    <div className="flex flex-grow" />
                    <span className="text-[10px]">{formatPhoneNumber(getPhone(creator?.personal_contact))}</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex items-center gap-4 px-1 text-sm">
                    <MailIcon size={20} />
                    <span className="text-xs">メールアドレス</span>
                    <div className="flex flex-grow" />
                    <span className="text-[10px]">{creator?.personal_contact?.personal_email ?? "N/A"}</span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex items-center gap-4 px-1 text-sm">
                    <AddressIcon size={20} />
                    <span className="text-xs">住所</span>
                    <div className="flex flex-grow" />
                    <span className="text-[10px]">
                        {creator?.addresses && creator?.addresses[0] && (
                            creator.addresses[0].postal_code ||
                            creator.addresses[0].state ||
                            creator.addresses[0].city ||
                            creator.addresses[0].address_line
                        )
                            ? `{"〒"}${creator.addresses[0].postal_code ?? ""} ${creator.addresses[0].state ?? ""}${creator.addresses[0].city ?? ""} ${creator.addresses[0].address_line ?? ""}`.trim()
                            : "N/A"}
                    </span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex items-center gap-4 px-1 text-sm">
                    <HomepageIcon size={20} />
                    <span className="text-xs">ホームページ</span>
                    <div className="flex flex-grow" />
                    <a
                        href={creator.portfolio_site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-[10px]"
                    >
                        {creator.portfolio_site}
                    </a>
                    </div>
                </>)}
            </InfoCard>
        )}
    </div>
    );
  }

    // Desktop 表示
    return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start p-4 gap-4">
        {/* 左側 */}
        <div className="mb-12 gap-5 flex flex-col">
        <div className="relative w-[360px] h-[360px] mb-4 md:mb-0 shrink-0">
            <PersonImage
                file_name={creator?.file_name}
                gender={creator?.gender}
                alt="プロフィール写真"
                width={180}
                height={180}
                className="object-cover rounded-lg w-full h-full"
            />
        </div>

        <div className="flex flex-row gap-4 text-sm text-accent justify-center">
            {Array.isArray(creator?.sns_link) && creator?.sns_link?.length > 0 && (
            <a
                href={creator.sns_link[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="underline break-all"
            >
                <CompanyIcon size={24} />
            </a>
            )}
            {creator?.portfolio_site && (
            <a
                href={creator.portfolio_site}
                target="_blank"
                rel="noopener noreferrer"
                className="underline break-all"
            >
                <HomepageIcon size={24} />
            </a>
            )}
            {creator?.instagram && (
            <a
                href={creator.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="underline break-all"
            >
                <SnsIcon size={24} />
            </a>
            )}
        </div>

        <DownloadPopup 
            position="bottom-left"
            icon={
            <div className="w-[360px] px-8 py-2 bg-accent text-white rounded flex justify-center items-center">
                <span className="text-sm underline mr-9">Profile Download</span>
                <DownloadIcon size={20} className="text-white mb-1" />
            </div>
            }
        />

        {creator?.portfolio_site && (
            <a
                href={creator.portfolio_site}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
            >
                <button className="w-full px-8 py-2 bg-accent text-white rounded flex justify-center items-center hover:opacity-90 transition">
                    <span className="text-sm underline mr-4">ポートフォリオサイト</span>
                    <DownloadRightIcon size={18} className="text-white" />
                </button>
            </a>
        )}

        </div>

        {/* 右側 */}
        <div className="mt-2 flex-1 md:ml-8">
        <div className="flex-1 mb-4">
            <div className="flex items-center mb-6">
            <h1 className="text-4xl text-black mr-3">{creator?.name}</h1>
            {creator?.name_furigana && (
                <h2 className="text-sm text-black mx-2 mt-3">{creator.name_furigana}</h2>
            )}
            <div className="flex gap-2">
                {/* 禁止 */}
                {creator?.caution && (
                <InfoPopup
                    position="bottom-right"
                    backgroundColor="#ffdddd"
                    maxWidth="400px"
                    minWidth="400px"
                    icon={
                    <div className="border border-error px-4 py-1.5 bg-white text-error text-xs rounded-full flex items-center gap-1.5 hover:bg-red-100">
                        <ProhibitedIcon size={20} className="text-error" />
                        <span className="text-[10px]">取引禁止</span>
                    </div>
                    }
                >
                    <p className="p-4 text-sm text-error">{creator.caution_reason}</p>
                </InfoPopup>
                )}
            </div>
            <div className="flex-grow" />
            <button
                className="px-4 py-1.5 border border-base-primary rounded hover:bg-gray-100 text-accent text-xs flex items-center gap-1"
                onClick={() => router.push(`/profile/${creator.creator_id}/edit/`)}
            >
                <EditIcon size={16} />
                <span className="ml-0.5 mt-0.5">編集</span>
            </button>
            </div>
        </div>

        {Array.isArray(creator?.occupations) && creator?.occupations.length > 0 && (
            <div className="flex flex-wrap gap-2 pb-4">
            {creator?.occupations.map((occ: any, idx: number) => (
                <TagBadge
                key={idx}
                label={occ.occupation_name}
                className="w-[240px] text-xm border rounded-full px-3 py-1"
                />
            ))}
            </div>
        )}

        {/* 電話番号を含む情報カード */}
        <ProfileCard creator={creator} comments={comments} />
        </div>
    </div>
    );
};
