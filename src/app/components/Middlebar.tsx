"use client"
import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { FaTrash, FaCheck } from "react-icons/fa"
import { areaList } from "@/data/areaData"
import { categoryList } from "@/data/categoryData"

interface MiddlebarProps {
  onTagsChange: (tags: {
    categories: string[]
    area: string[]
    price_day: (number | null)[]
    price_hour: (number | null)[]
  }) => void
  onClearAllRequest: () => void;
}

export default function Middlebar({ onTagsChange, onClearAllRequest }: MiddlebarProps) {
  const { data: session } = useSession()

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedArea, setSelectedArea] = useState<string[]>([]);

  const [minPriceDay, setMinPriceDay] = useState<number | null>(null)
  const [maxPriceDay, setMaxPriceDay] = useState<number | null>(null)
  const [minPriceHour, setMinPriceHour] = useState<number | null>(null)
  const [maxPriceHour, setMaxPriceHour] = useState<number | null>(null)
 
  const [openTab, setOpenTab] = useState<"categories" | "area" | "price" | null>(null)

  const categoryPopupRef = useRef<HTMLDivElement>(null)
  const areaPopupRef = useRef<HTMLDivElement>(null)
  const pricePopupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!openTab) return

      if (openTab === "categories" && categoryPopupRef.current && !categoryPopupRef.current.contains(e.target as Node)) {
        setOpenTab(null)
      }
      if (openTab === "area" && areaPopupRef.current && !areaPopupRef.current.contains(e.target as Node)) {
        setOpenTab(null)
      }
      if (openTab === "price" && pricePopupRef.current && !pricePopupRef.current.contains(e.target as Node)) {
        setOpenTab(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [openTab])

  function toggleSelect<T>(value: T, selectedArray: T[], setSelectedArray: (val: T[]) => void) {
    if (selectedArray.includes(value)) {
      setSelectedArray(selectedArray.filter(item => item !== value))
    } else {
      setSelectedArray([...selectedArray, value])
    }
  }

  const handleClearAll = () => {
    setSelectedCategories([])
    setSelectedArea([])
    setMinPriceDay(null)
    setMaxPriceDay(null)
    setMinPriceHour(null)
    setMaxPriceHour(null)
    setOpenTab(null)
    onClearAllRequest()
  }

  function isTabActive(tab: "categories" | "area" | "price") {
    if (tab === "categories") return openTab === "categories" || selectedCategories.length > 0
    if (tab === "area") return openTab === "area" || selectedArea.length > 0
    if (tab === "price") return openTab === "price" || minPriceDay !== null || maxPriceDay !== null || minPriceHour !== null || maxPriceHour !== null
    return false
  }
  console.log(openTab) 

  function getTabClass(tab: "categories" | "area" | "price") {
    const active = isTabActive(tab)
    const base = "flex items-center px-3 py-1 rounded-full focus:outline-none transition-colors"
    return active ? `${base} bg-gray-200 text-gray-800` : `${base} text-gray-600 hover:text-gray-800`
  }

  useEffect(() => {
    onTagsChange({
      categories: selectedCategories,
      area: selectedArea,
      price_day: [minPriceDay, maxPriceDay],
      price_hour: [minPriceHour, maxPriceHour],
    });
  }, [selectedCategories, selectedArea, minPriceDay, maxPriceDay, minPriceHour, maxPriceHour, onTagsChange]);

  return (
    <div className="relative w-full">
      <div className="flex justify-between items-start">
        <div className="flex space-x-8 items-start">
          <div className="flex-none w-[200px]">
            <button onClick={() => setOpenTab(openTab === "categories" ? null : "categories")} className={`${getTabClass("categories")} px-6 py-2 mt-0`}>
              <span className="mr-1">種類</span>
              <span className="text-xs">▼</span>
            </button>
            {selectedCategories.length > 0 && (
              <div className="mt-3 flex flex-col space-y-1 text-xs break-words max-h-20 overflow-y-auto">
                {selectedCategories.map(cat => <span key={cat} className="text-blue-600">{cat}</span>)}
              </div>
            )}
          </div>

          <div className="flex-none w-[200px]">
            <button onClick={() => setOpenTab(openTab === "area" ? null : "area")} className={`${getTabClass("area")} px-6 py-2 mt-0`}>
              <span className="mr-1">場所</span>
              <span className="text-xs">▼</span>
            </button>
            {selectedArea.length > 0 && (
              <div className="mt-2 flex flex-col space-y-1 text-xs break-words">
                {selectedArea.map(area => <span key={area} className="text-blue-600">{area}</span>)}
              </div>
            )}
          </div>

          <div className="flex-none w-[200px]">
            <button onClick={() => setOpenTab(openTab === "price" ? null : "price")} className={`${getTabClass("price")} px-6 py-2 mt-0`}>
              <span className="mr-1">金額</span>
              <span className="text-xs">▼</span>
            </button>
            {(minPriceDay !== null || maxPriceDay !== null || minPriceHour !== null || maxPriceHour !== null) && (
              <div className="mt-3 flex flex-col space-y-1 text-xs break-words">
                <span className="text-blue-600">
                  日: {minPriceDay ?? "0"} ~ {maxPriceDay ?? "∞"} 万円 / 時: {minPriceHour ?? "0"} ~ {maxPriceHour ?? "∞"} 万円
                </span>
              </div>
            )}
          </div>
        </div>
        <button onClick={handleClearAll} className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none">
          <FaTrash className="mr-3" />
          <span>すべてクリア</span>
        </button>
      </div>


      {openTab === "categories" && (
        <div
          ref={categoryPopupRef}
          className="absolute left-0 mt-2 w-3/4 bg-white p-4 shadow-lg rounded-xl z-10 grid grid-cols-2 gap-2"
        >
          {categoryList.map((category) => {
            const isSelected = selectedCategories.includes(category)
            return (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isSelected}
                  onChange={() => toggleSelect(category, selectedCategories, setSelectedCategories)}
                />
                {isSelected ? <FaCheck className="text-blue-600" /> : <span className="w-4" />}
                <span className={`${isSelected ? "text-blue-600" : "text-gray-800"} text-xs`}>
                  {category}
                </span>
              </label>
            )
          })}
        </div>
      )}
      
      {openTab === "area" && (
        <div
          ref={areaPopupRef}
          className="absolute left-0 mt-2 w-3/4 bg-white p-4 shadow-lg rounded-xl z-10 grid grid-cols-2 gap-2"
        >
          {areaList.map((area) => {
            const isSelected = selectedArea.includes(area)
            return (
              <label key={area} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isSelected}
                  onChange={() => toggleSelect(area, selectedArea, setSelectedArea)}
                />
                {isSelected ? <FaCheck className="text-blue-600" /> : <span className="w-4" />}
                <span className={`${isSelected ? "text-blue-600" : "text-gray-800"} text-xs`}>
                  {area}
                </span>
              </label>
            )
          })}
        </div>
      )}
   
      {openTab === "price" && (
        <div ref={pricePopupRef} className="absolute left-0 mt-2 w-3/4 bg-white p-4 shadow-lg rounded-xl z-10 flex flex-col items-center">
          <label className="mb-1 text-sm">金額 / day</label>
          <div className="flex items-center justify-center gap-2 mb-4">
            <input type="number" placeholder="最小(万円)" className="border border-gray-300 rounded px-2 py-1 w-[150px]" value={minPriceDay ?? ""} onChange={(e) => setMinPriceDay(e.target.value === "" ? null : Number(e.target.value))} />
            <span className="text-xl">～</span>
            <input type="number" placeholder="最大(万円)" className="border border-gray-300 rounded px-2 py-1 w-[150px]" value={maxPriceDay ?? ""} onChange={(e) => setMaxPriceDay(e.target.value === "" ? null : Number(e.target.value))} />
          </div>

          <label className="mb-1 text-sm">金額 / h</label>
          <div className="flex items-center justify-center gap-2 mb-4">
            <input type="number" placeholder="最小(万円)" className="border border-gray-300 rounded px-2 py-1 w-[150px]" value={minPriceHour ?? ""} onChange={(e) => setMinPriceHour(e.target.value === "" ? null : Number(e.target.value))} />
            <span className="text-xl">～</span>
            <input type="number" placeholder="最大(万円)" className="border border-gray-300 rounded px-2 py-1 w-[150px]" value={maxPriceHour ?? ""} onChange={(e) => setMaxPriceHour(e.target.value === "" ? null : Number(e.target.value))} />
          </div>

          <button onClick={() => { setMinPriceDay(null); setMaxPriceDay(null); setMinPriceHour(null); setMaxPriceHour(null); }} className="flex items-center text-gray-500 hover:text-gray-700 px-4 py-2 rounded">
            <FaTrash className="mr-1" /> クリア
          </button>
        </div>
      )}
    </div>
  )
}