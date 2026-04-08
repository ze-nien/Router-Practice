//targetHoles目標挖洞數
//attempts失敗嘗試上限
//minClues保底提示數

export const LEVELS = {
  EASY: {
    name: "EASY",
    targetHoles: 40,
    attempts: 30,
    minClues: 38,
  },
  NORMAL: {
    name: "NORMAL",
    targetHoles: 50,
    attempts: 80,
    minClues: 28,
  },
  HARD: {
    name: "HARD",
    targetHoles: 56,
    attempts: 150,
    minClues: 22,
  },
};
