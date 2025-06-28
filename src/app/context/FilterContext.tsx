"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

// フィルターに使う型定義
export type Filters = {
  categories: string[];
  places: string[];
  price: string | null;
  equipment: string[];
  usageTime: { start: number; end: number } | null;
};

// コンテキストの初期値
const initial: Filters = {
  categories: [],
  places: [],
  price: null,
  equipment: [], 
  usageTime: null,
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
