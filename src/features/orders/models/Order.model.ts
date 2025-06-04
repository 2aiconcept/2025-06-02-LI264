import { OrderStates } from "../enums/Order-state.enum";
import type { IOrder } from "../types/Order.interface";

export class Order implements IOrder {
  id = "";
  title = "";
  amount = 500;
  status = OrderStates.PENDING;
  customer = "";
  constructor(obj?: Partial<IOrder>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
