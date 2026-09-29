/**
 * GameStatus shows the current game state to the user.
 * It lives in an aria-live region so screen readers announce changes.
 */
export default function GameStatus({ winner, isDraw, currentPlayer }) {
  let message;

  if (winner === 'R') {
    message = '🔴 Player 1 (Red) wins!';
  } else if (winner === 'Y') {
    message = '🟡 Player 2 (Yellow) wins!';
  } else if (isDraw) {
    message = "It's a draw!";
  } else if (currentPlayer === 'R') {
    message = "🔴 Player 1's turn (Red)";
  } else {
    message = "🟡 Player 2's turn (Yellow)";
  }

  return (
    // aria-live="polite" causes screen readers to announce status changes
    <div className="game-status" aria-live="polite" role="status">
      <p className="status-text">{message}</p>
    </div>
  );
}
