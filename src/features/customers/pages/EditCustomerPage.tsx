// pages/EditCustomerPage.tsx
import { useNavigate, useParams } from "react-router-dom";
import FormCustomer from "../components/FormCustomer";
import type { ICustomer } from "../types/Customer.interface";
import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
// import {
//   selectCurrentCustomer,
//   selectError,
//   selectLoading,
// } from "../store/customersSelectors";
// import { fetchCustomerById, updateCustomerThunk } from "../store/customersThunks";
import { useCustomersFacade } from "../hooks/useCustomersFacade";

const EditCustomerPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // const dispatch = useAppDispatch();
  // const CustomerSelected = useAppSelector(selectCurrentCustomer);
  // const loading = useAppSelector(selectLoading);
  // const error = useAppSelector(selectError);
  const { loading, error, updateCustomer, loadCustomerById, currentCustomer } = useCustomersFacade();

  // handleSubmit()
  const handleSubmit = async  (Customer: ICustomer) => {
    // await dispatch(updateCustomerThunk(Customer))
    await updateCustomer(Customer)
    navigate("/customers");
  };

  useEffect(() => {
    if (!id) return;
    // dispatch(fetchCustomerById(id));
    loadCustomerById(id)
  }, [loadCustomerById, id]);

  return (
    <>
      {/* if loading else affichage du form */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <p>Chargement en cours...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : currentCustomer ? (
        <FormCustomer
          Customer={currentCustomer}
          onSave={handleSubmit}
        />
      ) : (
        <div className="alert alert-warning">Commande non trouvée</div>
      )}
    </>
  );
};

export default EditCustomerPage;
