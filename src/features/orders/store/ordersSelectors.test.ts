// src/features/orders/store/ordersSelectors.test.ts

import { describe, test, expect } from "vitest";
import type { RootState } from "../../../store"; // Importe le type de notre état global
import { OrderStates } from "../enums/Order-state.enum"; // Ou OrderStates.enum.ts
import type { IOrder } from "../types/Order.interface";

// On importe les sélecteurs que l'on veut tester
import {
  selectAllOrders,
  selectLoading,
  selectError,
  // selectPendingOrders // Un sélecteur dérivé qu'on pourrait créer pour l'exemple
} from "./ordersSelectors";

// On importe createSelector pour créer un sélecteur dérivé pour la démo de la mémoïsation
import { createSelector } from "@reduxjs/toolkit";

// --- Début de la configuration du test ---

describe("Orders Selectors", () => {
  // On crée un état global "mock" (simulé) qui servira de base pour tous nos tests.
  // Il représente à quoi pourrait ressembler notre RootState.
  const mockState: RootState = {
    orders: {
      orders: [
        {
          id: "1",
          title: "Commande A",
          amount: 100,
          status: OrderStates.PENDING,
          customer: "Client A",
        },
        {
          id: "2",
          title: "Commande B",
          amount: 200,
          status: OrderStates.COMPLETED,
          customer: "Client B",
        },
        {
          id: "3",
          title: "Commande C",
          amount: 300,
          status: OrderStates.PENDING,
          customer: "Client A",
        },
      ],
      currentOrder: null,
      loading: false,
      error: null,
    },
    // Si vous aviez d'autres slices, ils seraient ici :
    // customers: { ... },
  };

  // --- Tests pour les sélecteurs simples ---

  test("selectAllOrders doit retourner le tableau des commandes", () => {
    // On exécute le sélecteur avec notre état mocké
    const selectedOrders = selectAllOrders(mockState);
    // On vérifie que le résultat correspond bien à la partie attendue de l'état
    expect(selectedOrders).toEqual(mockState.orders.orders);
  });

  test("selectLoading doit retourner la valeur booléenne de loading", () => {
    // On exécute le sélecteur
    const selectedLoading = selectLoading(mockState);
    // On vérifie le résultat
    expect(selectedLoading).toBe(false);

    // On peut aussi tester le cas inverse
    const loadingState: RootState = {
      ...mockState,
      orders: { ...mockState.orders, loading: true },
    };
    const selectedLoadingTrue = selectLoading(loadingState);
    expect(selectedLoadingTrue).toBe(true);
  });

  test("selectError doit retourner la valeur de l'erreur ou null", () => {
    // Cas où l'erreur est null
    const selectedError = selectError(mockState);
    expect(selectedError).toBeNull();

    // Cas où il y a une erreur
    const errorState: RootState = {
      ...mockState,
      orders: { ...mockState.orders, error: "Erreur de chargement" },
    };
    const selectedErrorString = selectError(errorState);
    expect(selectedErrorString).toBe("Erreur de chargement");
  });

  // --- Test pour la mémoïsation d'un sélecteur dérivé ---

  test("un sélecteur dérivé doit être mémoïsé", () => {
    // Pour cet exemple, créons un sélecteur qui filtre les commandes "pending"
    const selectPendingOrders = createSelector(
      [selectAllOrders], // Notre sélecteur d'entrée
      (orders) => orders.filter((order) => order.status === OrderStates.PENDING) // Notre fonction de combinaison
    );

    // 1. Premier appel : le sélecteur calcule le résultat
    const firstResult = selectPendingOrders(mockState);
    expect(firstResult).toHaveLength(2); // Il y a bien 2 commandes PENDING

    // 2. Deuxième appel AVEC LE MÊME ÉTAT : le sélecteur ne doit pas recalculer
    const secondResult = selectPendingOrders(mockState);

    // L'assertion la plus importante : on vérifie que c'est la MÊME instance de tableau,
    // pas juste un tableau avec le même contenu. Cela prouve que le calcul n'a pas été refait.
    // .toBe() vérifie l'égalité référentielle (===).
    expect(secondResult).toBe(firstResult);
    console.log(
      "Mémoïsation réussie : le résultat est le même objet en mémoire."
    );

    // 3. Appel avec un NOUVEL ÉTAT, mais où les commandes N'ONT PAS changé
    // On simule un changement dans une autre partie du store (ex: loading a changé)
    const newStateWithOtherChanges: RootState = {
      ...mockState,
      orders: { ...mockState.orders, loading: true },
    };

    const thirdResult = selectPendingOrders(newStateWithOtherChanges);
    // Le résultat devrait toujours être le même que le premier, car la liste 'orders' (l'input du sélecteur) n'a pas changé.
    // Reselect est assez intelligent pour voir que l'input `selectAllOrders(newStateWithOtherChanges)` retourne le même tableau qu'avant.
    expect(thirdResult).toBe(firstResult);
    console.log(
      "Mémoïsation toujours active même si d'autres parties du state ont changé."
    );

    // 4. Appel avec un NOUVEL ÉTAT où les commandes ONT changé
    const newOrder: IOrder = {
      id: "4",
      title: "Commande D",
      amount: 400,
      status: OrderStates.PENDING,
      customer: "Client D",
    };
    const newStateWithNewOrder: RootState = {
      ...mockState,
      orders: {
        ...mockState.orders,
        orders: [...mockState.orders.orders, newOrder],
      },
    };

    const fourthResult = selectPendingOrders(newStateWithNewOrder);
    // Maintenant, le résultat doit être un NOUVEAU tableau.
    expect(fourthResult).not.toBe(firstResult);
    expect(fourthResult).toHaveLength(3); // Il y a maintenant 3 commandes PENDING
    console.log(
      "Le sélecteur a recalculé car les données d'entrée pertinentes ont changé."
    );
  });
});
