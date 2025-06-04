import axios from "axios";
import httpClient from "../../../shared/services/HttpClient";
import type { IOrder } from "../types/Order.interface";

const ORDERS_ENDPOINT = "/orders";

export const getAllOrders = async (): Promise<IOrder[]> => {
  const response = await httpClient.get<IOrder[]>(ORDERS_ENDPOINT);
  return response.data;
};

// getOrderById(id: string): Promise<IOrder>
export const getOrderById = async (id: string): Promise<IOrder | null> => {
  try {
    const response = await httpClient.get<IOrder>(`${ORDERS_ENDPOINT}/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

// updateOrder(order: IOrder): Promise<IOrder>
export const updateOrder = async (order: IOrder): Promise<IOrder> => {
  const response = await httpClient.put<IOrder>(
    `${ORDERS_ENDPOINT}/${order.id}`,
    order
  );
  return response.data;
};

// createOrder(order: IOrder): Promise<IOrder>
export const createOrder = async (order: IOrder): Promise<IOrder> => {
  const response = await httpClient.post<IOrder>(`${ORDERS_ENDPOINT}`, order);
  return response.data;
};

// deleteOrder(id: string): Promise<IOrder>
export const deleteOrder = async (id: string): Promise<IOrder> => {
  const response = await httpClient.delete<IOrder>(`${ORDERS_ENDPOINT}/${id}`);
  return response.data;
};
