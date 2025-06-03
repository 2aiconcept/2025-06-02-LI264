export const OrdersRoutes = {
  path: "/orders",
  children: [
    {
      index: true,
      lazy: async () => {
        const OrdersListPage = await import("./pages/OrdersListPage");
        return { Component: OrdersListPage.default };
      },
    },
    {
      path: "add",
      lazy: async () => {
        const AddOrderPage = await import("./pages/AddOrderPage");
        return { Component: AddOrderPage.default };
      },
    },
    {
      path: "edit/:id",
      lazy: async () => {
        const EditOrderPage = await import("./pages/EditOrderPage");
        return { Component: EditOrderPage.default };
      },
    },
  ],
};
