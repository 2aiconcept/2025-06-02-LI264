// src/features/orders/redux/ordersSelectors.ts
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
 * un selecteur dérivé (ou mémorisé) utilise d'autres selecteurs en entrée (ici selectOrdersState)
 * il permet de récupérer des données directement du state sélectionné
 *
 * @exemple const orders = useSelector(selectAllOrderss);
 * avec notre hook personnalisé :
 * @empemple const orders = useAppSelector(selectAllOrders);
 * avec typescript si probleme de typage
 * @exemple const orders = useAppSelector((state) =>
     selectAllOrders(state)
   ) as IOrder[];
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
