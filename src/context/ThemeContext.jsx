import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the context object
export const ThemeContext = createContext(null);

// 2. Provider component holding the state
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('app_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  // Persist the choice and expose it to the CSS (data-theme drives the colour variables)
  useEffect(() => {
    localStorage.setItem('app_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook for clean consumption
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
