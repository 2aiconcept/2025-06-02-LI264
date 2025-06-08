// src/features/Customers/redux/CustomersSelectors.ts
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../store";
import type { ICustomer } from "../types/Customer.interface";

/**
 * selector de base pour cibler la slice customers du state global
 * @param state
 * @returns
 */
export const selectCustomersState = (state: RootState) => state.customers;

/**
 * Selector pour récupérer tous les customers
 */
export const selectAllCustomers = createSelector(
  [selectCustomersState],
  (state): ICustomer[] => state.customers
);

/**
 * Selector pour récupérer le currentCustomer
 * currentCustomer mémorise le customer selectionné par son id
 */
export const selectCurrentCustomer = createSelector(
  [selectCustomersState],
  (state): ICustomer | null => state.currentCustomer
);

/**
 * selector pour récupérer la valeur de loading dans le state
 */
export const selectLoading = createSelector(
  [selectCustomersState],
  (state): boolean => state.loading
);

/**
 * selector pour récupérer la valeur de error dans le state
 */
export const selectError = createSelector(
  [selectCustomersState],
  (state): string | null => state.error
);
