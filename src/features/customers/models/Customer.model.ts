import type { ICustomer } from "../types/Customer.interface";

export class Customer implements ICustomer {
  id = "";
  name = "";
  email = "";
  constructor(obj?: Partial<ICustomer>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
