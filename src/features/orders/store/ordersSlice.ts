import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IOrder } from "../types/Order.interface";

// 1. Définition de l'état
interface OrdersState {
  orders: IOrder[];
  currentOrder: IOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

// 2. Création du slice (combine reducer et actions)
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Actions pour la liste des produits
    setOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload;
      state.error = null;
    },
    setOrdersError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    // Actions pour un order spécifique
    setCurrentOrder: (state, action: PayloadAction<IOrder | null>) => {
      state.currentOrder = action.payload;
    },

    // Actions pour CRUD
    addOrderSuccess: (state, action: PayloadAction<IOrder>) => {
      state.orders.push(action.payload);
      state.error = null;
    },
    updateOrderSuccess: (state, action: PayloadAction<IOrder>) => {
      const index = state.orders.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
      state.error = null;
    },
    deleteOrderSuccess: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((p) => p.id !== action.payload);
      state.error = null;
    },
  },
});
export default ordersSlice.reducer;
