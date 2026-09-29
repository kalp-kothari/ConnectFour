import { useState } from 'react';
import GameBoard from './components/GameBoard';
import GameStatus from './components/GameStatus';
import ScoreBoard from './components/ScoreBoard';
import {
  createEmptyBoard,
  dropPiece,
  checkWinner,
  isBoardFull,
} from './utils/gameLogic';
import './App.css';

export default function App() {
  const [board, setBoard] = useState(createEmptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState('R');
  const [winner, setWinner] = useState(null);  // 'R' | 'Y' | null
  const [scores, setScores] = useState({ R: 0, Y: 0 });

  // Derived state — no extra flags stored in state
  const isDraw = !winner && isBoardFull(board);
  const isGameOver = Boolean(winner) || isDraw;

  function handleColumnSelect(col) {
    // Ignore clicks when the game is over
    if (isGameOver) return;

    // Try to drop the piece; null means the column is full
    const result = dropPiece(board, col, currentPlayer);
    if (result === null) return;

    const { newBoard, row } = result;

    if (checkWinner(newBoard, row, col, currentPlayer)) {
      // Current player has won
      setBoard(newBoard);
      setWinner(currentPlayer);
      setScores((prev) => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + 1,
      }));
    } else {
      // No winner yet — update board and switch turn
      setBoard(newBoard);
      setCurrentPlayer((prev) => (prev === 'R' ? 'Y' : 'R'));
      // isDraw is derived on the next render from the updated board
    }
  }

  function handleRestart() {
    // Reset board and turn; scores are intentionally preserved
    setBoard(createEmptyBoard());
    setCurrentPlayer('R');
    setWinner(null);
  }

  function handleResetScores() {
    setScores({ R: 0, Y: 0 });
  }

  return (
    <div className="app">
      <h1 className="title">Connect Four</h1>

      <ScoreBoard scores={scores} onResetScores={handleResetScores} />

      <GameStatus
        winner={winner}
        isDraw={isDraw}
        currentPlayer={currentPlayer}
      />

      <GameBoard
        board={board}
        onColumnSelect={handleColumnSelect}
        isGameOver={isGameOver}
      />

      <button className="btn btn--primary" onClick={handleRestart}>
        Restart Game
      </button>
    </div>
  );
}
