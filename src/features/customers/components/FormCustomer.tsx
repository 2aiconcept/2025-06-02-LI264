import { useState } from "react";
import type { ICustomer } from "../types/Customer.interface";

// créer l'interface pour les formDataProps
interface FormDataProps {
  Customer: ICustomer;
  onSave: (Customer: ICustomer) => void;
}
// en paparm de FormCustomer, recup Props avec destructuring
const FormCustomer = ({ Customer, onSave }: FormDataProps) => {

  //   créer la fn handleSubmit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // un useState() pour formData init new Customer()
  const [formData, setFormData] = useState<ICustomer>(Customer);
  // handleChange() mettra à jour formData à chaque fois qu'un input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className="form-control mb-2"
          value={formData.name}
          onChange={handleChange}
          placeholder="Client name"
        />

        <input
          name="email"
          type="email"
          className="form-control mb-2"
          value={formData.email}
          onChange={handleChange}
          placeholder="Client email"
        />

        <button className="btn btn-primary">Enregistrer</button>
      </form>
    </>
  );
};

export default FormCustomer;
