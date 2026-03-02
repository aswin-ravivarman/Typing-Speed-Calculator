import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import ParagraphDisplay from "./components/ParagraphDisplay";
import TypingBox from "./components/TypingBox";
import Stats from "./components/Stats";
import Controls from "./components/Controls";
import paragraphs from "./data/paragraphs";

function App() {
  const [paragraph, setParagraph] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timerRef = useRef(null);

  // Load random paragraph
  const loadParagraph = () => {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    setParagraph(paragraphs[randomIndex]);
  };

  useEffect(() => {
    loadParagraph();
  }, []);

  // Start timer when typing starts
  useEffect(() => {
    if (userInput.length === 1 && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [userInput]);

  // Auto submit when time ends
  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft]);

  const calculateResults = () => {
    const timeSpent = (60 - timeLeft) / 60;
    const charsTyped = userInput.length;

    const calculatedWpm =
      timeSpent > 0 ? Math.round((charsTyped / 5) / timeSpent) : 0;

    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === paragraph[i]) {
        correctChars++;
      }
    }

    const calculatedAccuracy =
      userInput.length > 0
        ? ((correctChars / userInput.length) * 100).toFixed(2)
        : 0;

    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
  };

  const handleSubmit = () => {
    clearInterval(timerRef.current);
    calculateResults();
    setIsSubmitted(true);
  };

  const handleRestart = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;

    setUserInput("");
    setTimeLeft(60);
    setWpm(0);
    setAccuracy(0);
    setIsSubmitted(false);

    loadParagraph();
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Typing Speed Tester</h2>

        <ParagraphDisplay paragraph={paragraph} />

        <TypingBox
          userInput={userInput}
          setUserInput={setUserInput}
          disabled={isSubmitted || timeLeft === 0}
        />

        <Stats timeLeft={timeLeft} wpm={wpm} accuracy={accuracy} />

        <Controls
          onSubmit={handleSubmit}
          onRestart={handleRestart}
          isSubmitted={isSubmitted}
        />
      </div>
    </div>
  );
}

export default App;