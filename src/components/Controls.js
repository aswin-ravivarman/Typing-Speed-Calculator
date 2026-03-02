import React from "react";

function Controls({ onSubmit, onRestart, isSubmitted }) {
  return (
    <div className="d-flex gap-2">
      <button className="btn btn-success" onClick={onSubmit}>
        Submit
      </button>

      <button className="btn btn-secondary" onClick={onRestart}>
        Restart
      </button>
    </div>
  );
}

export default Controls;