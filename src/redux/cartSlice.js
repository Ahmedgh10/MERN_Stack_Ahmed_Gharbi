import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'techstore_cart';
const PROMO_CODE = 'POLY2027';
const PROMO_PERCENT = 20;

// Challenge 1: read the saved cart (safe against missing or corrupted data)
const loadItems = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveItems = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage full or unavailable: the cart still works in memory */
  }
};

// Internal utility to recalculate every derived total
const recalculateTotals = (state) => {
  state.totalCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  state.discountAmount = Math.round(state.totalPrice * state.discountPercent) / 100;
  state.finalPrice = state.totalPrice - state.discountAmount;
};

const buildInitialState = () => {
  const state = {
    items: loadItems(), // [{ id, name, price, quantity, icon, stock }]
    totalCount: 0, // total quantity of items
    totalPrice: 0, // subtotal in DT, before discount
    discountPercent: 0, // Challenge 2
    discountAmount: 0,
    finalPrice: 0, // subtotal minus discount
    promoStatus: null // null | 'valid' | 'invalid'
  };
  recalculateTotals(state);
  return state;
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: buildInitialState(),
  reducers: {
    // 1. Add item or increment quantity if it already exists
    addItem: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        // Challenge 3: never go above the stock, even if the UI is bypassed
        if (existing.stock !== undefined && existing.quantity >= existing.stock) return;
        existing.quantity += 1; // direct mutation, handled by Immer
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      recalculateTotals(state);
      saveItems(state.items);
    },

    // 2. Decrement quantity, or remove the line when it reaches zero
    removeItem: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload);
      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      }
      recalculateTotals(state);
      saveItems(state.items);
    },

    // 3. Clear the cart (and any promo code)
    clearCart: (state) => {
      state.items = [];
      state.discountPercent = 0;
      state.promoStatus = null;
      recalculateTotals(state);
      saveItems(state.items);
    },

    // 4. Challenge 2: promo code
    applyPromoCode: (state, action) => {
      const code = String(action.payload || '').trim().toUpperCase();
      if (code === PROMO_CODE) {
        state.discountPercent = PROMO_PERCENT;
        state.promoStatus = 'valid';
      } else {
        state.promoStatus = 'invalid';
      }
      recalculateTotals(state);
    }
  }
});

export const { addItem, removeItem, clearCart, applyPromoCode } = cartSlice.actions;
export default cartSlice.reducer;
