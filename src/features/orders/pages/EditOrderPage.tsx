// pages/EditOrderPage.tsx
import { useNavigate, useParams } from "react-router-dom";
import FormOrder from "../components/FormOrder";
import { useOrders } from "../hooks/useOrders";
import type { IOrder } from "../types/Order.interface";
import { useEffect, useState } from "react";

const EditOrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<IOrder | null>(null);

  // le hook return un objet donc destructuring d'objet
  const { loading, error, update, orderById } = useOrders();

  // handleSubmit()
  const handleSubmit = (order: IOrder) => {
    // => utilisation du hook useOrders
    update(order);
    // => rediriger vers la route /orders useNavigate()
    navigate("/orders");
  };

  useEffect(() => {
    if (!id) return;
    orderById(id)
      .then((fetchedOrder) => {
        setOrder(fetchedOrder);
        // loading a false (géré par le hook)
      })
      .catch((err) => {
        console.error("Erreur lors du chargement:", err);
      });
  }, []);

  return (
    <>
      {/* if loading else affichage du form */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <p>Chargement en cours...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : order ? (
        <FormOrder
          order={order}
          onSave={handleSubmit}
        />
      ) : (
        <div className="alert alert-warning">Commande non trouvée</div>
      )}
    </>
  );
};

export default EditOrderPage;
