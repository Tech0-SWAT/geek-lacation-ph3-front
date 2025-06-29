import { LocationCarouselGroup } from "./LocationCarousel";

type LocationOverviewSectionProps = {
  data: any;
};

export const LocationOverviewSection = ({ data }: LocationOverviewSectionProps) => {
  // 指定した image_type の画像を抽出してCarousel用に整形
  const convertImages = (type: string) => {
    return (data?.images ?? [])
      .filter((img: any) => img.image_type === type)
      .map((img: any) => ({
        file_name: img.url
      }));
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col justify-start items-start px-8 gap-y-8 py-8">
      <LocationCarouselGroup title="ロケ地" data={convertImages("location")} />
      <LocationCarouselGroup title="アングル写真" data={convertImages("angle")} />
      <LocationCarouselGroup title="その他設備・搬入経路" data={convertImages("facility")} />
      <LocationCarouselGroup title="過去作品一覧" data={convertImages("pastwork")} />
    </div>
  );
};