interface AlertSuccessProps {
  name: string;
  message?: string;
}

const AlertSuccess = ({ name, message = "Bonjour" }: AlertSuccessProps) => {
  return (
    <div className="alert alert-success mt-2">
      <p className="mb-0">
        {message}, <strong>{name}</strong> !
      </p>
    </div>
  );
};

export default AlertSuccess;
