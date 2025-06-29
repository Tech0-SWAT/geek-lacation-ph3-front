import { formatBooleanCircle, formatAvailable, formatNecessary, noDataPlaceholder } from "@/utils/format";
import { InfoCard } from "@/app/components/common/InfoCard";
import { locationTabLabels } from "../../types/location";

type LocationReviewCardProps = {
  data: any; // ここは実際のデータ型に合わせて調整してください
}

// LocationReviewCardコンポーネントは、Figmaのデザインにはありません。
export const LocationReviewCard = ({
  data,
}: LocationReviewCardProps) => {
  
  return (
    <InfoCard
      headerContent={
        <h3 className="text-lg font-semibold relative right-1">{locationTabLabels["review"]}</h3>
      }
      useOutline={false}
    >
      <div className="text-accent py-4">
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">評価</span>
          <span className="break-all text-start">{data?.review?.rating ?? noDataPlaceholder}</span>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">コメント</span>
          <div className="flex flex-col flex-grow">
            {Array.isArray(data?.review?.comment)
              ? (data.review.comment.length > 0
                  ? data.review.comment.map((comment: string, idx: number) => (
                      <span key={idx} className="break-all text-start">{comment}</span>
                    ))
                  : <span className="break-all text-start">{noDataPlaceholder}</span>
                )
              : <span className="break-all text-start">{data?.review?.comment ?? noDataPlaceholder}</span>
            }
          </div>
        </div>

        <div className="my-4" />
      </div>
    </InfoCard>
  );
}