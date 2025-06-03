import { useState } from "react";

interface DataSenderProps {
  initialValue?: string;
  onSendData: (dataFromChild: string) => void;
}

const DataSender = ({ initialValue = "", onSendData }: DataSenderProps) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const HandleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(inputValue);
    onSendData(inputValue);
  };
  return (
    <>
      <div className="card mt-2 shadow-sm border-info">
        <div className="card-header bg-info text-white">
          Composant Enfant (DataSender)
        </div>
        <div className="card-body">
          <p className="card-text">
            Entrez une information à envoyer au parent :
          </p>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={inputValue}
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
          {initialValue && (
            <small className="form-text text-muted">
              Valeur initiale reçue du parent : "{initialValue}"
            </small>
          )}
        </div>
      </div>
    </>
  );
};

export default DataSender;
