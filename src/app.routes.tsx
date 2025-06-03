import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { OrdersRoutes } from "./features/orders/orders.routes";
import { CustomersRoutes } from "./features/customers/customers.routes";
import { DashboardRoutes } from "./features/dashboard/dashboard.routes";
import { NotFoundRoutes } from "./features/NotFund/NotFountRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App, // <- s'affiche dans le <div id="root"></div> de index.html
    children: [
      {
        index: true,
        element: (
          <Navigate
            to="/dashboard"
            replace
          />
        ),
      },
      OrdersRoutes,
      CustomersRoutes,
      DashboardRoutes,
      NotFoundRoutes,
    ],
  },
]);
