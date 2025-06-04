// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import ordersSlice from "../features/orders/store/ordersSlice";

// Store simple sans types complexes
export const store = configureStore({
  reducer: {
    orders: ordersSlice,
    // customers: customersReducer
  },
});

// Types de base pour les hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
