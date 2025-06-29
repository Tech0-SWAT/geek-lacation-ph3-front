"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
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

type DropdownSelectorProps = {
  options: unknown[];
  selected: unknown[];
  placeholder?: string;
  onSelect: (values: unknown[]) => void;
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

export const MultiDropdownSelector = ({
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
  columns = 3,
  showForce = false,
}: DropdownSelectorProps) => {
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

  const toggleSelect = (item: unknown) => {
    if (selected.includes(item)) {
      onSelect(selected.filter(i => i !== item));
    } else {
      onSelect([...selected, item]);
    }
  };

  const handleClear = () => {
    onSelect([]);
  };

  return (
    <div ref={containerRef}>
      <InfoPopup
        showCloseButton={false}
        position={position}
        offsetX={offsetX}
        offsetY={offsetY}
        icon={ icon ? icon : (
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full px-6 py-2 text-accent bg-white"
          >
            {placeholder}
            <ArrowDownRoundedIcon
              size={18}
              className={`inline ml-2 -mt-1 text-sm transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        ) }
        minWidth={minWidth}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        showForce={showForce}
      >
        <div className={`p-6 grid grid-cols-${columns} gap-4`}>
          {options.map((item, index) => {
            const isSelected = selected.includes(item);
            return (
              <button
                key={index}
                className={`text-left text-sm px-2 py-1 rounded-full flex items-center gap-2 ${
                  isSelected ? "text-blue-600 font-semibold" : "hover:bg-gray-100"
                }`}
                onClick={() => toggleSelect(item)}
              >
                {isSelected ? <FaCheck size={12} className="text-blue-600" /> : <span className="w-3" />}
                {String(item)}
              </button>
            );
          })}
          <div className={`col-span-${columns} text-right mt-4`}>
            <button
              onClick={handleClear}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <FaTrash className="mr-2" />
              すべてクリア
            </button>
          </div>
        </div>
      </InfoPopup>
    </div>
  );
};
