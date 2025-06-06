// src/features/orders/store/ordersSlice.test.ts

import { describe, test, expect } from "vitest";
// On importe le reducer, les actions, et l'état initial depuis notre slice
import ordersReducer, {
  setLoading,
  setOrders,
  setOrdersError,
  deleteOrderSuccess,
  initialState, // Assurez-vous d'exporter initialState depuis votre slice pour ce test
} from "./ordersSlice";
import type { IOrder } from "../types/Order.interface";
import { OrderStates } from "../enums/Order-state.enum"; // Ou votre chemin correct

// --- Début de la configuration du test ---

describe("ordersSlice Reducer", () => {
  // Test 1: L'état initial
  test("doit retourner l'état initial si aucune action ne correspond", () => {
    // On appelle le reducer avec un état undefined et une action inconnue.
    // Il doit obligatoirement retourner l'état initial que nous avons défini.
    const result = ordersReducer(undefined, { type: "action_inconnue" });
    expect(result).toEqual(initialState);
  });

  // Test 2: Le reducer setLoading
  test("doit gérer setLoading pour passer loading à true", () => {
    // ARRANGE: On part de l'état initial (où loading est false)
    const action = setLoading(true); // On crée l'action avec le payload 'true'

    // ACT: On exécute le reducer avec l'état initial et l'action
    const newState = ordersReducer(initialState, action);

    // ASSERT: On vérifie que le nouvel état a bien 'loading: true'
    expect(newState.loading).toBe(true);
  });

  // Test 3: Le reducer setOrders
  test("doit gérer setOrders pour remplacer la liste des commandes", () => {
    // ARRANGE
    const mockOrders: IOrder[] = [
      {
        id: "1",
        title: "Commande A",
        amount: 100,
        status: OrderStates.PENDING,
        customer: "Client A",
      },
    ];
    const action = setOrders(mockOrders); // On crée l'action avec les commandes en payload

    // ACT
    const newState = ordersReducer(initialState, action);

    // ASSERT
    expect(newState.orders).toEqual(mockOrders); // Le tableau orders doit être remplacé
    expect(newState.orders.length).toBe(1);
  });

  // Test 4: Le reducer deleteOrderSuccess
  test("doit gérer deleteOrderSuccess pour retirer une commande de la liste", () => {
    // ARRANGE
    // On crée un état initial qui contient déjà des commandes
    const stateWithOrders = {
      ...initialState,
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
      ],
    };
    const idToDelete = "1";
    const action = deleteOrderSuccess(idToDelete); // Le payload est l'ID à supprimer

    // ACT
    const newState = ordersReducer(stateWithOrders, action);

    // ASSERT
    // La nouvelle liste ne doit plus contenir l'objet avec id: '1'
    expect(
      newState.orders.find((order) => order.id === idToDelete)
    ).toBeUndefined();
    // La longueur de la liste doit avoir diminué de 1
    expect(newState.orders.length).toBe(1);
    // Vérifier que la commande restante est bien la 'Commande B'
    expect(newState.orders[0].title).toBe("Commande B");
    // Important : vérifier l'immutabilité. Le nouveau tableau ne doit pas être le même que l'ancien.
    expect(newState.orders).not.toBe(stateWithOrders.orders);
  });

  // Vous pourriez ajouter ici des tests pour setOrdersError et setCurrentOrder sur le même modèle.
});
