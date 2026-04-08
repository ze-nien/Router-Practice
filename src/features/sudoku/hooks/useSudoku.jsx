import { useRef, useCallback, useMemo, useState, useEffect } from "react";
import { Sudoku } from "../utils/gameLogic";
import { LEVELS } from "../constants/gameConfig";

export const useSudoku = (level) => {
  const sudoku = useMemo(() => new Sudoku(), []);
  const config = useMemo(() => LEVELS[level], [level]);
  const initialData = useMemo(() => {
    const full = sudoku.generate();
    const puzzle = sudoku.pokeHoles(full, config);
    const sol = full.map((c) => c.num);
    return { puzzle, sol };
  }, [sudoku, config]);

  const [board, setBoard] = useState(initialData.puzzle);
  const [isGenerating, setIsGenerating] = useState(false);
  const isGeneratingRef = useRef(false);
  const [solution, setSolution] = useState(initialData.sol);
  const [mistakes, setMistakes] = useState(0);
  const MAX_MISTAKES = 3;
  const isGameOver = mistakes >= MAX_MISTAKES;

  useEffect(() => {
    setBoard(initialData.puzzle);
    setSolution(initialData.sol);
  }, [initialData]);

  //生成棋盤
  const generateNewGame = useCallback(async () => {
    if (isGeneratingRef.current) return;
    isGeneratingRef.current = true;
    setIsGenerating(true);
    setMistakes(0);
    await new Promise((r) => setTimeout(r, 500));
    try {
      const fullBoard = sudoku.generate();
      const gamePuzzle = sudoku.pokeHoles(fullBoard, config);
      setBoard(gamePuzzle);
      setSolution(fullBoard.map((c) => c.num));
    } finally {
      isGeneratingRef.current = false;
      setIsGenerating(false);
    }
  }, [sudoku, config]);

  //更新棋盤 index選擇的位置 num填入之數字
  const fillNumber = useCallback(
    (index, num) => {
      //保留字return
      if (board[index].isFixed) return;
      //數字沒變
      if (board[index].num === num) return;

      const isWrong = num !== 0 && sudoku.checkConflict(board, index, num);
      if (isWrong) setMistakes((p) => p + 1);

      setBoard((prev) => {
        const newBoard = prev.map((c, i) => (i === index ? { ...c, num } : c));
        return newBoard.map((c, i) => ({
          ...c,
          isError: c.num !== 0 && sudoku.checkConflict(newBoard, i, c.num),
        }));
      });
    },
    [board, sudoku],
  );

  async function handleVisualize() {
    const copy = JSON.parse(JSON.stringify(board));
    await sudoku.visualizeSolve(copy, setBoard);
  }

  return {
    board,
    generateNewGame,
    handleVisualize,
    isGenerating,
    fillNumber,
    mistakes,
    maxMistakes: MAX_MISTAKES,
    isGameOver,
  };
};
