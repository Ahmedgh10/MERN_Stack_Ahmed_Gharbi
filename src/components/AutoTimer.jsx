import React, { useState, useEffect } from 'react';

export default function AutoTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    // MANDATORY CLEANUP: runs when isRunning changes or on unmount
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  return (
    <div className="timer-box">
      <span>
        Auto Stopwatch: <strong>{seconds}s</strong>
      </span>
      <button className="btn btn-small" onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
}
