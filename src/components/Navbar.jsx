import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  // Lightweight UI state via Context
  const { theme, toggleTheme } = useTheme();
  // Targeted Redux state: this component only re-renders when the count changes
  const totalCount = useSelector((state) => state.cart.totalCount);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="logo-icon">⚡</span>
        <h2>
          TechStore <span className="badge-mern">MERN S6</span>
        </h2>
      </div>
      <div className="nav-actions">
        <button className="btn-theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
        <div className="cart-badge">
          <span className="cart-icon">🛒</span>
          <span className="badge-count">{totalCount}</span>
        </div>
      </div>
    </nav>
  );
}
