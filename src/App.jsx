import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Counter from './components/Counter';
import AutoTimer from './components/AutoTimer';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

export default function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <>
      <Navbar />
      <main className="app-container">
        <Header
          title="MERN Labs 5 & 6"
          subtitle="React hooks (useState, useEffect) and global state (useContext + Redux Toolkit)"
        />

        {/* ---------- Session 5 ---------- */}
        <section className="lab-section">
          <h2 className="lab-title">Session 5: Hooks</h2>
          <Counter />
          <div className="timer-toggle">
            <button className="btn btn-reset" onClick={() => setShowTimer(!showTimer)}>
              {showTimer ? 'Hide Stopwatch' : 'Show Stopwatch'}
            </button>
          </div>
          {showTimer && <AutoTimer />}
        </section>

        {/* ---------- Session 6 ---------- */}
        <section className="lab-section">
          <h2 className="lab-title">Session 6: Global State</h2>
          <div className="store-layout">
            <ProductList />
            <Cart />
          </div>
        </section>
      </main>
    </>
  );
}
