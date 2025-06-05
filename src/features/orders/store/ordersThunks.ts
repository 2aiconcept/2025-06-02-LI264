// src/features/products/redux/productEffects.ts

import {
  setLoading,
  setOrders,
  setOrdersError,
  setCurrentOrder,
  addOrderSuccess,
  updateOrderSuccess,
} from "./ordersSlice";

import type { AppDispatch, RootState } from "../../../store";
import type { IOrder } from "../types/Order.interface";
import { ordersService } from "../services/Orders.service";
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
 * thunk  pour récupérer tous les orders
 *
 * Dispatche les actions:
 * - setLoading(true/false)
 * - setOrderss(orders) en cas de succès
 * - setOrdersError(message) en cas d'erreur
 */
export const fetchOrders = () => {
  // Le thunk retourne une fonction asynchrone qui reçoit `dispatch`
  return async (dispatch: AppDispatch) => {
    // On utilise un bloc try...catch...finally pour une gestion robuste des erreurs
    try {
      // Étape 1 : Préparer l'état pour le début de l'opération
      // On indique que le chargement commence et on efface les erreurs précédentes.
      dispatch(setLoading(true));
      dispatch(setOrdersError(null));

      // Étape 2 : Effectuer l'opération asynchrone (l'appel API)
      const orders = await ordersService.getAll();

      // Étape 3 (Succès) : Mettre à jour l'état avec les données reçues
      dispatch(setOrders(orders));
    } catch (error) {
      // Étape 3 (Échec) : Gérer l'erreur si l'appel API échoue

      // On formate un message d'erreur clair
      let message = "Une erreur est survenue lors du chargement des commandes"; // Corrigé
      if (error instanceof Error) {
        message = error.message;
      }
      // On met à jour l'état avec le message d'erreur
      dispatch(setOrdersError(message));
    } finally {
      // Étape 4 (Toujours exécutée) : Nettoyage après l'opération
      // On s'assure que l'état de chargement est bien remis à false,
      // que l'opération ait réussi ou échoué.
      dispatch(setLoading(false));
    }
  };
};

/**
 * thunk  pour récupérer un order par son ID
 *
 * @param id L'identifiant du order à récupérer
 */
export const fetchOrderById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      // Étape 1 : Préparer l'état pour le début de l'opération
      // On indique que le chargement commence et on efface les erreurs précédentes.

      dispatch(setLoading(true));
      dispatch(setOrdersError(null));

      const order = await ordersService.getById(id);

      // Étape 3 (Succès) : Mettre à jour l'état avec les données reçues
      dispatch(setCurrentOrder(order));
    } catch (error) {
      // Étape 3 (Échec) : Gérer l'erreur si l'appel API échoue
      let message = `Erreur lors de la récupération de l'order (ID: ${id})`;
      if (error instanceof Error) {
        message = error.message;
      }
      // On met à jour l'état avec le message d'erreur
      dispatch(setOrdersError(message));
    } finally {
      // Étape 4 (Toujours exécutée) : Nettoyage après l'opération
      // On s'assure que l'état de chargement est bien remis à false,
      // que l'opération ait réussi ou échoué.
      dispatch(setLoading(false));
    }
  };
};

/**
 * thunk  pour ajouter un nouveau order
 *
 * @param order  à ajouter (sans ID, qui sera généré par l'API)
 */
export const addOrder = (order: IOrder) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setOrdersError(null));

      const newOrder = await ordersService.create(order);

      dispatch(addOrderSuccess(newOrder));
    } catch (error) {
      let message = "Erreur lors de l'ajout de l'order";
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
 * tunk  pour update un order existant
 *
 * @param  Le order modifié (doit contenir un ID valide)
 */
export const updateOrderEffect = (order: IOrder) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setOrdersError(null));

      // Appel API pour mettre à jour le order
      const updatedOrder = await ordersService.update(order);

      // Mettre à jour le order dans le store
      dispatch(updateOrderSuccess(updatedOrder));
    } catch (error) {
      let message = `Erreur lors de la mise à jour de l'order (ID: ${order.id})`;
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
 * thunk  pour delete un order
 *
 * @param id L'identifiant du produit à supprimer
 */
export const deleteOrderEffect = (id: string) => {
  // Le thunk peut recevoir getState comme deuxième argument, ce qui est utile pour lire l'état actuel.
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // On indique que l'opération "supprimer et rafraîchir" a commencé.
    dispatch(setLoading(true));
    dispatch(setOrdersError(null)); // On réinitialise les erreurs précédentes

    try {
      // 1. Appel API pour supprimer la commande sur le serveur
      await ordersService.delete(id);

      // 2. Logique conditionnelle : on ne nettoie 'currentOrder' que
      //    si la commande supprimée était celle actuellement sélectionnée.
      //    getState() nous donne accès à l'état actuel du store.
      if (getState().orders.currentOrder?.id === id) {
        dispatch(setCurrentOrder(null));
      }

      // 3. Re-synchroniser la liste avec la base de données en appelant le thunk fetchOrders.
      //    Le thunk fetchOrders s'occupera lui-même de mettre à jour la liste et de gérer
      //    la fin de l'état de chargement en cas de succès.
      //    Nous utilisons await dispatch(fetchOrders()); pour mettre en pause l'exécution du
      //    thunk deleteOrderEffect jusqu'à ce que le thunk fetchOrders ait complètement terminé
      //    sa mission de récupération des données.
      //     Dans notre cas, c'est utile pour s'assurer que le rafraîchissement des données est terminé avant que
      //    deleteOrderEffect ne se termine lui-même. Si le fetchOrders échouait, l'await
      //    rejetterait la promesse et l'erreur serait attrapée par le bloc
      //    catch de deleteOrderEffect
      await dispatch(fetchOrders());
    } catch (error) {
      // Gérer une erreur qui pourrait survenir UNIQUEMENT pendant l'appel à ordersService.delete().
      // Les erreurs de fetchOrders() sont gérées dans le thunk fetchOrders() lui-même.
      const message =
        error instanceof Error
          ? error.message
          : `Erreur lors de la suppression de la commande (ID: ${id})`;
      dispatch(setOrdersError(message));

      // Important de stopper le loading ici en cas d'échec de la suppression elle-même,
      // car le dispatch de fetchOrders() ne sera pas atteint.
      dispatch(setLoading(false));
    }
  };
};
