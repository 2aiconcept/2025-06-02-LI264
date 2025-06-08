// Le hook Façade : il contient toute la logique Redux
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
import {
  fetchAllCustomers,
  deleteCustomerThunk,
  addCustomerThunk,
  updateCustomerThunk,
  fetchCustomerById,
} from "../store/customersThunks";
import {
  selectAllCustomers,
  selectLoading,
  selectError,
  selectCurrentCustomer,
} from "../store/customersSelectors";
import { useCallback } from "react";
import type { ICustomer } from "../types/Customer.interface";

export const useCustomersFacade = () => {
  // Le hook utilise les outils Redux à l'intérieur...
  const dispatch = useAppDispatch();
  const customers = useAppSelector(selectAllCustomers);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  // On expose des fonctions simples avec des noms clairs
  //   const loadCustomers = () => {
  //     dispatch(fetchAllCustomers());
  //   };
  const loadCustomers = useCallback(() => {
    dispatch(fetchAllCustomers());
  }, [dispatch]); // La seule dépendance de notre fonction est 'dispatch'

  //   const removeCustomer = (id: string) => {
  //     return dispatch(deleteCustomerThunk(id)); // On retourne la promesse
  //   };
  const removeCustomer = useCallback(
    (id: string) => {
      return dispatch(deleteCustomerThunk(id));
    },
    [dispatch]
  );

  const addCustomer = useCallback(
    (customer: ICustomer) => {
      return dispatch(addCustomerThunk(customer));
    },
    [dispatch]
  ); // La seule dépendance de notre fonction est 'dispatch'

  const updateCustomer = useCallback(
    (customer: ICustomer) => {
      return dispatch(updateCustomerThunk(customer));
    },
    [dispatch]
  ); // La seule dépendance de notre fonction est 'dispatch'

  const loadCustomerById = useCallback(
    (id: string) => {
      dispatch(fetchCustomerById(id));
    },
    [dispatch]
  );

  //   selectors
  const currentCustomer = useAppSelector(selectCurrentCustomer);

  // Le hook retourne un objet simple avec les données et les méthodes dont le composant a besoin
  return {
    customers,
    loading,
    error,
    loadCustomers,
    removeCustomer,
    addCustomer,
    updateCustomer,
    loadCustomerById,
    currentCustomer,
  };
};
