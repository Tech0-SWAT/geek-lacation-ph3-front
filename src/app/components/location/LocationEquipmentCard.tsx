import { formatBooleanCircle, formatAvailable, formatNecessary, formatTimeRange, noDataPlaceholder } from "../../../utils/format";
import { InfoCard } from "@/app/components/common/InfoCard";
import { locationTabLabels, LocationTabType } from "../../types/location";

type LocationEquipmentCardProps = {
  data: {
    parking?: { count?: number; available?: boolean };
    elevator?: { available?: boolean };
    kitchen?: { available?: boolean };
    makeup_room?: { available?: boolean; remark?: string };
    protection?: string;
    electricity_capacity?: { capacity?: string; remark?: string };
    power_supply?: boolean;
    generator?: boolean;
    lighting_outside?: { available?: boolean; remark?: string };
    recording?: { available?: boolean; remark?: string };
    internet?: { wifi?: boolean; wired?: boolean; available?: boolean };
    remark?: string;
  }
}

export const LocationEquipmentCard = ({
  data,
}: LocationEquipmentCardProps) => {
  return (
    <InfoCard
      headerContent={
        <h3 className="text-lg font-semibold relative right-1">{locationTabLabels["equipment"]}</h3>
      }
      useOutline={false}
    >
      <div className="text-accent py-4">
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">駐車場</span>
          <div className="flex flex-col flex-grow">
            <span className="break-all text-start">{data?.parking?.count ? data?.parking?.count + "台" : noDataPlaceholder}</span>
            <span className="break-all text-start">{data?.parking?.available !== undefined ? formatBooleanCircle(data?.parking?.available) : noDataPlaceholder}</span>
          </div>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">エレベーター</span>
          <span className="break-all text-start">{data?.elevator?.available !== undefined ? formatBooleanCircle(data?.elevator?.available) : noDataPlaceholder}</span>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">キッチン</span>
          <span className="break-all text-start">{data?.kitchen?.available !== undefined ? formatBooleanCircle(data?.kitchen?.available) : noDataPlaceholder}</span>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">メイクルーム</span>
          <div className="flex flex-col flex-grow">
            <span className="break-all text-start">{data?.makeup_room?.available !== undefined ? formatBooleanCircle(data?.makeup_room?.available) : noDataPlaceholder}</span>
            <span className="break-all text-start">{data?.makeup_room?.remark ? "*" + data?.makeup_room?.remark : ""}</span>
          </div>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">養生</span>
          <span className="break-all text-start">{data?.protection ? formatNecessary(data?.protection) : noDataPlaceholder}</span>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">電気容量</span>
          <div className="flex flex-col flex-grow">
            <span className="break-all text-start">{data?.electricity_capacity?.capacity ?? noDataPlaceholder}</span>
            <span className="break-all text-start">{data?.electricity_capacity?.remark ? "*" + data?.electricity_capacity?.remark : ""}</span>
          </div>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">電源車</span>
          <span className="break-all text-start">{data?.power_supply !== undefined ? formatBooleanCircle(data?.power_supply) : noDataPlaceholder}</span>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">発電機</span>
          <span className="break-all text-start">{data?.generator !== undefined ? formatBooleanCircle(data?.generator) : noDataPlaceholder}</span>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">照明外打ち</span>
          <div className="flex flex-col flex-grow">
            <span className="break-all text-start">{data?.lighting_outside?.available !== undefined ? formatAvailable(data?.lighting_outside?.available) : noDataPlaceholder}</span>
            <span className="break-all text-start">{data?.lighting_outside?.remark ? "*" + data?.lighting_outside?.remark : ""}</span>
          </div>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">同録</span>
          <div className="flex flex-col flex-grow">
            <span className="break-all text-start">{data?.recording?.available !== undefined ? formatAvailable(data?.recording?.available) : noDataPlaceholder}</span>
            <span className="break-all text-start">{data?.recording?.remark ? "*" + data?.recording?.remark : ""}</span>
          </div>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">インターネット</span>
          <div className="flex flex-col flex-grow">
            <span className="break-all text-start">{data?.internet?.wifi !== undefined ? formatBooleanCircle(data?.internet?.wifi) : noDataPlaceholder}</span>
            <span className="break-all text-start">{data?.internet?.wired !== undefined ? formatBooleanCircle(data?.internet?.wired) : noDataPlaceholder}</span>
          </div>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">備考</span>
          <span className="break-all text-start">{data?.remark ?? noDataPlaceholder}</span>
        </div>

        <div className="my-4" />
      </div>
    </InfoCard>
  );
};
