// A single cell on the board. Renders an empty slot or a red/yellow piece.
// onClick is provided by GameBoard and calls onColumnSelect(colIndex) in App.
export default function Cell({ value, onClick }) {
  // Map board values to CSS class names for coloring
  const pieceClass =
    value === 'R' ? 'piece piece--red' :
    value === 'Y' ? 'piece piece--yellow' :
    'piece piece--empty';

  return (
    <div className="cell" onClick={onClick}>
      <div className={pieceClass} />
    </div>
  );
}
