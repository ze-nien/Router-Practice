import Cell from "./Cell";
import { useMinesweeper } from "../hooks/useMinesweeper";

//棋盤容器
const Board = ({ currentLevel }) => {
  //傳難易度給自定義hooks 自定義hooks回傳棋盤與相關事件
  const {
    board,
    handleCellClick,
    handleStatusClick,
    handleToggleFlag,
    handleClickWithAI,
    currentStatus,
  } = useMinesweeper(currentLevel);

  //得渲染寬高
  const { row, col } = currentLevel;
  return (
    <div className="flex flex-col text-2xl">
      <button onClick={handleClickWithAI}>ai</button>
      <button
        onClick={handleStatusClick}
        className={`${currentStatus === "idle" ? "" : "cursor-pointer"}`}
        disabled={currentStatus === "idle"}
      >
        {currentStatus === "idle" && "🙂 IDLE..."}
        {currentStatus === "playing" && "😮 PLAYING..."}
        {currentStatus === "won" && "😎 YOU WIN!"}
        {currentStatus === "lost" && "😵 GAME OVER!"}
      </button>
      <div
        className={`grid w-fit ${currentStatus === "won" || currentStatus === "lost" ? "pointer-events-none" : ""}`}
        style={{
          gridTemplateRows: `repeat(${row},30px)`,
          gridTemplateColumns: `repeat(${col},30px)`,
        }}
      >
        {
          //遍歷給Cell組件渲染格子
          board.map((c) => (
            <Cell
              key={c.id}
              cell={c}
              onCellClick={() => handleCellClick(c.id, c.row, c.col)}
              onToggleFlag={(e) => handleToggleFlag(e, c.id)}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Board;
