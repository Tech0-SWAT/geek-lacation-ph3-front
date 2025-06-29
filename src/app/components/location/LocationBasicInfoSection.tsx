import { formatPhoneNumber, formatTimeRange, noDataPlaceholder } from "@/utils/format";
import { InfoCard } from "../common/InfoCard";
import CameraIcon from "../icon/CameraIcon";
import MovieIcon from "../icon/MovieIcon";
import { SkeletonImage } from "../common/SkeletonImage";
import ClockIcon from "../icon/ClockIcon";
import HomeFillIcon from "../icon/HomeFillIcon";
import TrainIcon from "../icon/TrainIcon";
import HomepageIcon from "../icon/HomepageIcon";
import PlusIcon from "../icon/PlusIcon";
import DownloadIcon from "../icon/DownloadIcon";
import CarouselArrowIcon from "../icon/CarouselArrowIcon";

type LocationBasicInfoSectionProps = {
  data: any; // ここは実際のデータ型に合わせて調整してください
}

export const LocationBasicInfoSection = ({
  data,
}: LocationBasicInfoSectionProps) => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-start px-8 gap-8">
      {/* 上部セクション */}
      <div className="flex flex-col md:flex-row items-start gap-8 w-full">
        <div className="flex flex-row items-center xl:min-w-[600px]">
          <CarouselArrowIcon className="shrink-0 relative -right-6 z-10 text-white" />
          <SkeletonImage
            src={
              data?.images && data.images.length > 0
                ? data.images[0].url  // 1枚目の画像URLを使う
                : "/images/no-image.png"
            }
            alt="ロケーション画像"
            width={600}
            height={0}
          />
          <CarouselArrowIcon className="shrink-0 relative rotate-180 right-6 z-10 text-white" />
        </div>
        {/* 右側の画像セクション */}
        <div className="flex flex-col w-full items-start gap-3 md:gap-4 text-accent">
          <InfoCard
            headerContent={<h2 className="text-xl font-semibold">Basic info</h2>}
          >
            <div className="flex flex-col xl:flex-row md:items-start md:gap-6 mb-12">
              {/* 左側 */}
              <div className="flex-1">
                {/* 電話番号 */}
                <div className="flex flex-row items-center gap-4 mb-1">
                  <span className="font-semibold">TEL:</span>
                  {data?.tel ? (
                    <span className="font-semibold text-xl underline">{formatPhoneNumber(data.tel)}</span>
                  ) : (
                    noDataPlaceholder
                  )}
                </div>

                {/* メールアドレス */}
                <div className="flex flex-row items-start gap-4 font-normal">
                  <span>MAIL:</span>
                  {data?.mail ? (
                    <span className="text-xl underline">{data.mail}</span>
                  ) : (
                    noDataPlaceholder
                  )}
                </div>

                {/* 担当者 */}
                <div className="flex flex-row items-start gap-4 font-normal">
                  <span>担当:</span>
                  {data?.contact_name ? (
                    <span className="text-xl underline">{data.contact_name}</span>
                  ) : (
                    noDataPlaceholder
                  )}
                </div>

              </div>
              {/* 右側ボタン類 */}
              <div className="mt-4 md:mt-0 md:w-[160px] flex flex-col gap-2 shrink-0">
                <button className="flex w-fit items-center gap-4 px-4 py-1.5 bg-white border border-base-primary text-accent font-semibold rounded">
                  <PlusIcon size={16} className="inline shrink-0"/>
                  お気に入り
                </button>
                <button className="flex w-fit items-center gap-4 px-4 py-1.5 bg-accent border border-accent text-white rounded">
                  Download
                  <DownloadIcon size={20} className="relative -top-0.5 shrink-0"/>
                </button>
              </div>
            </div>

            <div className="text-accent">
              <div className="flex items-start gap-4 px-1 text-sm">
                <div className="flex items-center gap-4 shrink-0">
                  <CameraIcon size={20} className="inline"/>
                  <span className="font-semibold">ムービー／h</span>
                </div>
                <div className="flex flex-grow" />
                <span className="break-all text-end">{data?.price_movie_h ?? noDataPlaceholder}</span>
              </div>

              <hr className="my-4" />
              <div className="flex items-start gap-4 px-1 text-sm">
                <div className="flex items-center gap-4 shrink-0">
                  <MovieIcon size={20} className="inline"/>
                  <span className="font-semibold">ムービー／day</span>
                </div>
                <div className="flex flex-grow" />
                <span className="break-all text-end">{data?.price_movie_day ?? noDataPlaceholder}</span>
              </div>

              <hr className="my-4" />
              <div className="flex items-start gap-4 px-1 text-sm">
                <div className="flex items-center gap-4 shrink-0">
                  <ClockIcon size={20} className="inline"/>
                  <span className="font-semibold">撮影可能時間</span>
                </div>
                <div className="flex flex-grow" />
                {data?.available_time_from ? (
                    <span className="break-all text-end">
                      {formatTimeRange(data.available_time_from, data.available_time_to)}
                    </span>
                  ) : (
                    noDataPlaceholder
                  )}
              </div>

              <hr className="my-4" />
              <div className="flex items-start gap-4 px-1 text-sm">
                <div className="flex items-center gap-4 shrink-0">
                  <HomeFillIcon size={20} className="inline"/>
                  <span className="font-semibold">住所</span>
                </div>
                <div className="flex flex-grow" />
                <span className="break-all text-end">{data?.address ?? noDataPlaceholder}</span>
              </div>

              <hr className="my-4" />
              <div className="flex items-start gap-4 px-1 text-sm">
                <div className="flex items-center gap-4 shrink-0">
                  <TrainIcon size={20} className="inline"/>
                  <span className="font-semibold">アクセス</span>
                </div>
                <div className="flex flex-grow" />
                <span className="break-all text-end">{data?.access_info ?? noDataPlaceholder}</span>
              </div>

              <hr className="my-4" />
              <div className="flex items-start gap-4 px-1 text-sm">
                <div className="flex items-center gap-4 shrink-0">
                  <HomepageIcon size={20} className="inline"/>
                  <span className="font-semibold">HP</span>
                </div>
                <div className="flex flex-grow" />
                <span className="break-all text-end">{data?.hp_url ?? noDataPlaceholder}</span>
              </div>
              <div className="my-4" />
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
}