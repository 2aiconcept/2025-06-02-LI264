// src/features/products/redux/productSelectors.ts
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../store";
import type { IOrder } from "../types/Order.interface";

// Sélecteur de base
export const selectOrdersState = (state: RootState) => state.orders;

/**
 * Un sélecteur est une fonction pure qui extrait des données spécifiques
 * du state  de votre application
 * Redux Toolkit : Fournit l'utilitaire createSelector (qui vient en fait de la
 * bibliothèque Reselect)
 *
 * 2 types de selecteurs : selecteurs de base et
 * selecteurs dérivés (avec createSelector)
 *
 * un selecteur de base est ne simple fonction qui prend le state global et retourne
 * une partie spécifique (exemple le state products)
 *
 * un selecteur dérivé utilise d'autres selecteurs en entrée (ici selectProcutState)
 * il permet de récupérer des données directement du state sélectionné
 *
 * @exemple const products = useSelector(selectAllProducts);
 * avec notre hook personnalisé :
 * @empemple const products = useAppSelector(selectAllProducts);
 * avec typescript si probleme de typage
 * @exemple const products = useAppSelector((state) =>
     selectAllProducts(state)
   ) as IProduct[];
 */
// Sélecteurs dérivés
export const selectAllOrders = createSelector(
  [selectOrdersState],
  (state): IOrder[] => state.orders
);

export const selectCurrentOrder = createSelector(
  [selectOrdersState],
  (state): IOrder | null => state.currentOrder
);

export const selectLoading = createSelector(
  [selectOrdersState],
  (state): boolean => state.loading
);

export const selectError = createSelector(
  [selectOrdersState],
  (state): string | null => state.error
);

// Sélecteur avec paramètre
export const selectOrderById = (id: string) =>
  createSelector(
    [selectAllOrders],
    (orders): IOrder | null => orders.find((order) => order.id === id) || null
  );
