// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer, { saveState } from "./cartSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    users: userReducer,
  },
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false,
    }),
});

// Persist cart only
store.subscribe(() => {
  const state = store.getState();
  saveState(state.cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
