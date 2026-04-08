import Cell from "./Cell";

const Board = ({ currentLevel, board, selectedCell, setSelectedCell }) => {
  return (
    <>
      <div className="grid grid-cols-9">
        {currentLevel &&
          board.map((d) => {
            return (
              <Cell
                key={`${d.id}-${currentLevel}`}
                cellData={d}
                selectedCell={selectedCell}
                setSelectedCell={setSelectedCell}
              />
            );
          })}
      </div>
    </>
  );
};

export default Board;
