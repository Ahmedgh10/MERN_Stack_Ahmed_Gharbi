import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  // Challenge 3: minimal selector, returns a number so only this card re-renders
  const inCart = useSelector(
    (state) => state.cart.items.find((item) => item.id === product.id)?.quantity ?? 0
  );
  const outOfStock = inCart >= product.stock;

  return (
    <div className={'product-card' + (outOfStock ? ' is-out' : '')}>
      <div className="card-top">
        <span className="product-icon">{product.icon}</span>
        <span className="product-category">{product.category}</span>
      </div>
      <h4 className="product-title">{product.name}</h4>
      <p className="stock-line">
        {product.stock - inCart} of {product.stock} left
      </p>
      <div className="card-bottom">
        <span className="product-price">{product.price} DT</span>
        {outOfStock && <span className="badge-out">Out of Stock</span>}
        <button
          className="btn btn-add"
          onClick={() => dispatch(addItem(product))}
          disabled={outOfStock}
        >
          + Add
        </button>
      </div>
    </div>
  );
}
