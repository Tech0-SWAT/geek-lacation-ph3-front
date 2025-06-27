"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaCheck } from "react-icons/fa";
import SortUpIcon from "./icon/SortUpIcon";
import { InfoPopup } from "./profile/InfoPopup";

type SortOption = {
  key: string;
  label: string;
};

type SortDropdownProps = {
  options: SortOption[];
  selected: string; // key
  onSelect: (key: string) => void;
};

export const SortDropdown = ({
  options,
  selected,
  onSelect,
}: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ 初期ラベル表示（fallbackで options[0] を表示）
  const [selectedLabel, setSelectedLabel] = useState(() => {
    const found = options.find((opt) => opt.key === selected);
    return found?.label ?? options[0]?.label ?? "";
  });

  // ✅ selected または options が更新されたときラベルも更新
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

  // ✅ 外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ 選択処理
  const handleSelect = (key: string) => {
    onSelect(key);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <InfoPopup
        showCloseButton={false}
        position="bottom-right"
        minWidth="200px"
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
