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

const paymentMethodList = [
  "カード",
  "その他", 
  "現金",
  "請求書",
];

// 日本語支払い方法名とキーのマッピング
const paymentMethodMapping: Record<string, string> = {
  "カード": "card",
  "その他": "other",
  "現金": "cash",
  "請求書": "invoice",
};

// export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, className = "" }) => {
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { filters, setFilters, resetFilters } = useFilter();
  const [equipmentExpanded, setEquipmentExpanded] = React.useState(true);
  const [usageTimeExpanded, setUsageTimeExpanded] = React.useState(true);
  const [paymentMethodExpanded, setPaymentMethodExpanded] = React.useState(true);
  const [areaExpanded, setAreaExpanded] = React.useState(true);
  const [ceilingHeightExpanded, setCeilingHeightExpanded] = React.useState(true);
  const [userCountExpanded, setUserCountExpanded] = React.useState(true);

  const toggleEquipment = (eq: string) => {
    const facilityKey = equipmentMapping[eq];
    setFilters(prev => ({
      ...prev,
      equipment: prev.equipment.includes(facilityKey)
        ? prev.equipment.filter(e => e !== facilityKey)
        : [...prev.equipment, facilityKey],
    }));
  };

  const togglePaymentMethod = (method: string) => {
    const methodKey = paymentMethodMapping[method];
    setFilters(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(methodKey)
        ? prev.paymentMethods.filter(m => m !== methodKey)
        : [...prev.paymentMethods, methodKey],
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

  const initializeUsageTime = () => {
    setFilters(prev => ({ 
      ...prev, 
      usageTime: { start: 8, end: 16 } 
    }));
  };

  const clearUsageTime = () => {
    setFilters(prev => ({ 
      ...prev, 
      usageTime: null 
    }));
  };

  const initializeArea = () => {
    setFilters(prev => ({ 
      ...prev, 
      area: { start: 300, end: 500 } 
    }));
  };

  const clearArea = () => {
    setFilters(prev => ({ 
      ...prev, 
      area: null 
    }));
  };

  const initializeCeilingHeight = () => {
    setFilters(prev => ({ 
      ...prev, 
      ceilingHeight: { start: 250, end: 300 } 
    }));
  };

  const clearCeilingHeight = () => {
    setFilters(prev => ({ 
      ...prev, 
      ceilingHeight: null 
    }));
  };

  const initializeUserCount = () => {
    setFilters(prev => ({ 
      ...prev, 
      userCount: { start: 30, end: 50 } 
    }));
  };

  const clearUserCount = () => {
    setFilters(prev => ({ 
      ...prev, 
      userCount: null 
    }));
  };

  const updateArea = (start: number, end: number) => {
    // 妥当性チェック (0㎡〜1000㎡)
    const validStart = Math.max(0, Math.min(999, start));
    const validEnd = Math.max(1, Math.min(1000, end));
    
    // 開始面積は終了面積より小さくなければならない
    const finalStart = Math.min(validStart, validEnd - 1);
    const finalEnd = Math.max(validEnd, validStart + 1);
    
    setFilters(prev => ({ 
      ...prev, 
      area: { start: finalStart, end: finalEnd } 
    }));
  };

  const updateCeilingHeight = (start: number, end: number) => {
    // 妥当性チェック (200cm〜500cm)
    const validStart = Math.max(200, Math.min(499, start));
    const validEnd = Math.max(201, Math.min(500, end));
    
    // 開始天高は終了天高より小さくなければならない
    const finalStart = Math.min(validStart, validEnd - 1);
    const finalEnd = Math.max(validEnd, validStart + 1);
    
    setFilters(prev => ({ 
      ...prev, 
      ceilingHeight: { start: finalStart, end: finalEnd } 
    }));
  };

  const updateUserCount = (start: number, end: number) => {
    // 妥当性チェック (1人〜200人)
    const validStart = Math.max(1, Math.min(199, start));
    const validEnd = Math.max(2, Math.min(200, end));
    
    // 開始人数は終了人数より小さくなければならない
    const finalStart = Math.min(validStart, validEnd - 1);
    const finalEnd = Math.max(validEnd, validStart + 1);
    
    setFilters(prev => ({ 
      ...prev, 
      userCount: { start: finalStart, end: finalEnd } 
    }));
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
                {filters.usageTime === null ? (
                  /* 空状態UI */
                  <div className="text-center py-6">
                    <p className="text-sm text-gray-500 mb-3">時間を選択してください</p>
                    <div className="h-2 bg-gray-100 rounded-full mb-4"></div>
                    <button 
                      onClick={initializeUsageTime}
                      className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      時間を選択
                    </button>
                  </div>
                ) : (
                  /* アクティブ状態UI */
                  <>
                    {/* レンジスライダー */}
                    <div className="mb-4">
                      <div className="relative">
                        <div 
                          className="h-2 bg-gray-200 rounded-full cursor-pointer"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const trackWidth = rect.width;
                            const clickPercentage = clickX / trackWidth;
                            
                            const clickedTime = Math.round(8 + (clickPercentage * 16));
                            const constrainedTime = Math.max(8, Math.min(24, clickedTime));
                            
                            const currentStart = filters.usageTime.start;
                            const currentEnd = filters.usageTime.end;
                            
                            const distanceToStart = Math.abs(constrainedTime - currentStart);
                            const distanceToEnd = Math.abs(constrainedTime - currentEnd);
                            
                            if (distanceToStart <= distanceToEnd) {
                              const newStart = Math.min(constrainedTime, currentEnd - 1);
                              updateUsageTime(Math.max(8, newStart), currentEnd);
                            } else {
                              const newEnd = Math.max(constrainedTime, currentStart + 1);
                              updateUsageTime(currentStart, Math.min(24, newEnd));
                            }
                          }}
                        >
                          <div 
                            className="h-2 bg-gray-400 rounded-full absolute"
                            style={{
                              left: `${(filters.usageTime.start - 8) / 16 * 100}%`,
                              width: `${(filters.usageTime.end - filters.usageTime.start) / 16 * 100}%`
                            }}
                          />
                        </div>
                        <input
                          type="range"
                          min="8"
                          max="23"
                          value={filters.usageTime.start}
                          onChange={(e) => {
                            const newStart = parseInt(e.target.value);
                            const currentEnd = filters.usageTime.end;
                            updateUsageTime(newStart, Math.max(newStart + 1, currentEnd));
                          }}
                          className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-10 pointer-events-auto"
                          style={{ background: 'transparent' }}
                        />
                        <input
                          type="range"
                          min="9"
                          max="24"
                          value={filters.usageTime.end}
                          onChange={(e) => {
                            const newEnd = parseInt(e.target.value);
                            const currentStart = filters.usageTime.start;
                            updateUsageTime(Math.min(currentStart, newEnd - 1), newEnd);
                          }}
                          className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-20 pointer-events-auto"
                          style={{ background: 'transparent' }}
                        />
                        <div 
                          className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                          style={{ left: `${(filters.usageTime.start - 8) / 16 * 100}%` }}
                        />
                        <div 
                          className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                          style={{ left: `${(filters.usageTime.end - 8) / 16 * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* 時間入力フィールド */}
                    <div className="flex items-center justify-center space-x-3 mb-3">
                      <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                        <input
                          type="number"
                          min="8"
                          max="23"
                          value={filters.usageTime.start}
                          onChange={(e) => {
                            const start = Math.max(8, Math.min(23, parseInt(e.target.value) || 8));
                            const currentEnd = filters.usageTime.end;
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
                          value={filters.usageTime.end}
                          onChange={(e) => {
                            const end = Math.max(9, Math.min(24, parseInt(e.target.value) || 16));
                            updateUsageTime(Math.min(end - 1, filters.usageTime.start), end);
                          }}
                          className="w-full text-sm text-center bg-transparent outline-none"
                        />
                      </div>
                      <span className="text-sm text-gray-500">時</span>
                    </div>
                    
                    {/* 選択を解除ボタン */}
                    <div className="text-center">
                      <button 
                        onClick={clearUsageTime}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors"
                      >
                        選択を解除
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* 支払い方法セクション */}
          <div>
            <button
              onClick={() => setPaymentMethodExpanded(!paymentMethodExpanded)}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-sm font-medium text-gray-700">
                支払い方法
              </h4>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${paymentMethodExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {paymentMethodExpanded && (
              <div className="mt-3 space-y-2">
                {paymentMethodList.map(method => (
                  <label key={method} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.paymentMethods.includes(paymentMethodMapping[method])}
                      onChange={() => togglePaymentMethod(method)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{method} (132)</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* 面積セクション */}
          <div>
            <button
              onClick={() => setAreaExpanded(!areaExpanded)}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-sm font-medium text-gray-700">
                面積
              </h4>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${areaExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {areaExpanded && (
              <div className="mt-3 px-2">
                {filters.area === null ? (
                  /* 空状態UI */
                  <div className="text-center py-6">
                    <p className="text-sm text-gray-500 mb-3">面積を選択してください</p>
                    <div className="h-2 bg-gray-100 rounded-full mb-4"></div>
                    <button 
                      onClick={initializeArea}
                      className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      面積を選択
                    </button>
                  </div>
                ) : (
                  /* アクティブ状態UI */
                  <>
                    {/* レンジスライダー */}
                    <div className="mb-4">
                      <div className="relative">
                        <div 
                          className="h-2 bg-gray-200 rounded-full cursor-pointer"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const trackWidth = rect.width;
                            const clickPercentage = clickX / trackWidth;
                            
                            const clickedArea = Math.round(0 + (clickPercentage * 1000));
                            const constrainedArea = Math.max(0, Math.min(1000, clickedArea));
                            
                            const currentStart = filters.area.start;
                            const currentEnd = filters.area.end;
                            
                            const distanceToStart = Math.abs(constrainedArea - currentStart);
                            const distanceToEnd = Math.abs(constrainedArea - currentEnd);
                            
                            if (distanceToStart <= distanceToEnd) {
                              const newStart = Math.min(constrainedArea, currentEnd - 1);
                              updateArea(Math.max(0, newStart), currentEnd);
                            } else {
                              const newEnd = Math.max(constrainedArea, currentStart + 1);
                              updateArea(currentStart, Math.min(1000, newEnd));
                            }
                          }}
                        >
                          <div 
                            className="h-2 bg-gray-400 rounded-full absolute"
                            style={{
                              left: `${(filters.area.start - 0) / 1000 * 100}%`,
                              width: `${(filters.area.end - filters.area.start) / 1000 * 100}%`
                            }}
                          />
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="999"
                          value={filters.area.start}
                          onChange={(e) => {
                            const newStart = parseInt(e.target.value);
                            const currentEnd = filters.area.end;
                            updateArea(newStart, Math.max(newStart + 1, currentEnd));
                          }}
                          className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-10 pointer-events-auto"
                          style={{ background: 'transparent' }}
                        />
                        <input
                          type="range"
                          min="1"
                          max="1000"
                          value={filters.area.end}
                          onChange={(e) => {
                            const newEnd = parseInt(e.target.value);
                            const currentStart = filters.area.start;
                            updateArea(Math.min(currentStart, newEnd - 1), newEnd);
                          }}
                          className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-20 pointer-events-auto"
                          style={{ background: 'transparent' }}
                        />
                        <div 
                          className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                          style={{ left: `${(filters.area.start - 0) / 1000 * 100}%` }}
                        />
                        <div 
                          className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                          style={{ left: `${(filters.area.end - 0) / 1000 * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* 面積入力フィールド */}
                    <div className="flex items-center justify-center space-x-3 mb-3">
                      <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                        <input
                          type="number"
                          min="0"
                          max="999"
                          value={filters.area.start}
                          onChange={(e) => {
                            const start = Math.max(0, Math.min(999, parseInt(e.target.value) || 0));
                            const currentEnd = filters.area.end;
                            updateArea(start, Math.max(start + 1, currentEnd));
                          }}
                          className="w-full text-sm text-center bg-transparent outline-none"
                        />
                      </div>
                      <span className="text-sm text-gray-500">〜</span>
                      <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                        <input
                          type="number"
                          min="1"
                          max="1000"
                          value={filters.area.end}
                          onChange={(e) => {
                            const end = Math.max(1, Math.min(1000, parseInt(e.target.value) || 1));
                            updateArea(Math.min(end - 1, filters.area.start), end);
                          }}
                          className="w-full text-sm text-center bg-transparent outline-none"
                        />
                      </div>
                      <span className="text-sm text-gray-500">㎡</span>
                    </div>
                    
                    {/* 選択を解除ボタン */}
                    <div className="text-center">
                      <button 
                        onClick={clearArea}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors"
                      >
                        選択を解除
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* 天高セクション */}
          <div>
            <button
              onClick={() => setCeilingHeightExpanded(!ceilingHeightExpanded)}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-sm font-medium text-gray-700">
                天高
              </h4>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${ceilingHeightExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {ceilingHeightExpanded && (
              <div className="mt-3 px-2">
                {filters.ceilingHeight === null ? (
                  /* 空状態UI */
                  <div className="text-center py-6">
                    <p className="text-sm text-gray-500 mb-3">天高を選択してください</p>
                    <div className="h-2 bg-gray-100 rounded-full mb-4"></div>
                    <button 
                      onClick={initializeCeilingHeight}
                      className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      天高を選択
                    </button>
                  </div>
                ) : (
                  /* アクティブ状態UI */
                  <>
                    {/* レンジスライダー */}
                    <div className="mb-4">
                      <div className="relative">
                        <div 
                          className="h-2 bg-gray-200 rounded-full cursor-pointer"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const trackWidth = rect.width;
                            const clickPercentage = clickX / trackWidth;
                            
                            const clickedHeight = Math.round(200 + (clickPercentage * 300));
                            const constrainedHeight = Math.max(200, Math.min(500, clickedHeight));
                            
                            const currentStart = filters.ceilingHeight.start;
                            const currentEnd = filters.ceilingHeight.end;
                            
                            const distanceToStart = Math.abs(constrainedHeight - currentStart);
                            const distanceToEnd = Math.abs(constrainedHeight - currentEnd);
                            
                            if (distanceToStart <= distanceToEnd) {
                              const newStart = Math.min(constrainedHeight, currentEnd - 1);
                              updateCeilingHeight(Math.max(200, newStart), currentEnd);
                            } else {
                              const newEnd = Math.max(constrainedHeight, currentStart + 1);
                              updateCeilingHeight(currentStart, Math.min(500, newEnd));
                            }
                          }}
                        >
                          <div 
                            className="h-2 bg-gray-400 rounded-full absolute"
                            style={{
                              left: `${(filters.ceilingHeight.start - 200) / 300 * 100}%`,
                              width: `${(filters.ceilingHeight.end - filters.ceilingHeight.start) / 300 * 100}%`
                            }}
                          />
                        </div>
                        <input
                          type="range"
                          min="200"
                          max="499"
                          value={filters.ceilingHeight.start}
                          onChange={(e) => {
                            const newStart = parseInt(e.target.value);
                            const currentEnd = filters.ceilingHeight.end;
                            updateCeilingHeight(newStart, Math.max(newStart + 1, currentEnd));
                          }}
                          className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-10 pointer-events-auto"
                          style={{ background: 'transparent' }}
                        />
                        <input
                          type="range"
                          min="201"
                          max="500"
                          value={filters.ceilingHeight.end}
                          onChange={(e) => {
                            const newEnd = parseInt(e.target.value);
                            const currentStart = filters.ceilingHeight.start;
                            updateCeilingHeight(Math.min(currentStart, newEnd - 1), newEnd);
                          }}
                          className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-20 pointer-events-auto"
                          style={{ background: 'transparent' }}
                        />
                        <div 
                          className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                          style={{ left: `${(filters.ceilingHeight.start - 200) / 300 * 100}%` }}
                        />
                        <div 
                          className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                          style={{ left: `${(filters.ceilingHeight.end - 200) / 300 * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* 天高入力フィールド */}
                    <div className="flex items-center justify-center space-x-3 mb-3">
                      <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                        <input
                          type="number"
                          min="200"
                          max="499"
                          value={filters.ceilingHeight.start}
                          onChange={(e) => {
                            const start = Math.max(200, Math.min(499, parseInt(e.target.value) || 200));
                            const currentEnd = filters.ceilingHeight.end;
                            updateCeilingHeight(start, Math.max(start + 1, currentEnd));
                          }}
                          className="w-full text-sm text-center bg-transparent outline-none"
                        />
                      </div>
                      <span className="text-sm text-gray-500">〜</span>
                      <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                        <input
                          type="number"
                          min="201"
                          max="500"
                          value={filters.ceilingHeight.end}
                          onChange={(e) => {
                            const end = Math.max(201, Math.min(500, parseInt(e.target.value) || 201));
                            updateCeilingHeight(Math.min(end - 1, filters.ceilingHeight.start), end);
                          }}
                          className="w-full text-sm text-center bg-transparent outline-none"
                        />
                      </div>
                      <span className="text-sm text-gray-500">cm</span>
                    </div>
                    
                    {/* 選択を解除ボタン */}
                    <div className="text-center">
                      <button 
                        onClick={clearCeilingHeight}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors"
                      >
                        選択を解除
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* 使用人数セクション */}
          <div>
            <button
              onClick={() => setUserCountExpanded(!userCountExpanded)}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-sm font-medium text-gray-700">
                使用人数
              </h4>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${userCountExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {userCountExpanded && (
              <div className="mt-3 px-2">
                {filters.userCount === null ? (
                  /* 空状態UI */
                  <div className="text-center py-6">
                    <p className="text-sm text-gray-500 mb-3">使用人数を選択してください</p>
                    <div className="h-2 bg-gray-100 rounded-full mb-4"></div>
                    <button 
                      onClick={initializeUserCount}
                      className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      使用人数を選択
                    </button>
                  </div>
                ) : (
                  /* アクティブ状態UI */
                  <>
                    {/* レンジスライダー */}
                    <div className="mb-4">
                      <div className="relative">
                        <div 
                          className="h-2 bg-gray-200 rounded-full cursor-pointer"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const trackWidth = rect.width;
                            const clickPercentage = clickX / trackWidth;
                            
                            const clickedCount = Math.round(1 + (clickPercentage * 199));
                            const constrainedCount = Math.max(1, Math.min(200, clickedCount));
                            
                            const currentStart = filters.userCount.start;
                            const currentEnd = filters.userCount.end;
                            
                            const distanceToStart = Math.abs(constrainedCount - currentStart);
                            const distanceToEnd = Math.abs(constrainedCount - currentEnd);
                            
                            if (distanceToStart <= distanceToEnd) {
                              const newStart = Math.min(constrainedCount, currentEnd - 1);
                              updateUserCount(Math.max(1, newStart), currentEnd);
                            } else {
                              const newEnd = Math.max(constrainedCount, currentStart + 1);
                              updateUserCount(currentStart, Math.min(200, newEnd));
                            }
                          }}
                        >
                          <div 
                            className="h-2 bg-gray-400 rounded-full absolute"
                            style={{
                              left: `${(filters.userCount.start - 1) / 199 * 100}%`,
                              width: `${(filters.userCount.end - filters.userCount.start) / 199 * 100}%`
                            }}
                          />
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="199"
                          value={filters.userCount.start}
                          onChange={(e) => {
                            const newStart = parseInt(e.target.value);
                            const currentEnd = filters.userCount.end;
                            updateUserCount(newStart, Math.max(newStart + 1, currentEnd));
                          }}
                          className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-10 pointer-events-auto"
                          style={{ background: 'transparent' }}
                        />
                        <input
                          type="range"
                          min="2"
                          max="200"
                          value={filters.userCount.end}
                          onChange={(e) => {
                            const newEnd = parseInt(e.target.value);
                            const currentStart = filters.userCount.start;
                            updateUserCount(Math.min(currentStart, newEnd - 1), newEnd);
                          }}
                          className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-20 pointer-events-auto"
                          style={{ background: 'transparent' }}
                        />
                        <div 
                          className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                          style={{ left: `${(filters.userCount.start - 1) / 199 * 100}%` }}
                        />
                        <div 
                          className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                          style={{ left: `${(filters.userCount.end - 1) / 199 * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* 使用人数入力フィールド */}
                    <div className="flex items-center justify-center space-x-3 mb-3">
                      <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                        <input
                          type="number"
                          min="1"
                          max="199"
                          value={filters.userCount.start}
                          onChange={(e) => {
                            const start = Math.max(1, Math.min(199, parseInt(e.target.value) || 1));
                            const currentEnd = filters.userCount.end;
                            updateUserCount(start, Math.max(start + 1, currentEnd));
                          }}
                          className="w-full text-sm text-center bg-transparent outline-none"
                        />
                      </div>
                      <span className="text-sm text-gray-500">〜</span>
                      <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                        <input
                          type="number"
                          min="2"
                          max="200"
                          value={filters.userCount.end}
                          onChange={(e) => {
                            const end = Math.max(2, Math.min(200, parseInt(e.target.value) || 2));
                            updateUserCount(Math.min(end - 1, filters.userCount.start), end);
                          }}
                          className="w-full text-sm text-center bg-transparent outline-none"
                        />
                      </div>
                      <span className="text-sm text-gray-500">人</span>
                    </div>
                    
                    {/* 選択を解除ボタン */}
                    <div className="text-center">
                      <button 
                        onClick={clearUserCount}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors"
                      >
                        選択を解除
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
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
                  {filters.usageTime === null ? (
                    /* モバイル版空状態UI */
                    <div className="text-center py-6">
                      <p className="text-sm text-gray-500 mb-3">時間を選択してください</p>
                      <div className="h-2 bg-gray-100 rounded-full mb-4"></div>
                      <button 
                        onClick={initializeUsageTime}
                        className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        時間を選択
                      </button>
                    </div>
                  ) : (
                    /* モバイル版アクティブ状態UI */
                    <>
                      {/* レンジスライダー */}
                      <div className="mb-4">
                        <div className="relative">
                          <div 
                            className="h-2 bg-gray-200 rounded-full cursor-pointer"
                            onClick={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const clickX = e.clientX - rect.left;
                              const trackWidth = rect.width;
                              const clickPercentage = clickX / trackWidth;
                              
                              const clickedTime = Math.round(8 + (clickPercentage * 16));
                              const constrainedTime = Math.max(8, Math.min(24, clickedTime));
                              
                              const currentStart = filters.usageTime.start;
                              const currentEnd = filters.usageTime.end;
                              
                              const distanceToStart = Math.abs(constrainedTime - currentStart);
                              const distanceToEnd = Math.abs(constrainedTime - currentEnd);
                              
                              if (distanceToStart <= distanceToEnd) {
                                const newStart = Math.min(constrainedTime, currentEnd - 1);
                                updateUsageTime(Math.max(8, newStart), currentEnd);
                              } else {
                                const newEnd = Math.max(constrainedTime, currentStart + 1);
                                updateUsageTime(currentStart, Math.min(24, newEnd));
                              }
                            }}
                          >
                            <div 
                              className="h-2 bg-gray-400 rounded-full absolute"
                              style={{
                                left: `${(filters.usageTime.start - 8) / 16 * 100}%`,
                                width: `${(filters.usageTime.end - filters.usageTime.start) / 16 * 100}%`
                              }}
                            />
                          </div>
                          <input
                            type="range"
                            min="8"
                            max="23"
                            value={filters.usageTime.start}
                            onChange={(e) => {
                              const newStart = parseInt(e.target.value);
                              const currentEnd = filters.usageTime.end;
                              updateUsageTime(newStart, Math.max(newStart + 1, currentEnd));
                            }}
                            className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-10 pointer-events-auto"
                            style={{ background: 'transparent' }}
                          />
                          <input
                            type="range"
                            min="9"
                            max="24"
                            value={filters.usageTime.end}
                            onChange={(e) => {
                              const newEnd = parseInt(e.target.value);
                              const currentStart = filters.usageTime.start;
                              updateUsageTime(Math.min(currentStart, newEnd - 1), newEnd);
                            }}
                            className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-20 pointer-events-auto"
                            style={{ background: 'transparent' }}
                          />
                          <div 
                            className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                            style={{ left: `${(filters.usageTime.start - 8) / 16 * 100}%` }}
                          />
                          <div 
                            className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                            style={{ left: `${(filters.usageTime.end - 8) / 16 * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      {/* 時間入力フィールド */}
                      <div className="flex items-center justify-center space-x-3 mb-3">
                        <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                          <input
                            type="number"
                            min="8"
                            max="23"
                            value={filters.usageTime.start}
                            onChange={(e) => {
                              const start = Math.max(8, Math.min(23, parseInt(e.target.value) || 8));
                              const currentEnd = filters.usageTime.end;
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
                            value={filters.usageTime.end}
                            onChange={(e) => {
                              const end = Math.max(9, Math.min(24, parseInt(e.target.value) || 16));
                              updateUsageTime(Math.min(end - 1, filters.usageTime.start), end);
                            }}
                            className="w-full text-sm text-center bg-transparent outline-none"
                          />
                        </div>
                        <span className="text-sm text-gray-500">時</span>
                      </div>
                      
                      {/* 選択を解除ボタン */}
                      <div className="text-center">
                        <button 
                          onClick={clearUsageTime}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors"
                        >
                          選択を解除
                        </button>
                      </div>
                    </>
                  )}
                </div>
                )}
              </div>

              {/* モバイル版支払い方法セクション */}
              <div>
                <button
                  onClick={() => setPaymentMethodExpanded(!paymentMethodExpanded)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h4 className="text-sm font-medium text-gray-700">
                    支払い方法
                  </h4>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${paymentMethodExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {paymentMethodExpanded && (
                  <div className="mt-3 space-y-2">
                    {paymentMethodList.map(method => (
                      <label key={method} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.paymentMethods.includes(paymentMethodMapping[method])}
                          onChange={() => togglePaymentMethod(method)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">{method} (132)</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* モバイル版面積セクション */}
              <div>
                <button
                  onClick={() => setAreaExpanded(!areaExpanded)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h4 className="text-sm font-medium text-gray-700">
                    面積
                  </h4>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${areaExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {areaExpanded && (
                <div className="px-2">
                  {filters.area === null ? (
                    /* モバイル版空状態UI */
                    <div className="text-center py-6">
                      <p className="text-sm text-gray-500 mb-3">面積を選択してください</p>
                      <div className="h-2 bg-gray-100 rounded-full mb-4"></div>
                      <button 
                        onClick={initializeArea}
                        className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        面積を選択
                      </button>
                    </div>
                  ) : (
                    /* モバイル版アクティブ状態UI */
                    <>
                      {/* レンジスライダー */}
                      <div className="mb-4">
                        <div className="relative">
                          <div 
                            className="h-2 bg-gray-200 rounded-full cursor-pointer"
                            onClick={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const clickX = e.clientX - rect.left;
                              const trackWidth = rect.width;
                              const clickPercentage = clickX / trackWidth;
                              
                              const clickedArea = Math.round(0 + (clickPercentage * 1000));
                              const constrainedArea = Math.max(0, Math.min(1000, clickedArea));
                              
                              const currentStart = filters.area.start;
                              const currentEnd = filters.area.end;
                              
                              const distanceToStart = Math.abs(constrainedArea - currentStart);
                              const distanceToEnd = Math.abs(constrainedArea - currentEnd);
                              
                              if (distanceToStart <= distanceToEnd) {
                                const newStart = Math.min(constrainedArea, currentEnd - 1);
                                updateArea(Math.max(0, newStart), currentEnd);
                              } else {
                                const newEnd = Math.max(constrainedArea, currentStart + 1);
                                updateArea(currentStart, Math.min(1000, newEnd));
                              }
                            }}
                          >
                            <div 
                              className="h-2 bg-gray-400 rounded-full absolute"
                              style={{
                                left: `${(filters.area.start - 0) / 1000 * 100}%`,
                                width: `${(filters.area.end - filters.area.start) / 1000 * 100}%`
                              }}
                            />
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="999"
                            value={filters.area.start}
                            onChange={(e) => {
                              const newStart = parseInt(e.target.value);
                              const currentEnd = filters.area.end;
                              updateArea(newStart, Math.max(newStart + 1, currentEnd));
                            }}
                            className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-10 pointer-events-auto"
                            style={{ background: 'transparent' }}
                          />
                          <input
                            type="range"
                            min="1"
                            max="1000"
                            value={filters.area.end}
                            onChange={(e) => {
                              const newEnd = parseInt(e.target.value);
                              const currentStart = filters.area.start;
                              updateArea(Math.min(currentStart, newEnd - 1), newEnd);
                            }}
                            className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-20 pointer-events-auto"
                            style={{ background: 'transparent' }}
                          />
                          <div 
                            className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                            style={{ left: `${(filters.area.start - 0) / 1000 * 100}%` }}
                          />
                          <div 
                            className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                            style={{ left: `${(filters.area.end - 0) / 1000 * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      {/* 面積入力フィールド */}
                      <div className="flex items-center justify-center space-x-3 mb-3">
                        <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                          <input
                            type="number"
                            min="0"
                            max="999"
                            value={filters.area.start}
                            onChange={(e) => {
                              const start = Math.max(0, Math.min(999, parseInt(e.target.value) || 0));
                              const currentEnd = filters.area.end;
                              updateArea(start, Math.max(start + 1, currentEnd));
                            }}
                            className="w-full text-sm text-center bg-transparent outline-none"
                          />
                        </div>
                        <span className="text-sm text-gray-500">〜</span>
                        <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                          <input
                            type="number"
                            min="1"
                            max="1000"
                            value={filters.area.end}
                            onChange={(e) => {
                              const end = Math.max(1, Math.min(1000, parseInt(e.target.value) || 1));
                              updateArea(Math.min(end - 1, filters.area.start), end);
                            }}
                            className="w-full text-sm text-center bg-transparent outline-none"
                          />
                        </div>
                        <span className="text-sm text-gray-500">㎡</span>
                      </div>
                      
                      {/* 選択を解除ボタン */}
                      <div className="text-center">
                        <button 
                          onClick={clearArea}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors"
                        >
                          選択を解除
                        </button>
                      </div>
                    </>
                  )}
                </div>
                )}
              </div>

              {/* モバイル版天高セクション */}
              <div>
                <button
                  onClick={() => setCeilingHeightExpanded(!ceilingHeightExpanded)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h4 className="text-sm font-medium text-gray-700">
                    天高
                  </h4>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${ceilingHeightExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {ceilingHeightExpanded && (
                <div className="px-2">
                  {filters.ceilingHeight === null ? (
                    /* モバイル版空状態UI */
                    <div className="text-center py-6">
                      <p className="text-sm text-gray-500 mb-3">天高を選択してください</p>
                      <div className="h-2 bg-gray-100 rounded-full mb-4"></div>
                      <button 
                        onClick={initializeCeilingHeight}
                        className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        天高を選択
                      </button>
                    </div>
                  ) : (
                    /* モバイル版アクティブ状態UI */
                    <>
                      {/* レンジスライダー */}
                      <div className="mb-4">
                        <div className="relative">
                          <div 
                            className="h-2 bg-gray-200 rounded-full cursor-pointer"
                            onClick={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const clickX = e.clientX - rect.left;
                              const trackWidth = rect.width;
                              const clickPercentage = clickX / trackWidth;
                              
                              const clickedHeight = Math.round(200 + (clickPercentage * 300));
                              const constrainedHeight = Math.max(200, Math.min(500, clickedHeight));
                              
                              const currentStart = filters.ceilingHeight.start;
                              const currentEnd = filters.ceilingHeight.end;
                              
                              const distanceToStart = Math.abs(constrainedHeight - currentStart);
                              const distanceToEnd = Math.abs(constrainedHeight - currentEnd);
                              
                              if (distanceToStart <= distanceToEnd) {
                                const newStart = Math.min(constrainedHeight, currentEnd - 1);
                                updateCeilingHeight(Math.max(200, newStart), currentEnd);
                              } else {
                                const newEnd = Math.max(constrainedHeight, currentStart + 1);
                                updateCeilingHeight(currentStart, Math.min(500, newEnd));
                              }
                            }}
                          >
                            <div 
                              className="h-2 bg-gray-400 rounded-full absolute"
                              style={{
                                left: `${(filters.ceilingHeight.start - 200) / 300 * 100}%`,
                                width: `${(filters.ceilingHeight.end - filters.ceilingHeight.start) / 300 * 100}%`
                              }}
                            />
                          </div>
                          <input
                            type="range"
                            min="200"
                            max="499"
                            value={filters.ceilingHeight.start}
                            onChange={(e) => {
                              const newStart = parseInt(e.target.value);
                              const currentEnd = filters.ceilingHeight.end;
                              updateCeilingHeight(newStart, Math.max(newStart + 1, currentEnd));
                            }}
                            className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-10 pointer-events-auto"
                            style={{ background: 'transparent' }}
                          />
                          <input
                            type="range"
                            min="201"
                            max="500"
                            value={filters.ceilingHeight.end}
                            onChange={(e) => {
                              const newEnd = parseInt(e.target.value);
                              const currentStart = filters.ceilingHeight.start;
                              updateCeilingHeight(Math.min(currentStart, newEnd - 1), newEnd);
                            }}
                            className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-20 pointer-events-auto"
                            style={{ background: 'transparent' }}
                          />
                          <div 
                            className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                            style={{ left: `${(filters.ceilingHeight.start - 200) / 300 * 100}%` }}
                          />
                          <div 
                            className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                            style={{ left: `${(filters.ceilingHeight.end - 200) / 300 * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      {/* 天高入力フィールド */}
                      <div className="flex items-center justify-center space-x-3 mb-3">
                        <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                          <input
                            type="number"
                            min="200"
                            max="499"
                            value={filters.ceilingHeight.start}
                            onChange={(e) => {
                              const start = Math.max(200, Math.min(499, parseInt(e.target.value) || 200));
                              const currentEnd = filters.ceilingHeight.end;
                              updateCeilingHeight(start, Math.max(start + 1, currentEnd));
                            }}
                            className="w-full text-sm text-center bg-transparent outline-none"
                          />
                        </div>
                        <span className="text-sm text-gray-500">〜</span>
                        <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                          <input
                            type="number"
                            min="201"
                            max="500"
                            value={filters.ceilingHeight.end}
                            onChange={(e) => {
                              const end = Math.max(201, Math.min(500, parseInt(e.target.value) || 201));
                              updateCeilingHeight(Math.min(end - 1, filters.ceilingHeight.start), end);
                            }}
                            className="w-full text-sm text-center bg-transparent outline-none"
                          />
                        </div>
                        <span className="text-sm text-gray-500">cm</span>
                      </div>
                      
                      {/* 選択を解除ボタン */}
                      <div className="text-center">
                        <button 
                          onClick={clearCeilingHeight}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors"
                        >
                          選択を解除
                        </button>
                      </div>
                    </>
                  )}
                </div>
                )}
              </div>

              {/* モバイル版使用人数セクション */}
              <div>
                <button
                  onClick={() => setUserCountExpanded(!userCountExpanded)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h4 className="text-sm font-medium text-gray-700">
                    使用人数
                  </h4>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${userCountExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {userCountExpanded && (
                <div className="px-2">
                  {filters.userCount === null ? (
                    /* モバイル版空状態UI */
                    <div className="text-center py-6">
                      <p className="text-sm text-gray-500 mb-3">使用人数を選択してください</p>
                      <div className="h-2 bg-gray-100 rounded-full mb-4"></div>
                      <button 
                        onClick={initializeUserCount}
                        className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        使用人数を選択
                      </button>
                    </div>
                  ) : (
                    /* モバイル版アクティブ状態UI */
                    <>
                      {/* レンジスライダー */}
                      <div className="mb-4">
                        <div className="relative">
                          <div 
                            className="h-2 bg-gray-200 rounded-full cursor-pointer"
                            onClick={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const clickX = e.clientX - rect.left;
                              const trackWidth = rect.width;
                              const clickPercentage = clickX / trackWidth;
                              
                              const clickedCount = Math.round(1 + (clickPercentage * 199));
                              const constrainedCount = Math.max(1, Math.min(200, clickedCount));
                              
                              const currentStart = filters.userCount.start;
                              const currentEnd = filters.userCount.end;
                              
                              const distanceToStart = Math.abs(constrainedCount - currentStart);
                              const distanceToEnd = Math.abs(constrainedCount - currentEnd);
                              
                              if (distanceToStart <= distanceToEnd) {
                                const newStart = Math.min(constrainedCount, currentEnd - 1);
                                updateUserCount(Math.max(1, newStart), currentEnd);
                              } else {
                                const newEnd = Math.max(constrainedCount, currentStart + 1);
                                updateUserCount(currentStart, Math.min(200, newEnd));
                              }
                            }}
                          >
                            <div 
                              className="h-2 bg-gray-400 rounded-full absolute"
                              style={{
                                left: `${(filters.userCount.start - 1) / 199 * 100}%`,
                                width: `${(filters.userCount.end - filters.userCount.start) / 199 * 100}%`
                              }}
                            />
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="199"
                            value={filters.userCount.start}
                            onChange={(e) => {
                              const newStart = parseInt(e.target.value);
                              const currentEnd = filters.userCount.end;
                              updateUserCount(newStart, Math.max(newStart + 1, currentEnd));
                            }}
                            className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-10 pointer-events-auto"
                            style={{ background: 'transparent' }}
                          />
                          <input
                            type="range"
                            min="2"
                            max="200"
                            value={filters.userCount.end}
                            onChange={(e) => {
                              const newEnd = parseInt(e.target.value);
                              const currentStart = filters.userCount.start;
                              updateUserCount(Math.min(currentStart, newEnd - 1), newEnd);
                            }}
                            className="absolute top-0 h-2 w-full opacity-0 cursor-pointer z-20 pointer-events-auto"
                            style={{ background: 'transparent' }}
                          />
                          <div 
                            className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                            style={{ left: `${(filters.userCount.start - 1) / 199 * 100}%` }}
                          />
                          <div 
                            className="absolute w-3 h-3 bg-gray-500 rounded-full -top-0.5 transform -translate-x-1.5 z-30 pointer-events-none"
                            style={{ left: `${(filters.userCount.end - 1) / 199 * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      {/* 使用人数入力フィールド */}
                      <div className="flex items-center justify-center space-x-3 mb-3">
                        <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                          <input
                            type="number"
                            min="1"
                            max="199"
                            value={filters.userCount.start}
                            onChange={(e) => {
                              const start = Math.max(1, Math.min(199, parseInt(e.target.value) || 1));
                              const currentEnd = filters.userCount.end;
                              updateUserCount(start, Math.max(start + 1, currentEnd));
                            }}
                            className="w-full text-sm text-center bg-transparent outline-none"
                          />
                        </div>
                        <span className="text-sm text-gray-500">〜</span>
                        <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 w-20">
                          <input
                            type="number"
                            min="2"
                            max="200"
                            value={filters.userCount.end}
                            onChange={(e) => {
                              const end = Math.max(2, Math.min(200, parseInt(e.target.value) || 2));
                              updateUserCount(Math.min(end - 1, filters.userCount.start), end);
                            }}
                            className="w-full text-sm text-center bg-transparent outline-none"
                          />
                        </div>
                        <span className="text-sm text-gray-500">人</span>
                      </div>
                      
                      {/* 選択を解除ボタン */}
                      <div className="text-center">
                        <button 
                          onClick={clearUserCount}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200 transition-colors"
                        >
                          選択を解除
                        </button>
                      </div>
                    </>
                  )}
                </div>
                )}
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