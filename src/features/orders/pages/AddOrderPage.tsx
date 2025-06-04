import type { IOrder } from "../types/Order.interface";
import { Order } from "../models/Order.model";
import { useOrders } from "../hooks/useOrders";
import { useNavigate } from "react-router-dom";
import FormOrder from "../components/FormOrder";

const AddOrderPage = () => {
  const navigate = useNavigate();

  //   le hook return un objet donc desctucturing d'objet
  const { loading, error, add } = useOrders();

  // handleSubmit()
  const handleSubmit = async (order: IOrder) => {
    // => utilisation du hook useOrders
    await add(order);
    // => rediriger vers la route /orders useNavigate()
    navigate("/orders");
  };

  return (
    <>
      <div>AddOrderPage</div>
      <FormOrder
        order={new Order()}
        onSave={handleSubmit}
      />
    </>
  );
};

export default AddOrderPage;
