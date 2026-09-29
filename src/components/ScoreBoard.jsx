/** Displays win counts for both players and the Reset Scores button. */
export default function ScoreBoard({ scores, onResetScores }) {
  return (
    <div className="scoreboard">
      <div className="score-item score-item--red">
        <span className="score-label">Player 1 (Red)</span>
        <span className="score-value">{scores.R}</span>
      </div>

      <button className="btn btn--secondary" onClick={onResetScores}>
        Reset Scores
      </button>

      <div className="score-item score-item--yellow">
        <span className="score-label">Player 2 (Yellow)</span>
        <span className="score-value">{scores.Y}</span>
      </div>
    </div>
  );
}
