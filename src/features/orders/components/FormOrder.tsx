import { useState } from "react";
import { OrderStates } from "../enums/Order-state.enum";
import type { IOrder } from "../types/Order.interface";

// créer l'interface pour les formDataProps
interface FormDataProps {
  order: IOrder;
  onSave: (order: IOrder) => void;
}
// en paparm de FormOrder, recup Props avec destructuring
const FormOrder = ({ order, onSave }: FormDataProps) => {
  const states = Object.values(OrderStates);

  //   créer la fn handleSubmit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // un useState() pour formData init new Order()
  const [formData, setFormData] = useState<IOrder>(order);
  // handleChange() mettra à jour formData à chaque fois qu'un input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          className="form-control mb-2"
          value={formData.title}
          onChange={handleChange}
          placeholder="title"
        />

        <input
          name="amount"
          type="number"
          className="form-control mb-2"
          value={formData.amount}
          onChange={handleChange}
          placeholder="amount"
        />

        <select
          name="status"
          className="form-select mb-2"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="">Select a status</option>

          {states.map((state, index) => (
            <option
              key={index}
              value={state}
            >
              {state}
            </option>
          ))}
        </select>

        <input
          name="customer"
          type="text"
          className="form-control mb-2"
          value={formData.customer}
          onChange={handleChange}
          placeholder="Customer"
        />
        <button className="btn btn-primary">Enregistrer</button>
      </form>
    </>
  );
};

export default FormOrder;
