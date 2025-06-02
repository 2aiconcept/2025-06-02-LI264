// src/layout/Nav.tsx
// import { NavLink } from "react-router-dom";
import "./Nav.css"; // Fichier CSS pour des styles personnalisés

const Nav = () => {
  return (
    <nav className="p-3">
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          {/* <NavLink to="/dashboard" />; */} Dashboard
        </li>
        <li className="nav-item mb-2">
          {/* <NavLink to="/dashboard" />; */} Orders
        </li>
        <li className="nav-item mb-2">
          {/* <NavLink to="/dashboard" />; */} Customers
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
