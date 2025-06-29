"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import ArrowDownRoundedIcon from "../icon/ArrowDownRoundedIcon";
import { InfoPopup } from "./InfoPopup";

type PopupPosition =
  | "top-left"
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "left";

type SingleDropdownSelectorProps<T> = {
  options: T[];
  selected: T | null;
  placeholder?: string;
  onSelect: (value: T) => void;
  position?: PopupPosition;
  offsetX?: number;
  offsetY?: number;
  icon?: React.ReactNode;
  maxWidth?: string;
  minWidth?: string;
  maxHeight?: string;
  columns?: number;
  showForce?: boolean;
};

export function SingleDropdownSelector<T>({
  options,
  selected,
  onSelect,
  placeholder = "選択",
  position = "bottom",
  offsetX = 0,
  offsetY = 0,
  icon,
  maxWidth,
  minWidth,
  maxHeight,
  columns = 1,
  showForce = false,
}: SingleDropdownSelectorProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef}>
      <InfoPopup
        showCloseButton={false}
        position={position}
        offsetX={offsetX}
        offsetY={offsetY}
        icon={
          icon ?? (
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full px-6 py-2 text-accent bg-white cursor-pointer"
            >
              {selected ? String(selected) : placeholder}
              <ArrowDownRoundedIcon
                size={18}
                className={`inline ml-2 -mt-1 text-sm transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          )
        }
        minWidth={minWidth}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        showForce={showForce || isOpen}
      >
        <div className={`p-6 grid grid-cols-${columns} gap-4`}>
          {options.map((item, index) => (
            <button
              key={index}
              className={`text-left text-sm px-2 py-1 rounded-full flex items-center gap-2 ${
                selected === item ? "text-blue-600 font-semibold" : "hover:bg-gray-100"
              }`}
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
            >
              {selected === item ? (
                <FaCheck size={12} className="text-blue-600" />
              ) : (
                <span className="w-3" />
              )}
              {String(item)}
            </button>
          ))}
        </div>
      </InfoPopup>
    </div>
  );
}
