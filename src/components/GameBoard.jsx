import Cell from './Cell';
import { COLS } from '../utils/gameLogic';

/**
 * GameBoard renders two things:
 *   1. A row of column-drop buttons above the board.
 *   2. The 6×7 grid of Cell components.
 *
 * The parent (App) owns all state; this component only fires callbacks.
 */
export default function GameBoard({ board, onColumnSelect, isGameOver }) {
  return (
    <div className="board-wrapper">
      {/* Column drop buttons */}
      <div className="column-buttons">
        {Array.from({ length: COLS }, (_, col) => (
          <button
            key={col}
            className="column-btn"
            onClick={() => onColumnSelect(col)}
            disabled={isGameOver}
            aria-label={`Drop piece in column ${col + 1}`}
          >
            ▼
          </button>
        ))}
      </div>

      {/* The board grid */}
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => onColumnSelect(colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
}
