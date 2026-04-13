import { useSudokuContext } from "../hooks/useSudokuContext";
import clsx from "clsx";

const NumberPad = () => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const {
    handleInput,
    handleClear,
    handleUndo,
    canUndo,
    mistakes,
    maxMistakes,
    board,
  } = useSudokuContext();
  const numberCounts = board.reduce((acc, c) => {
    if (c.num !== 0 && !c.isError) acc[c.num] = (acc[c.num] || 0) + 1;
    return acc;
  }, {});
  return (
    <div className="w-full h-full flex flex-col justify-around p-5 bg-slate-50 border border-slate-200">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Number Pad</h3>
        <div className="text-sm text-slate-500">
          Mistakes:
          <span
            className={
              mistakes > 0 ? "text-red-500 ml-1" : "text-slate-600 ml-1"
            }
          >
            {mistakes}/{maxMistakes}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 h-50">
        {nums.map((n) => {
          const isCompleted = numberCounts[n] >= 9;
          return (
            <button
              key={n}
              disabled={isCompleted}
              onClick={() => handleInput(n)}
              className={clsx(
                " bg-white border border-slate-100",
                isCompleted
                  ? "bg-slate-200 text-slate-300"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 active:scale-95 shadow-sm",
              )}
            >
              {n}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleUndo}
          disabled={!canUndo}
          className="flex-2 py-3 bg-slate-200 text-slate-700 font-bold hover:bg-slate-300 disabled:opacity-50 transition-colors"
        >
          UNDO
        </button>

        <button
          onClick={handleClear}
          className="flex-1 py-3 bg-rose-100 text-rose-600 font-bold hover:bg-rose-200 transition-colors"
        >
          清除
        </button>
      </div>
    </div>
  );
};

export default NumberPad;
