import { useState } from "react";
import { locationTabLabels, LocationTabType } from "../../types/location";
import { LocationPriceCard } from "./LocationPriceCard";
import { LocationEquipmentCard } from "./LocationEquipmentCard";
import { LocationOptionCard } from "./LocationOptionCard";
import { LocationAccessCard } from "./LocationAccessCard";
import { LocationReviewCard } from "./LocationReviewCard";

type LocationDetailInfoSectionProps = {
  data: any; // ここは実際のデータ型に合わせて調整してください
}

export const LocationDetailInfoSection = ({
  data,
}: LocationDetailInfoSectionProps) => {
  
  const [locationTab, setLocationTab] = useState<LocationTabType>('price');
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-start px-16 py-8 gap-8">
      {/* タブ選択 */}
      <div
        role="tablist"
        className="tabs tabs-boxed bg-[#f4f4f5] rounded-lg flex justify-center items-center w-full mb-2"
        style={{ minWidth: 0 }}
      >
        {Object.entries(locationTabLabels).map(([key, label]) => (
          <button
            key={key}
            role="tab"
            className={`tab flex flex-col items-center px-0 sm:px-6 py-4 text-xs flex-1 ${
              locationTab === key
            ? "bg-white text-accent"
            : "bg-transparent text-base-primary"
          }`}
          style={{ minWidth: 0 }}
          onClick={() => {
            setLocationTab(key as LocationTabType);
          }}
        >
          <span>
          {label}
          </span>
        </button>
        ))}
      </div>

      {/* 料金・時間・広さ */}
      {locationTab === "price" && (
        <LocationPriceCard data={data} />
      )}
      {/* 設備 */}
      {locationTab === "equipment" && data?.facility && (
        <LocationEquipmentCard data={{ ...data.facility, ...data }} />
      )}
      {/* オプション */}
      {locationTab === "option" && (
        <LocationOptionCard data={data} />
      )}
      {/* アクセス */}
      {locationTab === "access" && (
        <LocationAccessCard data={data} />
      )}
      {/* レビュー */}
      {locationTab === "review" && (
        <LocationReviewCard data={data} />
      )}
    </div>
  );
}