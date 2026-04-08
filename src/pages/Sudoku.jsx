import React, { useState } from "react";
import { useSudoku } from "../features/sudoku/hooks/useSudoku";
import Board from "../features/sudoku/components/Board";
import NumberPad from "../features/sudoku/components/NumberPad";
import { LEVELS } from "../features/sudoku/constants/gameConfig";
import clsx from "clsx";

const Sudoku = () => {
  const [currentLevel, setCurrentLevel] = useState("NORMAL");
  const [selectedCell, setSelectedCell] = useState(null);
  const [activeNumber, setActiveNumber] = useState(null);
  const {
    board,
    fillNumber,
    mistakes,
    maxMistakes,
    isGameOver,
    generateNewGame,
    isGenerating,
  } = useSudoku(currentLevel);
  const levelkeys = Object.keys(LEVELS);

  const handleInput = (num) => {
    if (selectedCell !== null) {
      fillNumber(selectedCell.id, num);
      setActiveNumber(num);
    }
  };

  return (
    <>
      <h2 className="text-2xl">Sudoku</h2>

      <div className="relative overflow-hidden">
        <div className="flex flex-col">
          <div className="flex gap-2 p-2 *:cursor-pointer justify-center">
            {levelkeys.map((level) => {
              const isActive = currentLevel === level;
              return (
                <button
                  key={level}
                  disabled={isGenerating || isActive}
                  onClick={() => setCurrentLevel(level)}
                  className={clsx(
                    "px-6 py-2 rounded-lg font-medium transition-all duration-300 border-2",
                    "disabled:opacity-40 disabled:cursor-default",
                    {
                      // 2. Active 樣式：選中時高亮
                      "bg-slate-800 text-white border-slate-800 shadow-lg scale-105":
                        isActive,
                      // 3. Inactive 樣式：未選中時淡化
                      "bg-white text-slate-500 border-slate-200 hover:border-slate-400":
                        !isActive,
                    },
                  )}
                >
                  {level}
                </button>
              );
            })}
          </div>
          <Board
            key={currentLevel}
            currentLevel={currentLevel}
            board={board}
            activeNumber={activeNumber}
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
            mistakes={mistakes}
          />
          <div className="text-lg font-semibold">
            錯誤次數:
            <span className={mistakes > 0 ? "text-red-500" : ""}>
              {mistakes}
            </span>
            / {maxMistakes}
          </div>
          <NumberPad onSelect={handleInput} activeNumber={activeNumber} />
        </div>
        {isGameOver && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm animate-fade-in">
            <div className="text-center p-6 bg-white rounded-lg shadow-xl">
              <h3 className="text-2xl font-bold text-red-600 mb-2">
                GAME OVER
              </h3>
              <p className="text-slate-600 mb-4">錯誤次數已達上限</p>
              <button
                onClick={generateNewGame}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                重新開始
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sudoku;
