import { formatBooleanCircle, formatAvailable, formatNecessary, formatTimeRange, noDataPlaceholder } from "@/utils/format";
import { InfoCard } from "@/app/components/common/InfoCard";
import { locationTabLabels } from "../../types/location";

type LocationOptionCardProps = {
  data: any; // 型定義があればより厳密に
};

export const LocationOptionCard = ({
  data,
}: LocationOptionCardProps) => {
  return (
    <InfoCard
      headerContent={
        <h3 className="text-lg font-semibold relative right-1">{locationTabLabels["option"]}</h3>
      }
      useOutline={false}
    >
      <div className="text-accent py-4">
        {/* 撮影機材 */}
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">撮影機材</span>
          <div className="flex flex-col flex-grow">
            <span className="break-all text-start">
              {data?.equipment?.price ? `＜${data.equipment.price}＞` : noDataPlaceholder}
            </span>
            <span className="break-all text-start">
              {data?.equipment?.kind ?? noDataPlaceholder}
            </span>
          </div>
        </div>

        <hr className="my-4" />

        {/* プール */}
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">プール</span>
          <div className="flex flex-col flex-grow">
            <span className="break-all text-start">
              {typeof data?.pool?.available === "boolean"
                ? formatAvailable(data.pool.available)
                : noDataPlaceholder}
            </span>
            {Array.isArray(data?.pool?.remark) && data.pool.remark.length > 0 ? (
              data.pool.remark.map((remark: string, idx: number) => (
                <span className="break-all text-start" key={idx}>
                  {"*" + remark}
                </span>
              ))
            ) : (
              ""
            )}
          </div>
        </div>

        <hr className="my-4" />

        {/* その他 */}
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">その他</span>
          <div className="flex flex-col flex-grow">
            {Array.isArray(data?.other) && data.other.length > 0 ? (
              data.other.map((item: string, idx: number) => (
                <span className="break-all text-start" key={idx}>
                  {item}
                </span>
              ))
            ) : (
              <span className="break-all text-start">{noDataPlaceholder}</span>
            )}
          </div>
        </div>

        <div className="my-4" />
      </div>
    </InfoCard>
  );
};