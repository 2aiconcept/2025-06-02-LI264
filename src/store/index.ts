// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "../features/orders/store/ordersSlice";
import customersReducer from "../features/customers/store/customersSlice";

// Store simple sans types complexes
export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    customers: customersReducer,
  },
});

// Types de base pour les hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
