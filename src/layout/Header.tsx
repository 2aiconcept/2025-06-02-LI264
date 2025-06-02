// src/layout/Header.tsx

const Header = () => {
  return (
    <div className="container-fluid py-3">
      <div className="row align-items-center">
        <div className="col">
          <h1 className="h3 mb-0 text-primary">Mini CRM - Formation React</h1>
        </div>
        <div className="col-auto">
          <span className="text-muted">Bienvenue dans votre CRM</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
