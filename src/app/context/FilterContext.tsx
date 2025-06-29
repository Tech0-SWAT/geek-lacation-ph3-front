"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

// フィルターに使う型定義
export type Filters = {
  keyword: string;
  categories: string[];
  locations: string[];  // 地域選択用（Middlebar由来）
  places: string[];
  equipment: string[];
  usageTime: { start: number; end: number } | null;
  paymentMethods: string[];
  area: { start: number; end: number } | null;
  ceilingHeight: { start: number; end: number } | null;
  userCount: { start: number; end: number } | null;
  price_day: [number | null, number | null];  // Middlebar由来
  price_hour: [number | null, number | null]; // Middlebar由来
};

// コンテキストの初期値
const initial: Filters = {
  keyword: "",
  categories: [],
  locations: [],
  places: [],
  equipment: [], 
  usageTime: null,
  paymentMethods: [],
  area: null,
  ceilingHeight: null,
  userCount: null,
  price_day: [null, null],
  price_hour: [null, null],
};
const initialFetchedData: any[] = [];


type FilterContextType = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  resetFilters: () => void;
  fetchedData: any[];
  setFetchedData: React.Dispatch<React.SetStateAction<any[]>>;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

// プロバイダーコンポーネント
export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>(initial);
  const [fetchedData, setFetchedData] = useState<any[]>(initialFetchedData);

  const resetFilters = () => setFilters(initial);

  return (
    <FilterContext.Provider value={{ filters, setFilters, resetFilters,fetchedData, setFetchedData }}>
      {children}
    </FilterContext.Provider>
  );
};

// カスタムフック
export const useFilter = (): FilterContextType => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilter must be used within FilterProvider');
  return ctx;
};
