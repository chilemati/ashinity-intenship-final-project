import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer, { saveState } from "./cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: getDefault => getDefault({
    serializableCheck: false, // we only store plain objects, safe; disable to avoid false positives
  }),
});

// Persist cart to localStorage
store.subscribe(() => {
  const state = store.getState();
  saveState(state.cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
