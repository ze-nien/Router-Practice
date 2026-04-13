import React, { useState } from "react";
import { useSudoku } from "../hooks/useSudoku";
import { SudokuContext } from "../hooks/useSudokuContext";

export const SudokuProvider = ({ children, initialLevel = "NORMAL" }) => {
  const [currentLevel, setCurrentLevel] = useState(initialLevel);
  const [isGenerating, setIsGenerating] = useState(false);

  // 取得大腦 Hook 的所有功能
  const gameValue = useSudoku(currentLevel, setIsGenerating);

  const handleLevelChange = (newLevel) => {
    setCurrentLevel(newLevel);
    gameValue.setSelectedCell(null); // 切換難度同步清空選取
  };

  const value = {
    ...gameValue,
    currentLevel,
    setCurrentLevel,
    handleLevelChange,
    isGenerating,
  };

  return (
    <SudokuContext.Provider value={value}>{children}</SudokuContext.Provider>
  );
};
