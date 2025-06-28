import React from 'react';
import SidebarToggleIcon from './icon/SidebarToggleIcon';
import { useFilter } from '@/app/context/FilterContext';


interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  // className?: string;
}

const equipmentList = [
  "ゼネ車",
  "キッチン", 
  "同録",
  "養生",
  "電源",
  "駐車場",
  "特機",
  "スモーク使用",
  "火器使用",
];

// 日本語設備名とfacilitiesキーのマッピング
const equipmentMapping: Record<string, string> = {
  "ゼネ車": "power_car",
  "キッチン": "kitchen",
  "同録": "sound_recording_ok",
  "養生": "protection",
  "電源": "electric_available",
  "駐車場": "has_parking",
  "特機": "special_equipment",
  "スモーク使用": "smoke_usage",
  "火器使用": "fire_usage",
};

// export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, className = "" }) => {
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { filters, setFilters, resetFilters } = useFilter();
  const [equipmentExpanded, setEquipmentExpanded] = React.useState(true);
  const [usageTimeExpanded, setUsageTimeExpanded] = React.useState(true);

  const toggleEquipment = (eq: string) => {
    const facilityKey = equipmentMapping[eq];
    setFilters(prev => ({
      ...prev,
      equipment: prev.equipment.includes(facilityKey)
        ? prev.equipment.filter(e => e !== facilityKey)
        : [...prev.equipment, facilityKey],
    }));
  };



  const toggleCategory = (cat: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  const togglePlace = (place: string) => {
    setFilters(prev => ({
      ...prev,
      places: prev.places.includes(place)
        ? prev.places.filter(p => p !== place)
        : [...prev.places, place],
    }));
  };

  const selectPrice = (price: string) => {
    setFilters(prev => ({ ...prev, price }));
  };

  const updateUsageTime = (start: number, end: number) => {
    // 妥当性チェック
    const validStart = Math.max(8, Math.min(23, start));
    const validEnd = Math.max(9, Math.min(24, end));
    
    // 開始時間は終了時間より小さくなければならない
    const finalStart = Math.min(validStart, validEnd - 1);
    const finalEnd = Math.max(validEnd, validStart + 1);
    
    setFilters(prev => ({ 
      ...prev, 
      usageTime: { start: finalStart, end: finalEnd } 
    }));
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const trackWidth = rect.width;
    const clickPercentage = clickX / trackWidth;
    
    // クリック位置の時間を計算（8時〜24時の範囲）
    const clickedTime = Math.round(8 + (clickPercentage * 16));
    const constrainedTime = Math.max(8, Math.min(24, clickedTime));
    
    const currentStart = filters.usageTime?.start || 8;
    const currentEnd = filters.usageTime?.end || 16;
    
    // クリック位置からスタートとエンドのどちらが近いかを計算
    const distanceToStart = Math.abs(constrainedTime - currentStart);
    const distanceToEnd = Math.abs(constrainedTime - currentEnd);
    
    if (distanceToStart <= distanceToEnd) {
      // スタート時間を更新（エンド時間より小さくなるように制限）
      const newStart = Math.min(constrainedTime, currentEnd - 1);
      updateUsageTime(Math.max(8, newStart), currentEnd);
    } else {
      // エンド時間を更新（スタート時間より大きくなるように制限）
      const newEnd = Math.max(constrainedTime, currentStart + 1);
      updateUsageTime(currentStart, Math.min(24, newEnd));
    }
  };

  return (
    <>
      {/* デスクトップ版サイドバー - DisplayCardsエリア内に固定配置 */}
      <div
        className={`
          hidden lg:flex flex-col
          ${isOpen ? "w-64" : "w-16"}
          bg-white
          transition-width duration-300
          relative
          rounded-r-3xl
        `}
      >
        {/* 開閉ボタン */}
        <button
          onClick={onToggle}
          className={`
            absolute top-4 right-[-12px]
            w-8 h-8 bg-white border border-gray-200 rounded-full
            flex items-center justify-center shadow
            hover:bg-gray-100
            transition-colors
          `}
          aria-label={isOpen ? "サイドバーを閉じる" : "サイドバーを開く"}
        >
          <SidebarToggleIcon size={20} className={isOpen ? "rotate-180" : ""} />
        </button>

        {/* フィルターコンテンツ - デスクトップでは常時表示 */}
        {isOpen && 
        <div className="px-4 pb-4 pt-6 overflow-y-auto flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            フィルター
          </h3>

          <div>
            <button
              onClick={() => setEquipmentExpanded(!equipmentExpanded)}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-sm font-medium text-gray-700">
                設備
              </h4>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${equipmentExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {equipmentExpanded && (
              <div className="mt-3 space-y-2">
                {equipmentList.map(eq => (
                  <label key={eq} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.equipment.includes(equipmentMapping[eq])}
                      onChange={() => toggleEquipment(eq)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{eq} (132)</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* 使用時間セクション */}
          <div>
            <button
              onClick={() => setUsageTimeExpanded(!usageTimeExpanded)}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-sm font-medium text-gray-700">
                使用時間
              </h4>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${usageTimeExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {usageTimeExpanded && (
              <div className="mt-3 px-2">
              {/* レンジスライダー */}
              <div className="mb-4">
                <div className="relative">
                  <div 
                    className="h-2 bg-gray-200 rounded-full cursor-pointer"
                    onClick={handleTrackClick}
                  >
                    <div 
                      className="h-2 bg-gray-400 rounded-full absolute"
                      style={{
                        left: `${((filters.usageTime?.start || 8) - 8) / 16 * 100}%`,
                        width: `${((filters.usageTime?.end || 16) - (filters.usageTime?.start || 8)) / 16 * 100}%`
                      }}
                    />
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="23"
                    value={filters.usageTime?.start || 8}
                    onChange={(e) => {
                      const newStart = parseInt(e.target.value);
                      const currentEnd = filters.usageTime?.end || 16;
                      updateUsageTime(newStart, Math.max(newStart + 1, currentEnd));
                    }}
                    className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-10 pointer-events-auto"
                    style={{ background: 'transparent' }}
                  />
                  <input
                    type="range"
                    min="9"
                    max="24"
                    value={filters.usageTime?.end || 16}
                    onChange={(e) => {
                      const newEnd = parseInt(e.target.value);
                      const currentStart = filters.usageTime?.start || 8;
                      updateUsageTime(Math.min(currentStart, newEnd - 1), newEnd);
                    }}
                    className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-20 pointer-events-auto"
                    style={{ background: 'transparent' }}
                  />
                  <div 
                    className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                    style={{ left: `${((filters.usageTime?.start || 8) - 8) / 16 * 100}%` }}
                  />
                  <div 
                    className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                    style={{ left: `${((filters.usageTime?.end || 16) - 8) / 16 * 100}%` }}
                  />
                </div>
              </div>
              
              {/* 時間入力フィールド */}
              <div className="flex items-center justify-center space-x-3">
                <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                  <input
                    type="number"
                    min="8"
                    max="23"
                    value={filters.usageTime?.start || 8}
                    onChange={(e) => {
                      const start = Math.max(8, Math.min(23, parseInt(e.target.value) || 8));
                      const currentEnd = filters.usageTime?.end || 16;
                      updateUsageTime(start, Math.max(start + 1, currentEnd));
                    }}
                    className="w-full text-sm text-center bg-transparent outline-none"
                  />
                </div>
                <span className="text-sm text-gray-500">〜</span>
                <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                  <input
                    type="number"
                    min="9"
                    max="24"
                    value={filters.usageTime?.end || 16}
                    onChange={(e) => {
                      const end = Math.max(9, Math.min(24, parseInt(e.target.value) || 16));
                      updateUsageTime(Math.min(end - 1, filters.usageTime?.start || 8), end);
                    }}
                    className="w-full text-sm text-center bg-transparent outline-none"
                  />
                </div>
                <span className="text-sm text-gray-500">時</span>
              </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                価格帯
              </h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="price-desktop"
                    className="border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">～10万円</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="price-desktop"
                    className="border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">10万円～50万円</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="price-desktop"
                    className="border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">50万円～</span>
                </label>
              </div>
            </div>
          </div>

          <button 
            onClick={resetFilters}
            className="w-full mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            フィルターをリセット
          </button>
          <button
              onClick={() => {
                /* 検索処理呼び出し */
              }}
              className="
                mt-4
                w-full
                py-3
                bg-gray-800 text-white
                text-center
                rounded-lg
                hover:bg-gray-700
                transition-colors
                font-semibold
              "
            >
              検索
            </button>
        </div>
        }
      </div>

      {/* モバイル版底部ナビゲーション */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex justify-center items-center py-3">
          <button
            onClick={onToggle}
            className="flex flex-col items-center p-2 rounded-lg transition-all duration-200 text-gray-600"
            aria-label="フィルターを開く"
          >
            <SidebarToggleIcon size={20} className="text-gray-600" />
            <span className="text-xs mt-1 text-gray-600">
              フィルター
            </span>
          </button>
        </div>
      </div>

      {/* モバイル版フィルターモーダル */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-60 flex items-end">
          <div className="w-full bg-white rounded-t-xl p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                フィルター
              </h3>
              <button
                onClick={onToggle}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  カテゴリ
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">デザイナー</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">エンジニア</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">プロデューサー</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  場所
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">東京</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">大阪</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">名古屋</span>
                  </label>
                </div>
              </div>

              {/* モバイル版設備セクション */}
              <div>
                <button
                  onClick={() => setEquipmentExpanded(!equipmentExpanded)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h4 className="text-sm font-medium text-gray-700">
                    設備
                  </h4>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${equipmentExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {equipmentExpanded && (
                  <div className="mt-3 space-y-2">
                    {equipmentList.map(eq => (
                      <label key={eq} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.equipment.includes(equipmentMapping[eq])}
                          onChange={() => toggleEquipment(eq)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">{eq} (132)</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* モバイル版使用時間セクション */}
              <div>
                <button
                  onClick={() => setUsageTimeExpanded(!usageTimeExpanded)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h4 className="text-sm font-medium text-gray-700">
                    使用時間
                  </h4>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${usageTimeExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {usageTimeExpanded && (
                <div className="px-2">
                  {/* レンジスライダー */}
                  <div className="mb-4">
                    <div className="relative">
                      <div 
                        className="h-2 bg-gray-200 rounded-full cursor-pointer"
                        onClick={handleTrackClick}
                      >
                        <div 
                          className="h-2 bg-gray-400 rounded-full absolute"
                          style={{
                            left: `${((filters.usageTime?.start || 8) - 8) / 16 * 100}%`,
                            width: `${((filters.usageTime?.end || 16) - (filters.usageTime?.start || 8)) / 16 * 100}%`
                          }}
                        />
                      </div>
                      <input
                        type="range"
                        min="8"
                        max="23"
                        value={filters.usageTime?.start || 8}
                        onChange={(e) => {
                          const newStart = parseInt(e.target.value);
                          const currentEnd = filters.usageTime?.end || 16;
                          updateUsageTime(newStart, Math.max(newStart + 1, currentEnd));
                        }}
                        className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-10 pointer-events-auto"
                        style={{ background: 'transparent' }}
                      />
                      <input
                        type="range"
                        min="9"
                        max="24"
                        value={filters.usageTime?.end || 16}
                        onChange={(e) => {
                          const newEnd = parseInt(e.target.value);
                          const currentStart = filters.usageTime?.start || 8;
                          updateUsageTime(Math.min(currentStart, newEnd - 1), newEnd);
                        }}
                        className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-20 pointer-events-auto"
                        style={{ background: 'transparent' }}
                      />
                      <div 
                        className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                        style={{ left: `${((filters.usageTime?.start || 8) - 8) / 16 * 100}%` }}
                      />
                      <div 
                        className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                        style={{ left: `${((filters.usageTime?.end || 16) - 8) / 16 * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* 時間入力フィールド */}
                  <div className="flex items-center justify-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                      <input
                        type="number"
                        min="8"
                        max="23"
                        value={filters.usageTime?.start || 8}
                        onChange={(e) => {
                          const start = Math.max(8, Math.min(23, parseInt(e.target.value) || 8));
                          const currentEnd = filters.usageTime?.end || 16;
                          updateUsageTime(start, Math.max(start + 1, currentEnd));
                        }}
                        className="w-full text-sm text-center bg-transparent outline-none"
                      />
                    </div>
                    <span className="text-sm text-gray-500">〜</span>
                    <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                      <input
                        type="number"
                        min="9"
                        max="24"
                        value={filters.usageTime?.end || 16}
                        onChange={(e) => {
                          const end = Math.max(9, Math.min(24, parseInt(e.target.value) || 16));
                          const currentStart = filters.usageTime?.start || 8;
                          updateUsageTime(Math.min(currentStart, end - 1), end);
                        }}
                        className="w-full text-sm text-center bg-transparent outline-none"
                      />
                    </div>
                    <span className="text-sm text-gray-500">時</span>
                  </div>
                </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  価格帯
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price-mobile"
                      className="border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">～10万円</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price-mobile"
                      className="border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">10万円～50万円</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price-mobile"
                      className="border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">50万円～</span>
                  </label>
                </div>
              </div>
            </div>

            <button 
              onClick={resetFilters}
              className="w-full mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              フィルターをリセット
            </button>

            <button
              onClick={() => {
                /* 検索処理呼び出し */
              }}
              className="
                mt-4
                w-full
                py-3
                bg-gray-800 text-black
                text-center
                rounded-lg
                hover:bg-gray-700
                transition-colors
                font-semibold
              "
            >
              検索
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;