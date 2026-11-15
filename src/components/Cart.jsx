import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, clearCart, applyPromoCode } from '../redux/cartSlice';

export default function Cart() {
  const {
    items,
    totalCount,
    totalPrice,
    discountPercent,
    discountAmount,
    finalPrice,
    promoStatus
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = () => {
    dispatch(applyPromoCode(promoInput));
  };

  return (
    <div className="cart-card panel">
      <div className="cart-header">
        <h3>My Redux Cart</h3>
        {items.length > 0 && (
          <button className="btn-clear" onClick={() => dispatch(clearCart())}>
            Clear
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty.</p>
          <span className="empty-subtext">Add products to observe Redux reactivity.</span>
        </div>
      ) : (
        <div className="cart-body">
          <div className="cart-items-container">
            {items.map((item) => (
              <div key={item.id} className="cart-row">
                <span className="cart-item-icon">{item.icon}</span>
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">
                    {item.price} DT x {item.quantity} = <strong>{item.price * item.quantity} DT</strong>
                  </span>
                </div>
                <div className="cart-item-qty">
                  <button className="btn-qty" onClick={() => dispatch(removeItem(item.id))}>
                    -
                  </button>
                  <span className="qty-number">{item.quantity}</span>
                  <button
                    className="btn-qty"
                    onClick={() => dispatch(addItem(item))}
                    disabled={item.stock !== undefined && item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="promo-box">
            <input
              type="text"
              className="promo-input"
              placeholder="Promo code"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
            />
            <button className="btn btn-promo" onClick={handleApplyPromo}>
              Apply Promo Code
            </button>
          </div>
          {promoStatus === 'invalid' && <p className="promo-msg promo-error">Invalid promo code.</p>}
          {promoStatus === 'valid' && (
            <p className="promo-msg promo-ok">Promo code applied: {discountPercent}% off.</p>
          )}

          <div className="cart-total-box">
            <div className="total-row">
              <span>Total Items:</span>
              <strong>{totalCount}</strong>
            </div>
            {discountPercent > 0 && (
              <>
                <div className="total-row">
                  <span>Subtotal:</span>
                  <strong>{totalPrice} DT</strong>
                </div>
                <div className="total-row discount-row">
                  <span>Discount ({discountPercent}%):</span>
                  <strong>-{discountAmount} DT</strong>
                </div>
              </>
            )}
            <div className="total-row total-highlight">
              <span>Grand Total:</span>
              <strong className={'total-amount' + (discountPercent > 0 ? ' discounted' : '')}>
                {finalPrice} DT
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
