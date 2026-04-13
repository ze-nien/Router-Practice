import GameOverModal from "./GameOverModal";
import Board from "./Board";
import NumberPad from "./NumberPad";
import { useSudokuContext } from "../hooks/useSudokuContext";

const GameArea = () => {
  const { isGameFinished, isGameOver } = useSudokuContext();
  return (
    <div
      className="relative flex flex-col
    min-[700px]:flex-row justify-center gap-6 p-6"
    >
      <div className="w-100 shrink-0">
        <Board />
      </div>

      <div className="w-full min-w-60">
        <NumberPad />
      </div>
      {(isGameOver || isGameFinished) && (
        <div className="animate-zoom">
          <GameOverModal isWin={isGameFinished} />
        </div>
      )}
    </div>
  );
};

export default GameArea;
