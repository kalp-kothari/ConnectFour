# Connect Four

A browser-based, two-player Connect Four game built with React and plain CSS. Two players share the same device and take turns dropping pieces into a 7×6 board. No backend, no accounts, no external APIs.

## Features

- Standard 7-column × 6-row board
- Player 1 (Red) vs Player 2 (Yellow), with a clear turn indicator
- Click a column arrow or any cell in a column to drop a piece
- Detects wins in all four directions: horizontal, vertical, and both diagonals
- Detects draws and blocks further moves after a win or draw
- Session score tracking, with Restart Game and Reset Scores buttons
- Responsive layout for desktop and mobile
- Keyboard-operable column buttons with `aria-label`s, and an `aria-live` status message

## Getting Started

Requires [Node.js](https://nodejs.org/) (v18 or newer).

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To create a production build:

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Cell.jsx         # One board slot (empty, red, or yellow)
│   ├── GameBoard.jsx    # Column buttons and the 6×7 grid of cells
│   ├── GameStatus.jsx   # Turn, win, or draw message
│   └── ScoreBoard.jsx   # Win counts and Reset Scores button
├── utils/
│   └── gameLogic.js     # Pure game rules, no React imports
├── App.jsx              # Game state and event handlers
├── App.css              # Component styles
├── index.css            # Base styles
└── main.jsx             # React entry point
```

## How It Works

**State lives in `App.jsx`:** `board`, `currentPlayer`, `winner`, and `scores`. Draw and game-over are derived from these values rather than stored separately, which avoids out-of-sync flags. Components receive data and handlers as props and only render.

**The board** is a 2D array, `board[row][col]`, where row 0 is the top. Each cell is `null` (empty), `'R'`, or `'Y'`.

**Move flow:**

1. A column is selected.
2. `dropPiece` finds the lowest empty cell in that column and returns a new board (state is never mutated), or `null` if the column is full.
3. `checkWinner` checks whether the move won.
4. If not, the turn passes to the other player. A full board with no winner is a draw.

**Win detection** runs only from the piece just placed. For each of four axes (horizontal `[0, 1]`, vertical `[1, 0]`, and diagonals `[1, 1]` and `[1, -1]`), it counts matching pieces in both directions and adds the placed piece:

```js
const count =
  1 +
  countInDirection(board, row, col, dRow, dCol, player) +
  countInDirection(board, row, col, -dRow, -dCol, player);

if (count >= 4) return true;
```

If any axis reaches 4 or more, the player who just moved wins.

## Tech Stack

- React (functional components and hooks)
- Vite
- Plain CSS
- JS