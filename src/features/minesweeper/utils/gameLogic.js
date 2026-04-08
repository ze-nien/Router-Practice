import { shuffle } from "../../../utils/shuffle";
//row橫向x col直向y

//生成棋盤
export const generateBoard = (rows, cols) => {
  return Array.from({ length: rows * cols }, (_, i) => ({
    id: i,
    row: Math.floor(i / cols),
    col: i % cols,
    isMine: false,
    neighborCount: 0,
    isRevealed: false,
    isFlagged: false,
  }));
};

//鄰居座標
const getNeighbors = (row, col, level) => {
  const neighbors = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i === 0 && j === 0) continue;
      const targetRow = row + i;
      const targetCol = col + j;
      if (
        targetRow < 0 ||
        targetCol < 0 ||
        targetRow >= level.row ||
        targetCol >= level.col
      )
        continue;
      neighbors.push({
        row: targetRow,
        col: targetCol,
        id: targetRow * level.col + targetCol,
      });
    }
  }
  return neighbors;
};

//生成地雷-擴散
export const plantMines = (board, level, startId, row, col) => {
  const neighbors = getNeighbors(row, col, level);

  //safeIds取得首點與鄰居id
  const safeIds = new Set([startId, ...neighbors.map((n) => n.id)]);

  //filter拿非safe區的所有格子
  //map回傳其Id作候選者
  const candidates = board
    .filter((cell) => !safeIds.has(cell.id))
    .map((candidate) => {
      return candidate.id;
    });

  //候選者洗牌後取level地雷數給mineId
  const mineId = shuffle(candidates).slice(0, level.mines);

  //mineBoard 設置地雷
  const mineBoard = board.map((cell) => {
    if (mineId.includes(cell.id)) {
      return { ...cell, isMine: true };
    }
    return cell;
  });

  //finalBoard 計算周圍地雷數
  const finalBoard = mineBoard.map((cell) => {
    //是地雷的跳過
    if (cell.isMine) return cell;

    //所有鄰居格{row,col,id}
    const cellNeighbor = getNeighbors(cell.row, cell.col, level);

    //轉ID檢查 filter過濾是地雷的 length代表數量
    const count = cellNeighbor.filter(({ id }) => {
      return mineBoard[id].isMine;
    }).length;
    return { ...cell, neighborCount: count };
  });

  //擴散
  const revealedBoard = runFloodFillDFS(finalBoard, startId, level);
  // const revealedBoard = runFloodFillBFS(finalBoard, startId, level);

  return revealedBoard;
};

//reveal閉包使用currentBoard 不影響finalBoard
//擴散BFS
const runFloodFillBFS = (finalBoard, startId, level) => {
  const currentBoard = [...finalBoard];
  const queue = [startId];
  const visited = new Set();

  while (queue.length > 0) {
    const id = queue.shift();
    if (visited.has(id)) continue;
    visited.add(id);
    if (
      currentBoard[id].isRevealed ||
      currentBoard[id].isFlagged ||
      currentBoard[id].isMine
    )
      continue;
    currentBoard[id] = { ...currentBoard[id], isRevealed: true };

    if (currentBoard[id].neighborCount === 0) {
      const currentNeighbors = getNeighbors(
        currentBoard[id].row,
        currentBoard[id].col,
        level,
      );
      currentNeighbors.forEach((neighbor) => {
        if (!currentBoard[neighbor.id].isRevealed) queue.push(neighbor.id);
      });
    }
  }
  return currentBoard;
};
//擴散DFS
const runFloodFillDFS = (finalBoard, startId, level) => {
  const currentBoard = [...finalBoard];

  const reveal = (id) => {
    if (
      currentBoard[id].isRevealed ||
      currentBoard[id].isFlagged ||
      currentBoard[id].isMine
    )
      return;
    currentBoard[id] = { ...currentBoard[id], isRevealed: true };

    if (currentBoard[id].neighborCount === 0) {
      const currentNeighbors = getNeighbors(
        currentBoard[id].row,
        currentBoard[id].col,
        level,
      );
      currentNeighbors.forEach((neighbor) => reveal(neighbor.id));
    }
  };

  reveal(startId);
  return currentBoard;
};

//點到地雷
export const revealAllMines = (board) => {
  return board.map((cell) => {
    if (cell.isMine) {
      return { ...cell, isRevealed: true };
    }
    return cell;
  });
};
