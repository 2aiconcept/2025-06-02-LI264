import type { ICustomer } from "../types/Customer.interface";
import { Customer } from "../models/Customer.model";
import { useNavigate } from "react-router-dom";
import FormCustomer from "../components/FormCustomer";
// import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
// import { selectError, selectLoading } from "../store/customersSelectors";
// import { addCustomerThunk } from "../store/customersThunks";
import { useCustomersFacade } from "../hooks/useCustomersFacade";

const AddCustomerPage = () => {
  const navigate = useNavigate();

  // const dispatch = useAppDispatch();
  // const loading = useAppSelector(selectLoading);
  // const error = useAppSelector(selectError);

  const { loading, error, addCustomer } = useCustomersFacade();
  

  const handleSubmit = async (customer: ICustomer) => {
    // await dispatch(addCustomerThunk(customer))
    await addCustomer(customer)
    navigate("/customers");
  };

  return (
    <>
      <div>AddCustomerPage</div>
      {/* if loading else affichage du form */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <p>Chargement en cours...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) :  (
        <FormCustomer
          Customer={new Customer()}
          onSave={handleSubmit}
        />
      )}
    </>
  );
};

export default AddCustomerPage;
