"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";

export interface DropdownOption {
  label: string;
  value: string;
}

interface SingleDropdownSelectorProps {
  options: DropdownOption[];
  selected: DropdownOption | null;
  placeholder?: string;
  onSelect: (value: DropdownOption | null) => void;
}

export const SingleDropdownSelector = ({
  options,
  selected,
  onSelect,
  placeholder = "選択",
}: SingleDropdownSelectorProps) => {
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

  const handleSelect = (item: DropdownOption) => {
    if (selected?.value === item.value) {
      onSelect(null);
    } else {
      onSelect(item);
    }
    setIsOpen(false); // ✅ 選択後にポップアップを閉じる
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full px-6 py-2 text-accent bg-white"
      >
        {selected?.label || placeholder}
        <SlArrowDown
          className={`inline ml-2 -mt-1 text-sm transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-[640px] bg-white rounded-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] p-6 grid grid-cols-3 gap-4">
          {options.map((item, index) => {
            const isSelected = selected?.value === item.value;
            return (
              <button
                key={index}
                className={`text-left text-sm px-2 py-1 rounded-full flex items-center gap-2 ${
                  isSelected ? "text-blue-600 font-semibold" : "hover:bg-gray-100"
                }`}
                onClick={() => handleSelect(item)}
              >
                {isSelected ? (
                  <FaCheck size={12} className="text-blue-600 min-w-[16px]" />
                ) : (
                  <span className="inline-block min-w-[16px]" />
                )}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
