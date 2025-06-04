import type { OrderStates } from "../enums/Order-state.enum";

export interface IOrder {
  id: string;
  title: string;
  amount: number;
  status: OrderStates;
  customer: string;
}
