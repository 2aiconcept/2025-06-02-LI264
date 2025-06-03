// src/layout/Nav.tsx
import { NavLink } from "react-router-dom";
import "./Nav.css"; // Fichier CSS pour des styles personnalisés

const Nav = () => {
  return (
    <nav className="p-3">
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-link text-white   rounded ${isActive ? "active" : ""}`
            }
          >
            Dashboard{" "}
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `nav-link text-white   rounded ${isActive ? "active" : ""}`
            }
          >
            Orders{" "}
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `nav-link text-white   rounded ${isActive ? "active" : ""}`
            }
          >
            Customers
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
