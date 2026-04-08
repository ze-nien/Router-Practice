import React, { useState } from "react";
import Board from "../features/minesweeper/components/Board";
import { LEVELS } from "../features/minesweeper/constants/gameConfig";

//外層父組件
const Minesweeper = () => {
  //當前難度state
  const [currentLevel, setCurrentLevel] = useState(LEVELS.NORMAL);

  return (
    <>
      <h2 className="text-3xl">Minesweeper</h2>
      <div className="grid grid-cols-3 gap-2 m-2">
        {Object.entries(LEVELS).map(([key, level]) => (
          <button
            key={key}
            onClick={() => setCurrentLevel(level)}
            className="disabled:bg-gray-300 disabled:cursor-auto hover:cursor-pointer"
            disabled={currentLevel.name === level.name}
          >
            {level.name}
          </button>
        ))}
      </div>
      <Board key={`${currentLevel.name}`} currentLevel={currentLevel} />
    </>
  );
};

export default Minesweeper;
