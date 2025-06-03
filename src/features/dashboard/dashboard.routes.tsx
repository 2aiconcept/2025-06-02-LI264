import DashboardPage from "./pages/DashboardPage";

export const DashboardRoutes = {
  path: "/dashboard",
  Component: DashboardPage, // <- s'affiche dans <Outlet /> principal sur MaintLayout.tsx
  children: [
    {
      path: "jsxlab",
      lazy: async () => {
        const JsxLab = await import("./components/JsxLab");
        return { Component: JsxLab.default };
      },
    },
    {
      path: "es6lab",
      lazy: async () => {
        const Es6Lab = await import("./components/Es6Lab");
        return { Component: Es6Lab.default };
      },
    },
    {
      path: "hookslab",
      lazy: async () => {
        const HooksLab = await import("./components/HooksLab");
        return { Component: HooksLab.default };
      },
    },
    {
      path: "propslab",
      lazy: async () => {
        const PropsLab = await import("./components/PropsLab");
        return { Component: PropsLab.default };
      },
    },
  ],
};
