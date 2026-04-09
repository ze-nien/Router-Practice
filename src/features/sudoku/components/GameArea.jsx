import GameOverModal from "./GameOverModal";

const GameArea = ({ children, isGameOver, handleReStart, levelSelector }) => {
  return (
    <>
      <div className="flex flex-col">{children}</div>
      {isGameOver && (
        <GameOverModal
          handleReStart={handleReStart}
          levelSelector={levelSelector}
        />
      )}
    </>
  );
};

export default GameArea;
