import React from "react";

function TypingBox({ userInput, setUserInput, disabled }) {
  return (
    <div className="mb-3">
      <textarea
        className="form-control"
        rows="4"
        placeholder="Start typing here..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
}

export default TypingBox;