import { act, useEffect, useState, useRef, useLayoutEffect } from "react";
import { InfoCard } from "../InfoCard";
import { Creator, RelatedWork } from "@/app/types/types";

type GuaranteeSectionProps = {
  creator: Creator;
  relatedWorks: Array<RelatedWork> | null;
  show: boolean;
}

const GuaranteeSection = ({ creator, relatedWorks, show }: GuaranteeSectionProps) => {
  const [maxHeight, setMaxHeight] = useState<string | number>(0);
  const expandRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!expandRef.current) return;
    const el = expandRef.current;

    if (show) {
      const fullHeight = el.scrollHeight;
      setMaxHeight(fullHeight);
    } else {
      const fullHeight = el.scrollHeight;
      setMaxHeight(fullHeight);
      void el.offsetHeight; // 強制 reflow
      setTimeout(() => {
        setMaxHeight(0);
      }, 20); // 微小な遅延でアニメーション有効化
    }
  }, [show]);

  const formatYen = (num: number): string => {
    if (num >= 1_0000_0000_0000) {
      const cho = Math.floor(num / 1_0000_0000_0000);
      const oku = Math.floor((num % 1_0000_0000_0000) / 100000000);
      const man = Math.floor((num % 100000000) / 10000);
      let result = `${cho}兆`;
      if (oku > 0) result += `${oku}億`;
      if (man > 0) result += `${man}万円`;
      else if (oku === 0) result += "円";
      return result;
    } else if (num >= 100000000) {
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
  };

  const [min, setMin] = useState(0);
  const [median, setMedian] = useState(0);
  const [average, setAverage] = useState(0);
  const [max, setMax] = useState(0);

  let medianRate = ((median - min) / (max - min)) * 100;
  const gradientStyle = {
    background: `linear-gradient(to right, #ffffff 0%, #222222 ${medianRate}%, #ffffff 100%)`
  };

  useEffect(() => {
    if (relatedWorks && relatedWorks.length > 0 && creator) {
      const minCost = Math.min(creator.min_transaction_amount ?? 0);
      const maxCost = Math.max(creator.max_transaction_amount ?? 0);
      const avgCost = relatedWorks.reduce((sum, work) => sum + work.transaction_amount, 0) / relatedWorks.length;
      const medianCost = relatedWorks.sort((a, b) => a.transaction_amount - b.transaction_amount)[Math.floor(relatedWorks.length / 2)].transaction_amount;

      setMin(minCost);
      setMedian(medianCost);
      setAverage(avgCost);
      setMax(maxCost);
    }
  });

  return (
    <div
      ref={expandRef}
      className="transition-all duration-500 ease-in-out overflow-hidden"
      style={{ maxHeight }}
    >
      <InfoCard headerContent={<h3 className="text-lg font-semibold relative right-1">ギャランティー</h3>}>
        <div className="mb-14 flex items-center gap-6 text-accent">
          <p className="text-xm font-bold">案件数</p>
          <div className="bg-accent text-white px-3 py-0.5 rounded-full text-xs">
            {relatedWorks?.length}件
          </div>
        </div>

        <div className="relative h-2 rounded-full mb-16 mx-8 shadow-md" style={gradientStyle}>
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

        <div className="text-accent max-h-[400px] overflow-y-auto custom-scroll">
          <h3 className="text-xm font-bold mb-8">案件リスト表示</h3>
          <div className="overflow-x-auto custom-scroll">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="text-left border-b border-base-primary">
                  <th className="pl-12 py-2">作品登録日</th>
                  <th className="pl-12 py-2">作品名</th>
                  <th className="px-12 py-2">費用</th>
                </tr>
              </thead>
              <tbody>
                {relatedWorks.map((deal, index) => (
                  <tr key={index} className="border-b border-base-primary">
                    <td className="pl-12 py-4 text-xs">{new Date(deal.updated_at).toLocaleDateString()}</td>
                    <td className="pl-12 py-4 text-xs">{deal.title}</td>
                    <td className="px-12 py-4 text-xs">{formatYen(deal.transaction_amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </InfoCard>
    </div>
  );
};

export default GuaranteeSection;
