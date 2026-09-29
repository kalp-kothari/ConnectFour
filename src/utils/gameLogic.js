// ─── Board constants ──────────────────────────────────────────────────────────
export const ROWS = 6;
export const COLS = 7;

// ─── Board creation ───────────────────────────────────────────────────────────

/** Returns a fresh 6×7 board filled with null. Row 0 is the top row. */
export function createEmptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

// ─── Piece placement ──────────────────────────────────────────────────────────

/**
 * Drops a piece into the given column. Scans from the bottom row upward to
 * find the first empty cell (gravity). Returns an object { newBoard, row }
 * on success, or null if the column is already full.
 *
 * Never mutates the original board — spreads each row into a new array.
 */
export function dropPiece(board, col, player) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === null) {
      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = player;
      return { newBoard, row };
    }
  }
  return null; // column is full
}

// ─── Win detection ────────────────────────────────────────────────────────────

/**
 * Counts consecutive matching pieces starting from (row, col) and walking in
 * the direction (dRow, dCol), not counting the starting cell itself.
 */
export function countInDirection(board, row, col, dRow, dCol, player) {
  let count = 0;
  let r = row + dRow;
  let c = col + dCol;

  while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
    count++;
    r += dRow;
    c += dCol;
  }

  return count;
}

/**
 * Checks whether the player who just placed a piece at (row, col) has won.
 * Tests all four axes by counting in both directions and adding 1 for the
 * placed piece itself. Returns true as soon as any axis reaches 4+.
 */
export function checkWinner(board, row, col, player) {
  const axes = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal ↘
    [1, -1],  // diagonal ↙
  ];

  for (const [dRow, dCol] of axes) {
    const count =
      1 +
      countInDirection(board, row, col, dRow, dCol, player) +
      countInDirection(board, row, col, -dRow, -dCol, player);

    if (count >= 4) return true;
  }

  return false;
}

// ─── Draw detection ───────────────────────────────────────────────────────────

/**
 * A board is full when no cell in the top row is empty.
 * (If row 0 is full, no more pieces can be dropped anywhere.)
 */
export function isBoardFull(board) {
  return board[0].every((cell) => cell !== null);
}
