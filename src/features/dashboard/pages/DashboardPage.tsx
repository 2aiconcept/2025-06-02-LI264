import { NavLink, Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="container-fluid">
      <h4>Laboratoire</h4>
      <hr />
      <ul className="nav">
        <li className="nav-item">
          <NavLink
            to="jsxlab"
            className={({ isActive }) =>
              `nav-link   rounded ${isActive ? "active" : ""}`
            }
          >
            Le Jsx
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="es6lab"
            className={({ isActive }) =>
              `nav-link   rounded ${isActive ? "active" : ""}`
            }
          >
            Nouveautés ES6+
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="hookslab"
            className={({ isActive }) =>
              `nav-link   rounded ${isActive ? "active" : ""}`
            }
          >
            Les hooks
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="propslab"
            className={({ isActive }) =>
              `nav-link   rounded ${isActive ? "active" : ""}`
            }
          >
            Les Props
          </NavLink>
        </li>
      </ul>
      <hr />
      <Outlet />
    </div>
  );
};
export default DashboardPage;
