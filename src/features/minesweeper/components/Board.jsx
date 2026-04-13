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
  const isEnd = currentStatus === "won" || currentStatus === "lost";

  return (
    <div className="flex flex-col text-2xl items-center gap-6 p-4">
      {/* 控制列 */}
      <div className="flex items-center justify-center gap-6 w-full mb-4">
        <button
          onClick={handleClickWithAI}
          className="px-4 py-2 bg-yellow-100
           hover:bg-yellow-200 text-yellow-800 
           text-sm font-bold rounded shadow-sm 
           border border-yellow-200 transition-all active:scale-95"
        >
          Hint
        </button>
        <button
          onClick={handleStatusClick}
          className={`
      flex items-center justify-center
      min-w-[180px] px-6 py-2 
      rounded-full font-bold shadow-md border-2 transition-all 
      active:scale-95
      ${
        currentStatus === "idle" || currentStatus === "lost"
          ? "bg-gray-100 border-transparent text-gray-400 cursor-default"
          : "bg-white border-slate-200 hover:border-blue-300 text-slate-700 cursor-pointer"
      }
    `}
          disabled={currentStatus === "idle" || currentStatus === "lost"}
        >
          <span className="whitespace-nowrap">
            {currentStatus === "idle" && "🙂 IDLE"}
            {currentStatus === "playing" && "😮 PLAYING..."}
            {currentStatus === "won" && "😎 YOU WIN!"}
            {currentStatus === "lost" && "😵 GAME OVER!"}
          </span>
        </button>
      </div>

      <div className="relative group shadow-2xl rounded-sm overflow-hidden border-8 border-slate-500 bg-slate-500">
        {/* 遊戲結束遮罩 */}
        {isEnd && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-[2px] animate-fadeIn">
            <div className="bg-white/95 p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-3 transform scale-110 border-4 border-white">
              <span className="text-4xl">
                {currentStatus === "won" ? "🎉" : "💀"}
              </span>
              <h3 className="text-2xl font-black text-slate-800 tracking-tighter">
                {currentStatus === "won" ? "MISSION CLEAR" : "GAME OVER"}
              </h3>
              <button
                onClick={handleStatusClick}
                className="mt-2 px-6 py-2 bg-slate-800 text-white text-sm font-bold rounded-full hover:bg-blue-600 transition-colors"
              >
                TRY AGAIN
              </button>
            </div>
          </div>
        )}

        {/* 棋盤 */}
        <div
          className={`grid gap-[1px] ${isEnd ? "filter grayscale-[0.3]" : ""}`}
          style={{
            gridTemplateRows: `repeat(${row}, 30px)`,
            gridTemplateColumns: `repeat(${col}, 30px)`,
            // 防止點擊穿透（雖然遮罩 z-10 已經擋住，但這是雙重保險）
            pointerEvents: isEnd ? "none" : "auto",
          }}
        >
          {
            //遍歷給Cell組件渲染格子
            board.map((c) => (
              <Cell
                key={c.id}
                cell={c}
                handleCellClick={() => handleCellClick(c.id, c.row, c.col)}
                handleToggleFlag={(e) => handleToggleFlag(e, c.id)}
              />
            ))
          }
        </div>

        {/* 資訊欄 */}
        <div className="text-white text-xs font-mono uppercase tracking-widest">
          Difficulty: {currentLevel.name} ({col}x{row})
        </div>
      </div>
    </div>
  );
};

export default Board;
