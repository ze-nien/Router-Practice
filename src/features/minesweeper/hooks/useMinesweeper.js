import { useState } from "react";
import { generateBoard, plantMines, revealAllMines } from "../utils/gameLogic";

export const useMinesweeper = (level) => {
  //gameStatus根據玩家判斷idle、playing、reset
  const [gameStatus, setGameStatus] = useState("idle");
  const [board, setBoard] = useState(() => generateBoard(level.row, level.col));
  const isLost = board.some((cell) => cell.isMine && cell.isRevealed);
  const isWin =
    !isLost && board.every((cell) => cell.isMine || cell.isRevealed);
  //currentStatus棋盤輸贏判斷
  const currentStatus = isLost ? "lost" : isWin ? "won" : gameStatus;

  //reset遊戲
  const handleStatusClick = () => {
    //不理會已是閒置狀態的點擊
    if (gameStatus === "idle") return;
    setGameStatus("idle");
    const newEmptyBoard = generateBoard(level.row, level.col);
    setBoard(newEmptyBoard);
  };

  //格子點擊事件
  const handleCellClick = (id, row, col) => {
    //實際遊戲狀態不是初始(idle)或遊戲中(playing)則return不處裡
    if (currentStatus !== "idle" && currentStatus !== "playing") return;
    //當前點擊位置
    const targetCell = board.find((c) => c.id === id);
    //點擊位置是走過的或是放置旗幟則return不處裡
    if (targetCell.isRevealed || targetCell.isFlagged) return;

    //第一次點擊生成地雷
    if (gameStatus === "idle") {
      const initialBoard = plantMines(board, level, id, row, col);
      setBoard(initialBoard);
      setGameStatus("playing");
      return;
    }
    //點到地雷=>地雷全公開遊戲結束
    if (targetCell.isMine) {
      const lostBoard = revealAllMines(board);
      setBoard(lostBoard);
      return;
    }
    //紀錄走訪
    setBoard((prev) =>
      prev.map((cell) =>
        cell.id === id ? { ...cell, isRevealed: true } : cell,
      ),
    );
  };

  //旗幟
  const handleToggleFlag = (e, id) => {
    e.preventDefault();
    if (board[id].isRevealed) return;
    const flagBoard = [...board];
    flagBoard[id] = { ...flagBoard[id], isFlagged: !flagBoard[id].isFlagged };
    setBoard(flagBoard);
  };

  const handleClickWithAI = () => {
    console.log("you click ai help");
  };

  //導出棋盤、點擊格子、點擊狀態emoji、旗幟、遊戲狀態
  return {
    board,
    handleCellClick,
    handleStatusClick,
    handleToggleFlag,
    handleClickWithAI,
    currentStatus,
  };
};
