import { formatBooleanCircle, formatAvailable, formatNecessary, noDataPlaceholder } from "@/utils/format";
import { InfoCard } from "@/app/components/common/InfoCard";
import { locationTabLabels } from "../../types/location";
import { CarouselGroup } from "../common/CarouselGroup";
import { SkeletonImage } from "../common/SkeletonImage";
import { GoogleMapView } from "../common/GoogleMapView";

type LocationAccessCardProps = {
  data: any; // ここは実際のデータ型に合わせて調整してください
}



export const LocationAccessCard = ({
  data,
}: LocationAccessCardProps) => {
  // ロケ地MAP
  const mapImages = data?.images?.filter((img: any) => img.image_type === "map") || [];

  // ロケ地MAP画像
  const floorPlans = data?.images?.filter((img: any) => img.image_type === "plan") || [];

  return (
    <InfoCard
      headerContent={
        <h3 className="text-lg font-semibold relative right-1">{locationTabLabels["access"]}</h3>
      }
      useOutline={false}
    >
      <div className="text-accent py-4">
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">住所</span>
          <div className="flex flex-col flex-grow">
            <span className="break-all text-start">{data?.address ?? noDataPlaceholder}</span>
          </div>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">アクセス</span>
          <div className="flex flex-col flex-grow">
            {Array.isArray(data?.access) && data.access.length > 0
              ? data.access.map((remark: string, idx: number) => (
                  <span className="break-all text-start" key={idx}>
                    {remark}
                  </span>
                ))
              : noDataPlaceholder}
            </div>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">平面図</span>
          <CarouselGroup>
            {floorPlans.length > 0 ? (
              floorPlans.map((item: any, idx: number) => {
                const isPdf = item.url?.toLowerCase().endsWith(".pdf");
                return isPdf ? (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm"
                  >
                    平面図（PDF）を開く {idx + 1}
                  </a>
                ) : (
                  <SkeletonImage
                    key={idx}
                    src={item.url ?? "/images/no_image.png"}
                    alt={`Floor plan ${idx + 1}`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                );
              })
            ) : (
              <span className="text-gray-500">{noDataPlaceholder}</span>
            )}
          </CarouselGroup>
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">ロケ地MAP</span>
          <CarouselGroup>
            {mapImages.length > 0 ? (
              mapImages.map((item: any, idx: number) => {
                const isPdf = item.url?.toLowerCase().endsWith(".pdf");
                return isPdf ? (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm"
                  >
                    ロケ地MAP（PDF）を開く {idx + 1}
                  </a>
                ) : (
                  <SkeletonImage
                    key={idx}
                    src={item.url ?? "/images/no_image.png"}
                    alt={`Location map ${idx + 1}`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                );
              })
            ) : (
              <span className="text-gray-500">{noDataPlaceholder}</span>
            )}
          </CarouselGroup>
        </div>

        <div className="my-4">
          <GoogleMapView lat={data?.latitude} lng={data?.longitude} />
        </div>

        <hr className="my-4" />
        <div className="flex items-start gap-4 px-1 text-sm">
          <span className="font-semibold break-all w-36 shrink-0">近隣ロケ地</span>
          <CarouselGroup>
            {Array.isArray(data?.nearby_locations) && data.nearby_locations.length > 0
              ? data.nearby_locations.map((item: string, idx: number) => (
                <SkeletonImage
                key={idx}
                src={item ?? "/images/no_image.png"}
                alt={`Nearby location ${idx + 1}`}
                className="w-32 h-32 object-cover rounded-lg"
                />
              ))
              : <span className="text-gray-500">{noDataPlaceholder}</span>}
          </CarouselGroup>
        </div>

        <div className="my-4" />
      </div>
    </InfoCard>
  );
}