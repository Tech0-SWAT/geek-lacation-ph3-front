import { ReactNode, useState, useRef, useLayoutEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import ArrowDownRoundedIcon from "./icon/ArrowDownRoundedIcon";

type InfoCardProps = {
  headerContent?: ReactNode;
  headerClassName?: string;
  enableToggle?: boolean;
  children: ReactNode;
  expandedContent?: ReactNode;
};

export const InfoCard = ({
  headerContent,
  headerClassName = "",
  enableToggle = false,
  children,
  expandedContent,
}: InfoCardProps) => {
  const [showMore, setShowMore] = useState(false);
  const [maxHeight, setMaxHeight] = useState<string | number>("none");
  const expandRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!enableToggle || !expandRef.current) return;

    if (showMore) {
      const fullHeight = expandRef.current.scrollHeight;
      setMaxHeight(fullHeight);
    } else {
      setMaxHeight(0);
    }
  }, [showMore, enableToggle]);

  return (
    <div className="my-8 bg-white shadow rounded max-w-5xl w-full mx-auto border border-base-primary">
      {/* ヘッダー */}
      <div
        className={`w-full h-12 rounded-t flex items-center justify-start pl-9 pr-4 ${headerClassName}`}
        style={{
          background: "linear-gradient(to right, #f2f2f2 0%, #d2d2d3 100%)",
        }}
      >
        {headerContent ?? null}
      </div>

      {/* 常に表示される内容 */}
      <div className="px-8 py-6">{children}</div>

      {/* 展開時のみ表示される追加内容（アニメーション付き） */}
      {expandedContent && (
        <div
          ref={expandRef}
          className="px-8 overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: enableToggle ? maxHeight : "none",
          }}
        >
          <div className="py-6">{expandedContent}</div>
        </div>
      )}

      {/* show more / less トグル */}
      {enableToggle && expandedContent && (
        <div className="text-center py-4">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-base-primary hover:text-accent text-xs flex items-center justify-center mx-auto gap-2"
          >
            <ArrowDownRoundedIcon
            size={18}
              className={`text-sm transition-transform ${showMore ? "rotate-180" : ""}`}
            />
            {showMore ? "show less" : "show more"}
          </button>
        </div>
      )}
    </div>
  );
};
