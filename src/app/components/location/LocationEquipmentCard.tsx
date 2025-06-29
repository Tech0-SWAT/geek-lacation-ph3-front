import { InfoCard } from "@/app/components/common/InfoCard";
import { locationTabLabels } from "../../types/location";

type LocationEquipmentCardProps = {
  data: {
    has_parking?: boolean;
    elevator?: boolean | null;
    kitchen?: boolean;
    power_car?: boolean;
    protection?: boolean | null;
    electric_available?: boolean;
    electric_capacity?: string | null;
    special_equipment?: boolean;
    sound_recording_ok?: boolean;
    fire_usage?: boolean;
    extra_notes?: string | null;
    capacity?: number | null;
    payment_method?: string | null;
    remarks?: string | null;
  };
};

const displayBoolean = (val: boolean | null | undefined) => {
  if (val === true) return "あり";
  if (val === false) return "なし";
  return "不明";
};


export const LocationEquipmentCard = ({ data }: LocationEquipmentCardProps) => {
  return (
    <InfoCard
      headerContent={
        <h3 className="text-lg font-semibold relative right-1">{locationTabLabels["equipment"]}</h3>
      }
      useOutline={false}
    >
      <div className="text-accent py-4">
        {[
          { label: "ゼネ車の使用可否", value: displayBoolean(data?.power_car) },
          { label: "キッチン使用可否", value: displayBoolean(data?.kitchen) },
          { label: "同録の可否", value: displayBoolean(data?.sound_recording_ok) },
          { label: "養生の有無", value: displayBoolean(data?.protection) },
          { label: "電源の有無", value: displayBoolean(data?.electric_available) },
          { label: "駐車場の有無", value: displayBoolean(data?.has_parking) },
          { label: "特機の使用可否", value: displayBoolean(data?.special_equipment) },
          { label: "スモークの使用可否", value: "不明" }, // ダミー
          { label: "火器の使用可否", value: displayBoolean(data?.fire_usage) },
          {
            label: "使用可能人数",
            value: data?.capacity !== null && data?.capacity !== undefined
              ? `${data.capacity}人`
              : "不明",
          },
          {
            label: "支払い方法",
            value: data?.payment_method ?? "不明",
          },
          {
            label: "支払い備考",
            value: data?.remarks ?? "　",
          },
        ].map(({ label, value }, idx) => (
          <div key={idx}>
            <div className="flex items-start gap-4 px-1 py-3 text-sm">
              <span className="font-semibold break-all w-36 shrink-0">{label}</span>
              <span className="break-all text-start">{value}</span>
            </div>
            {idx !== 11 && <hr className="my-1" />}
          </div>
        ))}
      </div>
    </InfoCard>
  );
};