// src/features/products/redux/productEffects.ts

import {
  setLoading,
  setOrders,
  setOrdersError,
  setCurrentOrder,
  addOrderSuccess,
  updateOrderSuccess,
  deleteOrderSuccess,
} from "./ordersSlice";

import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../services/Orders.service";

import type { AppDispatch } from "../../../store";
import type { IOrder } from "../types/Order.interface";
import { OrderStates } from "../enums/Order-state.enum";
/**
 * Avec redux toolkit thunk est un middleware
 * les effects sont des fonctions pour gérer les appels api et effets de bord
 * les effects ne sont pas des actions avec un type et un payload
 * @exemple dispatch(fetchProduct())
 * thunk middleware capte tous les dispatch dans le code et verifie
 * en arrière plan si ce qui est passé au dispatch est un objet action (type+payload)
 * ou une fonction qu'il doit exécuter (faire apel api et dispatch en retour une action)
 *
 */

/**
 * thunk effect pour récupérer tous les produits
 *
 * Dispatche les actions:
 * - setLoading(true/false)
 * - setProducts(products) en cas de succès
 * - setProductsError(message) en cas d'erreur
 */
export const fetchOrders = () => {
  return async (dispatch: AppDispatch) => {
    try {
      // Début du chargement
      dispatch(setLoading(true));

      // Appel API
      const orders = await getAllOrders();

      // Succès
      dispatch(setOrders(orders));
    } catch (error) {
      // Erreur
      let message = "Une erreur est survenue lors du chargement des produits";
      if (error instanceof Error) {
        message = error.message;
      }
      dispatch(setOrdersError(message));
    } finally {
      // Fin du chargement
      dispatch(setLoading(false));
    }
  };
};

/**
 * thunk effect pour récupérer un order par son ID
 *
 * @param id L'identifiant du order à récupérer
 */
export const fetchOrderById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const product = await getOrderById(id);

      // Stocker le produit comme produit courant
      dispatch(setCurrentOrder(product));
    } catch (error) {
      let message = `Erreur lors de la récupération du produit (ID: ${id})`;
      if (error instanceof Error) {
        message = error.message;
      }
      dispatch(setOrdersError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

/**
 * thunk effect pour ajouter un nouveau produit
 *
 * @param product Le produit à ajouter (sans ID, qui sera généré par l'API)
 */
export const addOrder = (order: IOrder) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      // Appel API pour créer le order
      const newOrder = await createOrder(order);

      // Ajouter le nouveau order au store
      dispatch(addOrderSuccess(newOrder));

      // Optionnel: définir comme order courant
      dispatch(setCurrentOrder(newOrder));
    } catch (error) {
      let message = "Erreur lors de l'ajout du produit";
      if (error instanceof Error) {
        message = error.message;
      }
      dispatch(setOrdersError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

/**
 * tunk effect pour update un order existant
 *
 * @param order Le order modifié (doit contenir un ID valide)
 */
export const updateOrderEffect = (order: IOrder) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      // Appel API pour mettre à jour le order
      const updatedOrder = await updateOrder(order);

      // Mettre à jour le order dans le store
      dispatch(updateOrderSuccess(updatedOrder));

      // Mettre à jour le order courant
      dispatch(setCurrentOrder(updatedOrder));
    } catch (error) {
      let message = `Erreur lors de la mise à jour du produit (ID: ${order.id})`;
      if (error instanceof Error) {
        message = error.message;
      }
      dispatch(setOrdersError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

/**
 * thunk effect pour delete un order
 *
 * @param id L'identifiant du produit à supprimer
 */
export const deleteOrderEffect = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      // Appel API pour supprimer le order
      await deleteOrder(id);

      // Supprimer le order du store
      dispatch(deleteOrderSuccess(id));

      // Si c'était le order courant, le réinitialiser
      dispatch(setCurrentOrder(null));
    } catch (error) {
      let message = `Erreur lors de la suppression du produit (ID: ${id})`;
      if (error instanceof Error) {
        message = error.message;
      }
      dispatch(setOrdersError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

/**
 * effect pour effacer les erreurs
 * Utile après avoir affiché un message d'erreur
 */
export const clearError = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setOrdersError(null));
  };
};
