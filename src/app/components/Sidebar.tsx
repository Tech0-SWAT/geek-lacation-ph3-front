import React from 'react';
import SidebarToggleIcon from './icon/SidebarToggleIcon';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, className = "" }) => {
  return (
    <>
      {/* デスクトップ版サイドバー - DisplayCardsエリア内に固定配置 */}
      <div 
        className={`hidden lg:block relative w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen ${className}`}
      >
        {/* フィルターコンテンツ - デスクトップでは常時表示 */}
        <div className="px-4 pb-4 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            フィルター
          </h3>
          
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

          <button className="w-full mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
            フィルターをリセット
          </button>
        </div>
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

            <button className="w-full mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              フィルターをリセット
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;