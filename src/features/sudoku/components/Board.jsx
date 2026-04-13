import Cell from "./Cell";
import { useSudokuContext } from "../hooks/useSudokuContext";

const Board = () => {
  const { board, selectedCell, isGenerating } = useSudokuContext();

  const targetNum = board.find((c) => c.id === selectedCell?.id)?.num;

  return (
    <div className="relative w-full aspect-square bg-slate-300 border-2 overflow-hidden">
      <div className="grid grid-cols-9 w-full h-full gap-px">
        {board.map((d) => {
          const isHighlightBox = d.box === selectedCell?.box;
          const isSameNum =
            selectedCell && targetNum !== 0 && d.num === targetNum;

          return (
            <Cell
              key={`${d.id}`}
              cellData={d}
              isHighlightBox={isHighlightBox}
              isSameNum={isSameNum}
            />
          );
        })}
      </div>
      {isGenerating && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-[1px] flex flex-col items-center justify-center z-20">
          <p className="text-slate-500 font-bold tracking-widest">
            棋盤生成中...
          </p>
        </div>
      )}
    </div>
  );
};

export default Board;
