"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
import ArrowDownRoundedIcon from "./icon/ArrowDownRoundedIcon";
import { InfoPopup } from "./profile/InfoPopup";

interface DropdownSelectorProps {
  options: string[];
  selected: string[];
  placeholder?: string;
  onSelect: (values: string[]) => void;
}

export const DropdownSelector = ({
  options,
  selected,
  onSelect,
  placeholder = "選択",
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

  const toggleSelect = (item: string) => {
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
    <div className="relative" ref={containerRef}>
      <InfoPopup
        showCloseButton={false}
        icon={
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
        }
      >
        <div className="p-6 grid grid-cols-3 gap-4">
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
                {item}
              </button>
            );
          })}
          <div className="col-span-3 text-right mt-4">
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
