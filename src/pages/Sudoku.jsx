import React, { useState } from "react";
import { useSudoku } from "../features/sudoku/hooks/useSudoku";
import Board from "../features/sudoku/components/Board";
import NumberPad from "../features/sudoku/components/NumberPad";
import LevelBtns from "../features/sudoku/components/LevelBtns";
import GameArea from "../features/sudoku/components/GameArea";

const Sudoku = () => {
  //當前難度
  const [currentLevel, setCurrentLevel] = useState("NORMAL");
  //點選數字
  const [activeNumber, setActiveNumber] = useState(null);
  //點選格子
  const [selectedCell, setSelectedCell] = useState(null);

  const {
    board,
    fillNumber,
    mistakes,
    maxMistakes,
    isGameOver,
    generateNewGame,
    isGenerating,
  } = useSudoku(currentLevel);

  //填入數字的更新
  const handleInput = (num) => {
    //沒有選格子 略過
    if (selectedCell === null) return;
    fillNumber(selectedCell.id, num);
    setActiveNumber(num);
  };

  //切換難度與清空選擇的格子
  const handleLevelChange = (newLevel) => {
    generateNewGame();
    setCurrentLevel(newLevel);
    setSelectedCell(null);
  };

  //重新開始與清空選擇的格子
  const handleReStart = () => {
    generateNewGame();
    setSelectedCell(null);
  };

  return (
    <>
      <h2 className="text-2xl">Sudoku</h2>

      <div className="relative overflow-hidden">
        <LevelBtns
          currentLevel={currentLevel}
          isGenerating={isGenerating}
          handleLevelChange={handleLevelChange}
        />
        <GameArea
          key={currentLevel}
          isGameOver={isGameOver}
          handleReStart={handleReStart}
          levelSelector={
            <LevelBtns
              currentLevel={currentLevel}
              isGenerating={isGenerating}
              handleLevelChange={handleLevelChange}
            />
          }
        >
          <Board
            currentLevel={currentLevel}
            board={board}
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
          />
          <NumberPad
            handleInput={handleInput}
            mistakes={mistakes}
            maxMistakes={maxMistakes}
          />
        </GameArea>
      </div>
    </>
  );
};

export default Sudoku;
