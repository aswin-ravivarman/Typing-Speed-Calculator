import React from "react";

function Stats({ timeLeft, wpm, accuracy }) {
  return (
    <div className="mb-3">
      <p><strong>Time Left:</strong> {timeLeft}s</p>
      <p><strong>Words Per Minute:</strong> {wpm}</p>
      <p><strong>Accuracy:</strong> {accuracy}%</p>
    </div>
  );
}

export default Stats;