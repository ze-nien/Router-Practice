import LevelBtns from "../features/sudoku/components/LevelBtns";
import GameArea from "../features/sudoku/components/GameArea";
import { SudokuProvider } from "../features/sudoku/context/SudokuProvider";

const Sudoku = () => {
  return (
    <SudokuProvider>
      <h2 className="text-2xl font-bold mb-4">Sudoku</h2>
      <div className="relative flex flex-col items-center">
        <LevelBtns />
        <GameArea />
      </div>
    </SudokuProvider>
  );
};

export default Sudoku;
