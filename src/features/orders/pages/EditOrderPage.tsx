// pages/EditOrderPage.tsx
import { useNavigate, useParams } from "react-router-dom";
import FormOrder from "../components/FormOrder";
// import { useOrders } from "../hooks/useOrders";
import type { IOrder } from "../types/Order.interface";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
import {
  selectCurrentOrder,
  selectError,
  selectLoading,
} from "../store/ordersSelectors";
import { fetchOrderById, updateOrderEffect } from "../store/ordersThunks";

const EditOrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // const [order, setOrder] = useState<IOrder | null>(null);

  // le hook return un objet donc destructuring d'objet
  // const { loading, error, update, orderById } = useOrders();
  // const { loading, error, update, orderById } = useOrders();
  const dispatch = useAppDispatch();
  const orderSelected = useAppSelector(selectCurrentOrder);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  // handleSubmit()
  const handleSubmit = async  (order: IOrder) => {
    // => utilisation du hook useOrders
    // update(order);
    await dispatch(updateOrderEffect(order))
    // => attend reponse api avant de rediriger vers la route /orders useNavigate()
    navigate("/orders");
  };

  useEffect(() => {
    if (!id) return;
    dispatch(fetchOrderById(id));
    // orderById(id)
    //   .then((fetchedOrder) => {
    //     setOrder(fetchedOrder);
    //     // loading a false (géré par le hook)
    //   })
    //   .catch((err) => {
    //     console.error("Erreur lors du chargement:", err);
    //   });
  }, [dispatch, id]);

  return (
    <>
      {/* if loading else affichage du form */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <p>Chargement en cours...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : orderSelected ? (
        <FormOrder
          order={orderSelected}
          onSave={handleSubmit}
        />
      ) : (
        <div className="alert alert-warning">Commande non trouvée</div>
      )}
    </>
  );
};

export default EditOrderPage;
