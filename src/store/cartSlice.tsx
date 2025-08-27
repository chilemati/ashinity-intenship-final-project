import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { parseMoney } from "./api";
import type { Product } from "./api";
import type { RootState } from "./store";

// ---- Types ----
export type CartLine = {
  productId: string;
  name: string;
  img: string;
  unitPrice: number;
  quantity: number;
};

export type CartState = {
  items: Record<string, CartLine>;
  wishlist: Record<string, true>;
};

// ---- Persistence helpers ----
const STORAGE_KEY = "ec_cart_v1";

const loadState = (): CartState | undefined => {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return undefined;
    return parsed as CartState;
  } catch {
    return undefined;
  }
};

export const saveState = (state: CartState) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
};

// ---- Initial ----
const initialState: CartState =
  loadState() ?? {
    items: {},
    wishlist: {},
  };

// ---- Slice ----
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) {
      const { product, quantity = 1 } = action.payload;
      const id = String(product.id);
      const unitPrice = parseMoney(product.price);

      const line = state.items[id];
      if (line) {
        line.quantity = Math.min(999, line.quantity + quantity);
      } else {
        state.items[id] = {
          productId: id,
          name: product.name,
          img: product.img,
          unitPrice,
          quantity: Math.max(1, Math.min(999, quantity)),
        };
      }

      if (state.wishlist[id]) delete state.wishlist[id];
      saveState(state); // persist
    },

    removeFromCart(state, action: PayloadAction<{ productId: string | number }>) {
      const id = String(action.payload.productId);
      delete state.items[id];
      saveState(state);
    },

    updateQuantity(
      state,
      action: PayloadAction<{ productId: string | number; quantity: number }>
    ) {
      const id = String(action.payload.productId);
      const q = Math.max(1, Math.min(999, Math.floor(action.payload.quantity)));
      if (state.items[id]) {
        state.items[id].quantity = q;
      }
      saveState(state);
    },

    clearCart(state) {
      state.items = {};
      saveState(state);
    },

    // Wishlist
    toggleWishlist(state, action: PayloadAction<{ productId: string | number }>) {
      const id = String(action.payload.productId);
      if (state.wishlist[id]) delete state.wishlist[id];
      else state.wishlist[id] = true;
      saveState(state);
    },

    addToWishlist(state, action: PayloadAction<{ productId: string | number }>) {
      const id = String(action.payload.productId);
      state.wishlist[id] = true;
      saveState(state);
    },

    removeFromWishlist(
      state,
      action: PayloadAction<{ productId: string | number }>
    ) {
      const id = String(action.payload.productId);
      delete state.wishlist[id];
      saveState(state);
    },

    moveWishlistItemToCart(
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) {
      const { product, quantity = 1 } = action.payload;
      const id = String(product.id);
      const unitPrice = parseMoney(product.price);
      const line = state.items[id];

      if (line) line.quantity = Math.min(999, line.quantity + quantity);
      else {
        state.items[id] = {
          productId: id,
          name: product.name,
          img: product.img,
          unitPrice,
          quantity: Math.max(1, Math.min(999, quantity)),
        };
      }

      if (state.wishlist[id]) delete state.wishlist[id];
      saveState(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleWishlist,
  addToWishlist,
  removeFromWishlist,
  moveWishlistItemToCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// ---- Selectors ----
export const selectCartItems = (s: RootState) => Object.values(s.cart.items);

export const selectCartItemById = (id: string | number) => (s: RootState) =>
  s.cart.items[String(id)];

export const selectCartCount = (s: RootState) =>
  Object.values(s.cart.items).reduce((sum, l) => sum + l.quantity, 0);

export const selectCartSubtotal = (id: string | number) => (s: RootState) => {
  const line = s.cart.items[String(id)];
  return line ? line.unitPrice * line.quantity : 0;
};

export const selectCartTotal = (s: RootState) =>
  Object.values(s.cart.items).reduce(
    (sum, l) => sum + l.unitPrice * l.quantity,
    0
  );

export const selectWishlistIds = (s: RootState) => Object.keys(s.cart.wishlist);
export const selectIsWishlisted = (id: string | number) => (s: RootState) =>
  !!s.cart.wishlist[String(id)];
