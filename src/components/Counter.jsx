import React, { useState, useEffect } from 'react';

const MAX = 50; // Challenge 1: upper bound
const MIN = -50; // Challenge 1: lower bound

// Initialize count from localStorage (fallback to 0)
const loadCount = () => {
  const saved = localStorage.getItem('mon_compteur_valeur');
  const n = saved !== null ? parseInt(saved, 10) : 0;
  return Number.isNaN(n) ? 0 : n;
};

// Challenge 2: restore the history array (parsed back from JSON)
const loadHistory = () => {
  try {
    const saved = localStorage.getItem('mon_compteur_historique');
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export default function Counter() {
  const [count, setCount] = useState(loadCount);
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('No clicks yet');
  const [totalClics, setTotalClics] = useState(0);
  const [historique, setHistorique] = useState(loadHistory);

  // EFFECT A: synchronize the browser tab title
  useEffect(() => {
    document.title = 'Counter: ' + count;
  }, [count]);

  // EFFECT B: persist the counter value
  useEffect(() => {
    localStorage.setItem('mon_compteur_valeur', count.toString());
  }, [count]);

  // EFFECT C (Challenge 2): persist the full history
  useEffect(() => {
    localStorage.setItem('mon_compteur_historique', JSON.stringify(historique));
  }, [historique]);

  // Challenge 1: would the next change stay inside [-50, 50]?
  const canIncrement = count + step <= MAX;
  const canDecrement = count - step >= MIN;

  // direction: +1 or -1. Used by the buttons and by the keyboard.
  const change = (direction) => {
    const next = count + direction * step;
    if (next > MAX || next < MIN) return;

    setCount(next);
    setMessage((direction > 0 ? 'Added ' : 'Subtracted ') + step);
    setTotalClics(totalClics + 1);
    // New array (spread), never push() on the state array
    setHistorique([...historique, (direction > 0 ? '+' : '-') + step]);
  };

  const handleReset = () => {
    setCount(0);
    setMessage('Reset to zero');
    setTotalClics(totalClics + 1);
    setHistorique([]);
  };

  // EFFECT D (Challenge 3): keyboard control with mandatory cleanup
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = e.target.tagName;
      if (tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        change(1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        change(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [count, step, totalClics, historique]);

  // Dynamic styling based on the sign of the counter
  const getStyleClass = () => {
    if (count > 0) return 'counter-display positive';
    if (count < 0) return 'counter-display negative';
    return 'counter-display zero';
  };

  return (
    <div className="counter-card">
      <div className={getStyleClass()}>{count}</div>

      <div className="btn-group">
        <button className="btn btn-dec" onClick={() => change(-1)} disabled={!canDecrement}>
          -{step}
        </button>
        <button className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>
        <button className="btn btn-inc" onClick={() => change(1)} disabled={!canIncrement}>
          +{step}
        </button>
      </div>

      {!canIncrement && <p className="threshold-warning">Maximum threshold of {MAX} reached!</p>}
      {!canDecrement && <p className="threshold-warning">Minimum threshold of {MIN} reached!</p>}

      <div className="step-control">
        <label htmlFor="step-select">Increment Step:</label>
        <select
          id="step-select"
          value={step}
          onChange={(e) => {
            setStep(parseInt(e.target.value, 10));
            e.target.blur(); // gives the arrow keys back to the counter
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="history-card">
        <p>
          <strong>Last Action:</strong> {message}
        </p>
        <p>
          <strong>Total Clicks:</strong> {totalClics}
        </p>
        {historique.length > 0 && (
          <p>
            <strong>History:</strong> {historique.join(', ')}
          </p>
        )}
      </div>

      <p className="hint">Tip: click an empty area of the page, then use the ↑ and ↓ keys.</p>
    </div>
  );
}
