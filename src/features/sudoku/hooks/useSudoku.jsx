import { useRef, useCallback, useMemo, useState, useEffect } from "react";
import { Sudoku } from "../utils/gameLogic";
import { LEVELS } from "../constants/gameConfig";

export const useSudoku = (level, setIsGenerating) => {
  const sudoku = useMemo(() => new Sudoku(), []);
  const config = useMemo(() => LEVELS[level], [level]);

  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [history, setHistory] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [activeNumber, setActiveNumber] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);

  const isGeneratingRef = useRef(false);
  const MAX_MISTAKES = 3;
  const isGameOver = mistakes >= MAX_MISTAKES;

  const generateNewGame = useCallback(async () => {
    if (isGeneratingRef.current) return;
    isGeneratingRef.current = true;
    setIsGenerating(true);

    const emptyBoard = Array.from({ length: 81 }, (_, i) => {
      const row = Math.floor(i / 9);
      const col = i % 9;
      const box = Math.floor(row / 3) * 3 + Math.floor(col / 3);
      return {
        id: i,
        row: row,
        col: col,
        num: 0,
        box: box,
        isFixed: true,
        isError: false,
      };
    });

    try {
      setBoard(emptyBoard);
      setMistakes(0);
      setHistory([]);
      setSelectedCell(null);
      await new Promise((r) => setTimeout(r, 500));
      const fullBoard = sudoku.generate();
      setSolution(fullBoard);
      const gamePuzzle = sudoku.pokeHoles(fullBoard, config);
      setBoard(gamePuzzle);
    } finally {
      isGeneratingRef.current = false;
      setIsGenerating(false);
    }
  }, [sudoku, config, setIsGenerating]);

  useEffect(() => {
    generateNewGame();
  }, [generateNewGame]);

  const isGameFinished = useMemo(() => {
    if (isGameOver) return false;
    return board.every((c) => c.num !== 0 && !c.isError);
  }, [board, isGameOver]);

  //index位置 num欲填入數字
  const fillNumber = useCallback(
    (index, num) => {
      // 格子固定或數字沒變 略
      if (board[index].isFixed || board[index].num === num) return;

      const snapshot = board.map((cell) => ({ ...cell }));
      setHistory((prev) => [...prev, snapshot]);

      // 填錯數字邏輯
      const isError = num !== 0 && num !== solution[index]?.num;

      if (isError) {
        setMistakes((p) => p + 1);
      }

      setBoard((prev) => {
        return prev.map((c) => {
          if (c.id === index) {
            return {
              ...c,
              num: num,
              isError: num === 0 ? false : isError,
            };
          }
          return c;
        });
      });
    },
    [board, solution],
  );

  // Undo
  const handleUndo = useCallback(() => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const newHistory = [...prev];
      const lastBoard = newHistory.pop();
      setBoard(lastBoard);
      return newHistory;
    });
  }, []);

  const handleInput = useCallback(
    (num) => {
      if (!selectedCell || selectedCell.isFixed || isGameFinished) return;
      fillNumber(selectedCell.id, num);
      setActiveNumber(num);
    },
    [isGameFinished, selectedCell, fillNumber],
  );

  const handleClear = useCallback(() => {
    if (!selectedCell || selectedCell.isFixed) return;
    fillNumber(selectedCell.id, 0); // 清除就是填入 0
    setActiveNumber(null);
  }, [selectedCell, fillNumber]);

  const handleReStart = useCallback(() => {
    generateNewGame();
    setActiveNumber(null);
  }, [generateNewGame]);

  return {
    board,
    mistakes,
    maxMistakes: MAX_MISTAKES,
    selectedCell,
    setSelectedCell,
    activeNumber,
    handleInput,
    handleClear,
    handleUndo,
    handleReStart,
    canUndo: history.length > 0,
    isGameFinished,
    isGameOver,
    solution,
  };
};
