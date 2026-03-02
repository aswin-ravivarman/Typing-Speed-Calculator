import React from "react";

function ParagraphDisplay({ paragraph }) {
  return (
    <div className="mb-3 p-3 border rounded bg-light">
      <h5>Paragraph:</h5>
      <p>{paragraph}</p>
    </div>
  );
}

export default ParagraphDisplay;