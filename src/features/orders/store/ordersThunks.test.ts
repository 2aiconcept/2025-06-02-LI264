// src/features/orders/store/ordersThunks.test.ts

import { describe, test, expect, vi, beforeEach } from "vitest";
import { ordersService } from "../services/Orders.service"; // Le service à mocker
import { fetchOrders } from "./ordersThunks"; // Le thunk à tester
import { setLoading, setOrders, setOrdersError } from "./ordersSlice"; // Les créateurs d'action à vérifier
import type { OrderI } from "../types/Order.interface";
import { OrderStates } from "../enums/Order-state.enum";

// On mocke le module du service pour contrôler ses fonctions (getAll, etc.)
vi.mock("../services/Orders.service", () => ({
  ordersService: {
    getAll: vi.fn(),
  },
}));

describe("Orders Thunks", () => {
  // On crée une référence typée et mockée à notre service pour un accès facile
  const mockedOrdersService = vi.mocked(ordersService);

  beforeEach(() => {
    // On réinitialise tous les mocks avant chaque test
    vi.resetAllMocks();
  });

  describe("fetchOrders Thunk", () => {
    test("doit dispatcher setLoading(true), puis setOrders en cas de succès, et enfin setLoading(false)", async () => {
      // 1. ARRANGE (Préparer)

      // On crée un mock de la fonction dispatch que nous passerons à notre thunk.
      // vi.fn() nous permet d'espionner ses appels.
      const dispatch = vi.fn();

      // On définit les fausses données que le service est censé retourner
      const mockOrdersData: OrderI[] = [
        {
          id: "1",
          title: "Commande Test",
          amount: 100,
          status: OrderStates.PENDING,
          customer: "Client Test",
        },
      ];

      // On configure le mock de la méthode getAll du service pour simuler un succès
      mockedOrdersService.getAll.mockResolvedValue(mockOrdersData);

      // 2. ACT (Agir)

      // On récupère la fonction thunk elle-même
      const thunk = fetchOrders();
      // On l'exécute en lui passant notre faux dispatch.
      // Le deuxième argument de thunk (getState) n'est pas utilisé ici, donc on peut passer vi.fn() ou undefined.
      await thunk(dispatch, vi.fn(), undefined);

      // 3. ASSERT (Vérifier)

      // a) Vérifions que la méthode du service a bien été appelée
      expect(ordersService.getAll).toHaveBeenCalledTimes(1);

      // b) Vérifions la séquence des actions dispatchées
      // On s'attend à ce que setLoading(true) soit la première action dispatchée
      expect(dispatch).toHaveBeenNthCalledWith(1, setLoading(true));

      // On s'attend à ce que setOrdersError(null) soit la deuxième (basé sur notre implémentation du thunk)
      expect(dispatch).toHaveBeenNthCalledWith(2, setOrdersError(null));

      // On s'attend à ce que setOrders avec les données mockées soit la troisième
      expect(dispatch).toHaveBeenNthCalledWith(3, setOrders(mockOrdersData));

      // On s'attend à ce que setLoading(false) soit la dernière action dispatchée (via le `finally`)
      expect(dispatch).toHaveBeenNthCalledWith(4, setLoading(false));
    });

    // Vous pourriez ajouter un autre test ici pour le cas d'erreur
    test("doit dispatcher setOrdersError en cas d'échec de l'API", async () => {
      // 1. ARRANGE
      const dispatch = vi.fn();
      const errorMessage = "Échec de la connexion API";
      // On configure le mock pour simuler un échec
      mockedOrdersService.getAll.mockRejectedValue(new Error(errorMessage));

      // 2. ACT
      const thunk = fetchOrders();
      await thunk(dispatch, vi.fn(), undefined);

      // 3. ASSERT
      // Vérifier que setLoading(true) et setError(null) sont appelés au début
      expect(dispatch).toHaveBeenCalledWith(setLoading(true));
      expect(dispatch).toHaveBeenCalledWith(setOrdersError(null));
      // Vérifier que setOrdersError est appelé avec le bon message
      expect(dispatch).toHaveBeenCalledWith(setOrdersError(errorMessage));
      // Vérifier que setLoading(false) est appelé à la fin
      expect(dispatch).toHaveBeenCalledWith(setLoading(false));
      // Vérifier que setOrders (l'action de succès) n'a PAS été appelée
      expect(dispatch).not.toHaveBeenCalledWith(setOrders(expect.any(Array)));
    });
  });
});
