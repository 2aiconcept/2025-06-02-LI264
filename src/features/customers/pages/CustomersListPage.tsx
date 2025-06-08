import { Link, useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
// import { selectAllCustomers, selectError, selectLoading } from "../store/customersSelectors";
// import { deleteCustomerThunk, fetchAllCustomers } from "../store/customersThunks";
import { useEffect } from "react";
import { useCustomersFacade } from "../hooks/useCustomersFacade";
const CustomersListPage = () => {
  // <-----------------------------sans les facades------------------------
  // const customers = useAppSelector(selectAllCustomers);
  // const loading = useAppSelector(selectLoading);
  // const error = useAppSelector(selectError);
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(fetchAllCustomers())
  //   console.log('re rendu')
  // }, [dispatch])

  // const handleDelete = async (id: string) => {
  //   if (window.confirm("Do you realy want to delete this Customer ?")) {
  //     await dispatch(deleteCustomerThunk(id));
  //     // refrech collection from api after delete
  //     await dispatch(fetchAllCustomers());
  //   }
  //  };
  // --------------------------------------------------------------------->

  // <------------------------------------avec les facaces ----------------
  // Le composant utilise UNE SEULE ligne pour obtenir tout ce dont il a besoin
  const { customers, loading, error, loadCustomers, removeCustomer } = useCustomersFacade();
  useEffect(() => {
    loadCustomers() // boucle infinie sans useCallBack
    console.log('use effect called')
  }, [loadCustomers])
 
  const handleDelete = async (id: string) => {
    if (window.confirm("Do you realy want to delete this Customer ?")) {
      await removeCustomer(id)
      // refrech collection from api after delete
      await loadCustomers()
    }
   };
   // ---------------------------------------avec facades

  
  const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid d-flex justify-content-between bCustomer-bottom pb-3">
        <h4 className="d-inline-block">Customers List</h4>
        <Link
          to="add"
          className="btn btn-primary"
        >
          Add Customer
        </Link>
      </div>
      <div className="container-fluid mt-3">
        {error && <div className="alert alert-danger">{error}</div>}
        {loading && <p>...Chargement en cours</p>}
        {!error && !loading && (
          <table className="table table-responsive table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic outlined example"
                    >
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => navigate(`/customers/edit/${customer.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(customer.id)}
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
export default CustomersListPage;
