"use client";
import { useState, useRef, useEffect } from "react";
import InfoCircleIcon from "../icon/InfoCircleIcon";

type PopupPosition =
  | "top-left"
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "left";

const useIsSmallScreen = (maxWidth = 1024): boolean => {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const check = () => setIsSmall(window.innerWidth < maxWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [maxWidth]);

  return isSmall;
};

type InfoPopupProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  position?: PopupPosition;
  minWidth?: string;
  maxWidth?: string;
  maxHeight?: string;
  showCloseButton?: boolean;
  className?: string;
  backgroundColor?: string; // ← 背景色指定を追加
};

export const InfoPopup = ({
  children,
  icon = <InfoCircleIcon size={28} />,
  position = "bottom",
  minWidth = "680px",
  maxWidth = "1024px",
  maxHeight = "400px",
  showCloseButton = true,
  className = "",
  backgroundColor = "white", // ← デフォルト白
}: InfoPopupProps) => {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const isModal = useIsSmallScreen();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const getPopupStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      minWidth: minWidth,
      maxWidth: maxWidth,
      maxHeight: maxHeight,
      boxShadow: "0 6px 24px rgba(30,30,30,0.25)",
      backgroundColor: backgroundColor, // ← 背景色適用
    };

    if (isModal) {
      return {
        ...base,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: "fixed",
        zIndex: 1001,
        width: "auto",
      };
    }

    switch (position) {
      case "top-left":
        return { ...base, bottom: "100%", left: "0" };
      case "top":
        return { ...base, bottom: "100%", left: "50%", transform: "translateX(-50%)" };
      case "top-right":
        return { ...base, bottom: "100%", right: "0" };
      case "right":
        return { ...base, left: "100%", top: "50%", transform: "translateY(-50%)" };
      case "bottom-right":
        return { ...base, top: "100%", right: "0" };
      case "bottom":
        return { ...base, top: "100%", left: "50%", transform: "translateX(-50%)" };
      case "bottom-left":
        return { ...base, top: "100%", left: "0" };
      case "left":
        return { ...base, right: "100%", top: "50%", transform: "translateY(-50%)" };
      default:
        return base;
    }
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="text-base-primary hover:text-accent focus:text-accent mt-1.5"
        onClick={() => setOpen((prev) => !prev)}
      >
        {icon}
      </button>

      {open && (
        <>
          {isModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setOpen(false)}
            />
          )}

          <div
            ref={popupRef}
            className={`${
              isModal ? "fixed" : "absolute"
            } z-[1001] text-accent rounded-xl shadow-xl py-4 px-4 overflow-y-auto transition-all custom-scroll ${className}`}
            style={getPopupStyle()}
          >
            {showCloseButton && (
              <button
                className="absolute top-2 right-4 text-gray-400 hover:text-gray-700"
                onClick={() => setOpen(false)}
                aria-label="閉じる"
                type="button"
              >
                &times;
              </button>
            )}
            {children}
          </div>
        </>
      )}
    </div>
  );
};
