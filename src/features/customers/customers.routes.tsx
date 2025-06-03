export const CustomersRoutes = {
  path: "/customers",
  children: [
    {
      index: true,
      lazy: async () => {
        const CustomersListPage = await import("./pages/CustomersListPage");
        return { Component: CustomersListPage.default };
      },
    },
    {
      path: "add",
      lazy: async () => {
        const AddCustomerPage = await import("./pages/AddCustomerPage");
        return { Component: AddCustomerPage.default };
      },
    },
    {
      path: "edit/:id",
      lazy: async () => {
        const EditCustomerPage = await import("./pages/EditCustomerPage");
        return { Component: EditCustomerPage.default };
      },
    },
  ],
};
