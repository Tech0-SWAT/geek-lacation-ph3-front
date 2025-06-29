"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaCheck } from "react-icons/fa";
import SortUpIcon from "../icon/SortUpIcon";
import { InfoPopup } from "./InfoPopup";

type SortOption = {
  key: string;
  label: string;
};

type SortDropdownProps = {
  options: SortOption[];
  selected: string; // key
  onSelect: (key: string) => void;
  offsetX?: number;
  offsetY?: number;
  position?:
    | "top-left"
    | "top"
    | "top-right"
    | "right"
    | "bottom-right"
    | "bottom"
    | "bottom-left"
    | "left";
};

export const SortDropdown = ({
  options,
  selected,
  onSelect,
  offsetX = 0,
  offsetY = 8,
  position = "bottom-right",
}: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedLabel, setSelectedLabel] = useState(() => {
    const found = options.find((opt) => opt.key === selected);
    return found?.label ?? options[0]?.label ?? "";
  });

  useEffect(() => {
    handleSelect(options[0].key);
  }, []); 

  useEffect(() => {
    const found = options.find((opt) => opt.key === selected);
    if (found) {
      setSelectedLabel(found.label);
    } else if (options.length > 0) {
      setSelectedLabel(options[0].label);
    } else {
      setSelectedLabel("");
    }
  }, [selected, options]);

  const handleSelect = (key: string) => {
    onSelect(key);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <InfoPopup
        showCloseButton={false}
        position={position}
        minWidth="200px"
        offsetX={offsetX}
        offsetY={offsetY}
        icon={
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-accent hover:opacity-80"
          >
            <SortUpIcon size={28} className="mr-1" />
            <span className="text-ls mt-0.5">{selectedLabel}</span>
          </div>
        }
      >
        {options.map(({ key, label }) => {
          const isSelected = key === selected || (!selected && key === options[0]?.key);
          return (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`w-full text-left flex items-center px-2 py-2 rounded-md text-sm ${
                isSelected ? "text-blue-600 font-bold" : "text-black"
              } hover:bg-gray-100`}
            >
              <span className="inline-flex items-center justify-center w-4">
                {isSelected ? <FaCheck size={12} className="text-blue-600" /> : null}
              </span>
              <span className="ml-2">{label}</span>
            </button>
          );
        })}
      </InfoPopup>
    </div>
  );
};
