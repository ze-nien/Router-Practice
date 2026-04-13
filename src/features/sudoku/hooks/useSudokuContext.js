import { createContext, useContext } from "react";

// 1. 單純建立 Context 物件
export const SudokuContext = createContext();

// 2. 提供給子組件用的 Hook
export const useSudokuContext = () => {
  const context = useContext(SudokuContext);
  if (!context) {
    throw new Error("useSudokuContext 必須在 SudokuProvider 內使用");
  }
  return context;
};
