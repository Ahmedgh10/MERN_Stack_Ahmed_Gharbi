import React from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="app-container">
        <header className="header">
          <h1>
            Global State: <code>useContext</code> &amp; <code>Redux Toolkit</code>
          </h1>
          <p>
            Theme handled by Context (light state), cart handled by Redux Toolkit (transactional state).
          </p>
        </header>

        <div className="store-layout">
          <ProductList />
          <Cart />
        </div>
      </main>
    </>
  );
}
