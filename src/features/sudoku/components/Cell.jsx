import clsx from "clsx";
import { useSudokuContext } from "../hooks/useSudokuContext";

const Cell = ({ cellData, isSameNum, isHighlightBox }) => {
  const { selectedCell, setSelectedCell, isGenerating } = useSudokuContext();
  const { row, col, num, isFixed, isError } = cellData;
  const isSelected = selectedCell?.id === cellData.id;
  const isHighLight = selectedCell?.row === row || selectedCell?.col === col;
  const cellClasses = clsx(
    "w-full aspect-square flex items-center justify-center text-xl transition-all duration-150 cursor-pointer select-none bg-clip-padding",

    // 1. 基礎邊框
    {
      "border-b-4 border-b-slate-900": (row + 1) % 3 === 0 && row !== 8,
      "border-r-4 border-r-slate-900": (col + 1) % 3 === 0 && col !== 8,
    },

    // 2. 背景顏色
    {
      "bg-red-600": isError,
      "bg-slate-700": !isError && isSelected,
      "bg-slate-400": !isError && !isSelected && isSameNum,
      "bg-slate-200":
        !isError &&
        !isSelected &&
        !isSameNum &&
        (isHighlightBox || isHighLight),
      "bg-white":
        !isError &&
        !isSelected &&
        !isSameNum &&
        !isHighLight &&
        !isHighlightBox,
    },

    // 3. 文字顏色
    {
      "text-white": isError || isSelected || (isSameNum && !isSelected),
      "text-slate-900 font-black": !isError && !isSelected && isFixed,
      "text-blue-600": !isError && !isSelected && !isFixed && num !== 0,
      "text-transparent": isGenerating,
    },
  );

  return (
    <div className={cellClasses} onClick={() => setSelectedCell(cellData)}>
      <span className="pointer-events-none">{num === 0 ? "" : num}</span>
    </div>
  );
};

export default Cell;
