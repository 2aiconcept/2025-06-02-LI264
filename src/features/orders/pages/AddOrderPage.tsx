import type { IOrder } from "../types/Order.interface";
import { Order } from "../models/Order.model";
// import { useOrders } from "../hooks/useOrders";
import { useNavigate } from "react-router-dom";
import FormOrder from "../components/FormOrder";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
import { selectError, selectLoading } from "../store/ordersSelectors";
import { addOrder } from "../store/ordersThunks";

const AddOrderPage = () => {
  const navigate = useNavigate();

  //   le hook return un objet donc desctucturing d'objet
  // const { loading, error, add } = useOrders();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  // handleSubmit()
  const handleSubmit = async (order: IOrder) => {
    // => utilisation du hook useOrders
    // addOrder(order);
    await dispatch(addOrder(order))
    // => attend la réponse de l'api avant de rediriger vers la route /orders useNavigate()
    navigate("/orders");
  };

  return (
    <>
      <div>AddOrderPage</div>
      {/* if loading else affichage du form */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <p>Chargement en cours...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) :  (
        <FormOrder
          order={new Order()}
          onSave={handleSubmit}
        />
      )}
    </>
  );
};

export default AddOrderPage;
