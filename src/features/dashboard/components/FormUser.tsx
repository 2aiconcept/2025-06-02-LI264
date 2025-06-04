import { useState } from "react";
import type { User } from "./PropsLab";

interface FormUserProps {
  user: User;
  onSave: (user: User) => void;
}

const FormUser = ({ user, onSave }: FormUserProps) => {
  const [formValue, setFormValue] = useState<User>(user);
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const HandleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formValue);
    onSave(formValue);
  };
  return (
    <>
      <div className="card mt-2 shadow-sm border-info">
        <div className="card-header bg-info text-white">
          Composant Enfant FormUser
        </div>
        <div className="card-body">
          <p className="card-text">
            Entrez une information à envoyer au parent :
          </p>
          <div className="input-group mb-3">
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={formValue.firstName}
              onChange={HandleChange}
              placeholder="Message pour le parent"
            />
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={formValue.lastName}
              onChange={HandleChange}
              placeholder="Message pour le parent"
            />
            <button
              className="btn btn-outline-info"
              type="button"
              onClick={HandleSubmit}
            >
              Envoyer au Parent
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormUser;
