import { useNavigate } from "react-router-dom";
import { OrderStates } from "../enums/Order-state.enum";
import { deleteOrder, getAllOrders } from "../services/Orders.service";
import { useEffect, useState } from "react";
import type { IOrder } from "../types/Order.interface";

const OrdersListPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleDelete = async (id: string) => {
    if (window.confirm("Do you realy want to delete this order ?")) {
      setLoading(true);
      setError(null);
      //   alternative gestion des promesses
      // try {
      //   await deleteOrder(id);
      //   setOrders((fetchOrders) =>
      //     fetchOrders.filter((order) => order.id !== id)
      //   );
      // } catch (err) {
      //   setError(err instanceof Error ? err.message : String(err));
      // } finally {
      //   setLoading(false);
      // }
      deleteOrder(id)
        .then(() =>
          setOrders((orders) => orders.filter((order) => order.id !== id))
        )
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAllOrders()
      .then((fetchOrders) => setOrders(fetchOrders))
      .catch((err) =>
        setError(err instanceof Error ? err.message : String(err))
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="container-fluid d-flex justify-content-between border-bottom pb-3">
        <h4 className="d-inline-block">Orders List</h4>
        <button className="btn btn-primary">Add Order</button>
      </div>
      <div className="container-fluid mt-3">
        {error && <div className="alert alert-danger">{error}</div>}
        {loading && <p>...Chargement en cours</p>}
        {!error && !loading && (
          <table className="table table-responsive table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Amount</th>
                <th scope="col">State</th>
                <th scope="col">Customer</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.title}</td>
                  <td>{order.amount}</td>
                  <td>
                    <span
                      className={
                        order.status === OrderStates.PENDING
                          ? "badge text-bg-warning p-2"
                          : "badge text-bg-success p-2"
                      }
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{order.customer}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic outlined example"
                    >
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => navigate(`/orders/edit/${order.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(order.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
export default OrdersListPage;
