import { LEVELS } from "../constants/gameConfig";
import { shuffle } from "../../../utils/shuffle";

//生成數獨
// const generateBoard = () => {
//   const board = Array.from({ length: 81 }, (_, i) => ({
//     id: i,
//     row: Math.floor(i / 9),
//     col: i % 9,
//     num: 0,
//     isFixed: true,
//   }));
//   fillBoard(board);
//   return board;
// };
//回溯法
// const fillBoard = (board, index = 0) => {
//   if (index === 81) return true;

//   const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

//   for (let num of nums) {
//     if (isValid(board, index, num)) {
//       board[index].num = num;
//       //遞迴進下一格 路徑通回傳true
//       if (fillBoard(board, index + 1)) return true;
//       //不通則歸零
//       board[index].num = 0;
//     }
//   }

//   //所有數字都試過不成功回傳false
//   return false;
// };

//數字驗證
const isValid = (board, index, num) => {
  const row = Math.floor(index / 9);
  const col = index % 9;
  for (let i = 0; i < 9; i++) {
    //行row列col檢查與num是否相同
    if (row * 9 + i !== index && board[row * 9 + i].num === num) return false;
    if (i * 9 + col !== index && board[i * 9 + col].num === num) return false;

    //九宮格
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    const boxId = (startRow + Math.floor(i / 3)) * 9 + (startCol + (i % 3));
    if (boxId !== index && board[boxId].num === num) return false;
  }

  return true;
};

export class Sudoku {
  constructor() {
    this.solutionCount = 0;
  }

  //生成
  generate() {
    const board = Array.from({ length: 81 }, (_, i) => ({
      id: i,
      row: Math.floor(i / 9),
      col: i % 9,
      num: 0,
      isFixed: true,
      isError: false,
    }));
    this.solutionCount = 0;
    this._backtrack(board, true);
    return board;
  }

  //驗證唯一
  solution(puzzleBoard) {
    this.solutionCount = 0;
    const temp = puzzleBoard.map((c) => ({ ...c }));
    this._backtrack(temp, false);
    return this.solutionCount;
  }

  //回溯法
  _backtrack(board, isRandom) {
    if (this.solutionCount >= 2) return;
    const index = board.findIndex((cell) => cell.num === 0);
    if (index === -1) {
      this.solutionCount++;
      return;
    }

    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (isRandom) nums = shuffle(nums);

    for (let n of nums) {
      if (isValid(board, index, n)) {
        board[index].num = n;
        this._backtrack(board, isRandom);

        if (this.solutionCount >= 1 && isRandom) return;

        board[index].num = 0;
      }
    }
  }

  //挖洞
  pokeHoles(fullBoard, config) {
    const puzzle = fullBoard.map((cell) => ({ ...cell, isFixed: true }));
    let indices = Array.from({ length: 41 }, (_, i) => i);
    indices = shuffle(indices);
    let removedCount = 0; //成功挖洞次數
    let failedCount = 0; //挖洞失敗次數
    for (let idx of indices) {
      //終止條件
      if (removedCount >= config.targetHoles) break; //挖洞數達到目標數
      if (failedCount >= config.attempts) break; //失敗數達到嘗試上限數
      if (81 - removedCount <= config.minClues) break; //線索達到保底提示數

      //略過挖洞之後遇到的對稱點
      if (puzzle[idx].num === 0) continue;

      //設置對稱點
      const symIdx = 80 - idx;
      const backupIdx = puzzle[idx].num;
      const backupSym = puzzle[symIdx].num;

      //試挖
      puzzle[idx].num = 0;
      puzzle[idx].isFixed = false;
      //避免中心點40重複執行
      if (idx !== symIdx) {
        puzzle[symIdx].num = 0;
        puzzle[symIdx].isFixed = false;
      }

      if (this.solution(puzzle) !== 1) {
        //不是唯一解 恢復原狀 失敗數+1
        puzzle[idx].num = backupIdx;
        puzzle[idx].isFixed = true;
        //避免中心點40重複執行
        if (idx !== symIdx) {
          puzzle[symIdx].num = backupSym;
          puzzle[symIdx].isFixed = true;
        }
        failedCount++;
      } else {
        //重置失敗數
        failedCount = 0;
        //計算挖洞次數 避免中心點40重複增加
        removedCount += idx === symIdx ? 1 : 2;
      }
    }
    return puzzle;
  }

  //驗證填入數字是否有衝突
  checkConflict(board, targetIdx, num) {
    //空格略過
    if (num === 0) return false;

    //找出目標格子的小區塊位置
    const { row: targetRow, col: targetCol } = board[targetIdx];
    const targetBox = Math.floor(targetRow / 3) * 3 + Math.floor(targetCol / 3);

    return board.some((cell, idx) => {
      //略過自身與不同數字的格子
      if (idx === targetIdx) return false;
      if (cell.num !== num) return false;

      //判斷 與目標格子數字相同 的行、列、小區塊 是否相同
      const isSameRow = cell.row === targetRow;
      const isSameCol = cell.col === targetCol;
      const isSameBox =
        Math.floor(cell.row / 3) * 3 + Math.floor(cell.col / 3) === targetBox;

      //回傳任一相同情況
      return isSameRow || isSameCol || isSameBox;
    });
  }

  async visualizeSolve(board, setBoard) {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const index = board.findIndex((cell) => cell.num === 0);

    // 終止條件：填完了
    if (index === -1) return true;

    for (let n = 1; n <= 9; n++) {
      if (isValid(board, index, n)) {
        // 1. 填入數字
        board[index].num = n;

        // 2. 更新 React 狀態（讓畫面渲染出這個數字）
        // 注意：這裡必須傳入盤面的複製品，React 才會偵測到變化
        setBoard([...board]);

        // 3. 關鍵：等待一秒
        await sleep(1000);

        // 4. 繼續往下走
        if (await this.visualizeSolve(board, setBoard)) {
          return true;
        }

        // 5. 回溯：如果這條路不通，清除數字
        board[index].num = 0;
        setBoard([...board]);
        await sleep(500); // 回溯時也可以停一下，讓玩家看到「撤退」的過程
      }
    }
    return false;
  }
}
