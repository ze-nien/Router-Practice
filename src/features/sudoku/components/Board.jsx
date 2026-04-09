import Cell from "./Cell";

const Board = ({ currentLevel, board, selectedCell, setSelectedCell }) => {
  return (
    <>
      <div className="grid grid-cols-9">
        {currentLevel &&
          board.map((d) => {
            const isSameNum =
              selectedCell &&
              selectedCell.num !== 0 &&
              d.num === selectedCell.num;
            return (
              <Cell
                key={`${d.id}-${currentLevel}`}
                cellData={d}
                selectedCell={selectedCell}
                setSelectedCell={setSelectedCell}
                isSameNum={isSameNum}
              />
            );
          })}
      </div>
    </>
  );
};

export default Board;
