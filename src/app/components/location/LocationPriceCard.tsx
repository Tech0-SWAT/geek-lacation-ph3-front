import { formatTimeRange, noDataPlaceholder } from "@/utils/format";
import { InfoCard } from "@/app/components/common/InfoCard";
import { locationTabLabels } from "../../types/location";

type LocationPriceCardProps = {
  data: any; // ここは実際のデータ型に合わせて調整してください
}

export const LocationPriceCard = ({
  data,
}: LocationPriceCardProps) => {
  return (
    <InfoCard
      headerContent={
        <h3 className="text-lg font-semibold relative right-1">{locationTabLabels["price"]}</h3>
      }
      useOutline={false}
    >
      <div className="text-accent py-4">
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">ムービー料金／h</span>
          <span className="break-all text-start">
            {data?.price_movie_h && data.price_movie_h > 0
              ? `¥${Number(data.price_movie_h).toLocaleString()}〜`
              : noDataPlaceholder}
          </span>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">ムービー料金／day</span>
          <span className="break-all text-start">
            {data?.price_movie_day && data.price_movie_day > 0
              ? `¥${Number(data.price_movie_day).toLocaleString()}〜`
              : noDataPlaceholder}
          </span>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">撮影可能時間</span>
          <span className="break-all text-start">{data?.available_time_from ? (
                    <span className="break-all text-end">
                      {formatTimeRange(data.available_time_from, data.available_time_to)}
                    </span>
                  ) : (
                    noDataPlaceholder
                  )}</span>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">広さ（屋内）</span>
          <span className="break-all text-start">{data?.area_sqm != null ? `${data.area_sqm}㎡` : noDataPlaceholder}</span>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">天上高</span>
          <span className="break-all text-start">{data?.ceiling_height ?? noDataPlaceholder}</span>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">備考</span>
          <span className="break-all text-start">{data?.remarks ?? noDataPlaceholder}</span>
        </div>

        <div className="my-4" />
      </div>
    </InfoCard>
  );
}