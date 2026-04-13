import clsx from "clsx";
import { LEVELS } from "../constants/gameConfig";
import { useSudokuContext } from "../hooks/useSudokuContext";

const LevelBtns = () => {
  const { currentLevel, isGenerating, handleLevelChange } = useSudokuContext();
  const levelkeys = Object.keys(LEVELS);

  return (
    <div className="flex gap-2 p-2 *:cursor-pointer justify-center">
      {levelkeys.map((level) => {
        const isActive = currentLevel === level;
        return (
          <button
            key={level}
            disabled={isGenerating || isActive}
            onClick={() => handleLevelChange(level)}
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
  );
};

export default LevelBtns;
