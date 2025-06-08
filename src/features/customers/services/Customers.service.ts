import axios from "axios";
import httpClient from "../../../shared/services/HttpClient";
import type { ICustomer } from "../types/Customer.interface";

const CUSTOMERS_ENDPOINT = "/customers";

const getAllCustomers = async (): Promise<ICustomer[]> => {
  const response = await httpClient.get<ICustomer[]>(CUSTOMERS_ENDPOINT);
  return response.data;
};

// getCustomerById(id: string): Promise<ICustomer>
const getCustomerById = async (id: string): Promise<ICustomer | null> => {
  try {
    const response = await httpClient.get<ICustomer>(
      `${CUSTOMERS_ENDPOINT}/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

// updateCustomer(Customer: ICustomer): Promise<ICustomer>
const updateCustomer = async (Customer: ICustomer): Promise<ICustomer> => {
  const response = await httpClient.put<ICustomer>(
    `${CUSTOMERS_ENDPOINT}/${Customer.id}`,
    Customer
  );
  return response.data;
};

// createCustomer(Customer: ICustomer): Promise<ICustomer>
const createCustomer = async (Customer: ICustomer): Promise<ICustomer> => {
  const response = await httpClient.post<ICustomer>(
    `${CUSTOMERS_ENDPOINT}`,
    Customer
  );
  return response.data;
};

// deleteCustomer(id: string): Promise<ICustomer>
const deleteCustomer = async (id: string): Promise<ICustomer> => {
  const response = await httpClient.delete<ICustomer>(
    `${CUSTOMERS_ENDPOINT}/${id}`
  );
  return response.data;
};

export const CustomersService = {
  getAll: getAllCustomers,
  getById: getCustomerById,
  create: createCustomer,
  update: updateCustomer,
  delete: deleteCustomer,
};
