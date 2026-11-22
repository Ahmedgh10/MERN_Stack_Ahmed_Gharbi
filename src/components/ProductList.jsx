import React from 'react';
import ProductCard from './ProductCard';

const PRODUCTS = [
  { id: 1, name: 'Ecran UltraWide 4K 34"', price: 850, category: 'Display', icon: '🖥️', stock: 3 },
  { id: 2, name: 'Clavier Mecanique RGB', price: 180, category: 'Peripheral', icon: '⌨️', stock: 3 },
  { id: 3, name: 'Souris Sans Fil Ergonomique', price: 95, category: 'Accessory', icon: '🖱️', stock: 3 },
  { id: 4, name: 'Casque Haute Fidelite ANC', price: 320, category: 'Audio', icon: '🎧', stock: 3 }
];

export default function ProductList() {
  return (
    <div className="product-section panel">
      <div className="section-title-box">
        <h3>Product Catalog</h3>
        <p className="subtitle-hint">Clicking + Add triggers dispatch(addItem(product)).</p>
      </div>
      <div className="product-grid">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
