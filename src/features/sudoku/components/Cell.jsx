import React from "react";
import clsx from "clsx";

const Cell = ({ cellData, selectedCell, setSelectedCell, isSameNum }) => {
  const { row, col, num, isFixed, isError } = cellData;
  const isSelected = selectedCell?.row === row && selectedCell?.col === col;
  const isHighLight = selectedCell?.row === row || selectedCell?.col === col;
  const cellClasses = clsx(
    //基礎樣式
    "w-full aspect-square flex items-center justify-center text-xl transition-colors duration-150 h-10 w-7.5",

    //邊框邏輯
    "border border-slate-200",
    {
      "border-b-4 border-b-slate-900": (row + 1) % 3 === 0 && row !== 8,
      "border-r-4 border-r-slate-900": (col + 1) % 3 === 0 && col !== 8,
    },

    //優先權邏輯
    {
      "bg-slate-700 text-white": isSelected, // 選中時
      "bg-slate-500 text-white": isSameNum && !isSelected,
      "bg-slate-200": isHighLight && !isSelected && !isSameNum, // 高亮且未選中
      "bg-white": !isSelected && !isHighLight && !isSameNum, // 平時
      "font-bold": isFixed, // 題目固定數字加粗
      "text-blue-600": !isFixed && num !== 0, // 玩家填寫顏色
      "text-red-600": isError, //填錯
    },
  );

  return (
    <div className={cellClasses} onClick={() => setSelectedCell(cellData)}>
      <button type="button">{num === 0 ? "" : num}</button>
    </div>
  );
};

export default Cell;
