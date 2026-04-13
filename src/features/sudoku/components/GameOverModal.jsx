import { useState } from "react";
import LevelBtns from "./LevelBtns";
import { useSudokuContext } from "../hooks/useSudokuContext";

const GameOverModal = ({ isWin }) => {
  const [isSwitchingLevel, setIsSwitchingLevel] = useState(false);
  const { handleReStart } = useSudokuContext();

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-sm w-full">
        {!isSwitchingLevel ? (
          <div className="animate-in fade-in zoom-in duration-300">
            {isWin ? (
              <h3 className="text-3xl font-black text-blue-600 mb-2">WIN</h3>
            ) : (
              <h3 className="text-3xl font-black text-red-600 mb-2">
                "GAME OVER"
              </h3>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={handleReStart}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
              >
                重新開始
              </button>

              <button
                onClick={() => setIsSwitchingLevel(true)}
                className="text-slate-400 text-sm hover:text-slate-600 underline"
              >
                更改難度
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-right duration-300">
            <h4 className="text-lg font-bold mb-4">選擇新難度</h4>

            <div className="mb-6">
              <LevelBtns />
            </div>

            <button
              onClick={() => setIsSwitchingLevel(false)}
              className="text-slate-400 text-sm"
            >
              返回
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameOverModal;
