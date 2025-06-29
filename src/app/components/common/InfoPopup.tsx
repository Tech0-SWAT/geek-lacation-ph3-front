"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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

const usePopup = (onClose?: () => void, delay = 300) => {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const openPopup = useCallback(() => {
    setOpen(true);
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const closePopup = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setOpen(false);
      if (onClose) onClose();
    }, delay);
  }, [onClose, delay]);

  return { open, isVisible, openPopup, closePopup };
};

type InfoPopupProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  position?: PopupPosition;
  minWidth?: string;
  maxWidth?: string;
  maxHeight?: string;
  offsetX?: number;
  offsetY?: number;
  showCloseButton?: boolean;
  className?: string;
  backgroundColor?: string;
  disabled?: boolean;
  showForce?: boolean; // 強制的に表示するかどうか
};

export const InfoPopup = ({
  children,
  icon = <InfoCircleIcon size={28} />, 
  position = "bottom",
  minWidth = "680px",
  maxWidth = "1024px",
  maxHeight = "400px",
  offsetX = 0,
  offsetY = 0,
  showCloseButton = true,
  className = "",
  backgroundColor = "white",
  disabled = false,
  showForce = false,
}: InfoPopupProps) => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const isModal = useIsSmallScreen();
  const { open, isVisible, openPopup, closePopup } = usePopup();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (disabled) return;
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        closePopup();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (disabled) return;
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, closePopup, disabled]);

  useEffect(() => {
    if (!isModal) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : originalOverflow;
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isModal, open]);

    useEffect(() => {
    if (showForce) {
      openPopup();
    } else {
      closePopup();
    }
  }, [showForce, openPopup, closePopup]);


  const getPopupStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      minWidth: minWidth,
      maxWidth: maxWidth,
      maxHeight: maxHeight,
      boxShadow: "0 6px 24px rgba(30,30,30,0.25)",
      backgroundColor: backgroundColor,
      position: isModal ? "fixed" : "absolute",
    };

    if (isModal) {
      return {
        ...base,
        top: `calc(50% + ${offsetY}px)`,
        left: `calc(50% + ${offsetX}px)`,
        transform: "translate(-50%, -50%)",
        zIndex: 1001,
        width: "auto",
      };
    }

    switch (position) {
      case "top-left":
        return { ...base, bottom: `calc(100% + ${offsetY}px)`, left: `${offsetX}px` };
      case "top":
        return { ...base, bottom: `calc(100% + ${offsetY}px)`, left: "50%", transform: `translateX(-50%) translateX(${offsetX}px)` };
      case "top-right":
        return { ...base, bottom: `calc(100% + ${offsetY}px)`, right: `${offsetX}px` };
      case "right":
        return { ...base, left: `calc(100% + ${offsetX}px)`, top: "50%", transform: `translateY(-50%) translateY(${offsetY}px)` };
      case "bottom-right":
        return { ...base, top: `calc(100% + ${offsetY}px)`, right: `${offsetX}px` };
      case "bottom":
        return { ...base, top: `calc(100% + ${offsetY}px)`, left: "50%", transform: `translateX(-50%) translateX(${offsetX}px)` };
      case "bottom-left":
        return { ...base, top: `calc(100% + ${offsetY}px)`, left: `${offsetX}px` };
      case "left":
        return { ...base, right: `calc(100% + ${offsetX}px)`, top: "50%", transform: `translateY(-50%) translateY(${offsetY}px)` };
      default:
        return base;
    }
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="text-base-primary hover:text-accent focus:text-accent mt-1.5"
        onClick={openPopup}
      >
        {icon}
      </button>

      {(open) && (
        <div
          ref={popupRef}
          className={`${
            isModal
              ? `fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-[2px] p-4 ${
                  isVisible ? "fade-in" : "fade-out pointer-events-none"
                }`
              : `absolute z-[1001] ${
                  isVisible ? "fade-in" : "fade-out pointer-events-none"
                }`
          }`}
          style={{ visibility: isVisible ? "visible" : "hidden" }}
          onClick={(e) => {
            if (isModal && e.target === e.currentTarget) closePopup();
          }}
        >
          <div
            style={getPopupStyle()}
            className={`text-accent rounded-xl shadow-xl py-4 px-4 overflow-y-auto transition-all custom-scroll bg-white ${className}`}
          >
            {showCloseButton && (
              <button
                className="absolute top-2 right-4 text-gray-400 hover:text-gray-700"
                onClick={closePopup}
                aria-label="閉じる"
                type="button"
              >
                &times;
              </button>
            )}
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
