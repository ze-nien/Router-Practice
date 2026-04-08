const Cell = ({ cell, onCellClick, onToggleFlag }) => {
  const { isRevealed, isMine, isFlagged, neighborCount } = cell;
  const renderContent = () => {
    if (!isRevealed) return isFlagged ? "🚩" : "";
    if (isMine) return "💣";
    return neighborCount > 0 ? neighborCount : "";
  };

  const getCountColor = (count) => {
    switch (count) {
      case 1:
        return "text-blue-600";
      case 2:
        return "text-green-600";
      case 3:
        return "text-red-600";
      case 4:
        return "text-blue-900";
      default:
        return "text-red-800";
    }
  };

  return (
    <div
      className={`
        flex items-center justify-center border font-bold select-none
        ${!isRevealed ? "bg-gray-100  cursor-pointer" : "bg-gray-300"}
        ${isRevealed && !isMine && neighborCount > 0 ? getCountColor(neighborCount) : ""}
        ${isRevealed && isMine ? "bg-red-500" : ""}
      `}
      onClick={onCellClick}
      onContextMenu={onToggleFlag}
    >
      {renderContent()}
    </div>
  );
};

export default Cell;
