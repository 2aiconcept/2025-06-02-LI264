// pages/EditCustomerPage.tsx
import { useNavigate, useParams } from "react-router-dom";
import FormCustomer from "../components/FormCustomer";
import type { ICustomer } from "../types/Customer.interface";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
import {
  selectCurrentCustomer,
  selectError,
  selectLoading,
} from "../store/customersSelectors";
import { fetchCustomerById, updateCustomerThunk } from "../store/customersThunks";

const EditCustomerPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const CustomerSelected = useAppSelector(selectCurrentCustomer);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  // handleSubmit()
  const handleSubmit = async  (Customer: ICustomer) => {
    await dispatch(updateCustomerThunk(Customer))
    navigate("/customers");
  };

  useEffect(() => {
    if (!id) return;
    dispatch(fetchCustomerById(id));
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
      ) : CustomerSelected ? (
        <FormCustomer
          Customer={CustomerSelected}
          onSave={handleSubmit}
        />
      ) : (
        <div className="alert alert-warning">Commande non trouvée</div>
      )}
    </>
  );
};

export default EditCustomerPage;
