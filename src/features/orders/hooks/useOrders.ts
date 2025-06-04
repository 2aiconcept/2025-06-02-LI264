import { useEffect, useState } from "react";
import { ordersService } from "../services/Orders.service";
import type { IOrder } from "../types/Order.interface";

export const useOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    setLoading(true);
    setError(null);
    ordersService
      .getAll()
      .then((fetchOrders) => setOrders(fetchOrders))
      .catch((err) =>
        setError(err instanceof Error ? err.message : String(err))
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrderById = async (id: string) => {
    setLoading(true);
    setError(null);
    //   alternative gestion des promesses
    try {
      await ordersService.delete(id);
      setOrders((fetchOrders) =>
        fetchOrders.filter((order) => order.id !== id)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  // Ajouter une commande
  const addOrder = (order: IOrder) => {
    setLoading(true);
    setError(null);
    ordersService
      .create(order)
      .then((order) => setOrders((orders) => [...orders, order]))
      .catch((err) =>
        setError(err instanceof Error ? err.message : String(err))
      )
      .finally(() => setLoading(false));
  };

  // Ajouter une commande
  const updateOrder = (order: IOrder) => {
    setLoading(true);
    setError(null);
    ordersService
      .update(order)
      .then((res) =>
        setOrders((prevOrders) =>
          prevOrders.map((o) => (o.id === res.id ? res : o))
        )
      )
      .catch((err) =>
        setError(err instanceof Error ? err.message : String(err))
      )
      .finally(() => setLoading(false));
  };

  //   return les valeurs que les composants utilisent
  return {
    orders,
    loading,
    error,
    deleteOrder: deleteOrderById,
    add: addOrder,
    update: updateOrder,
  };
};
