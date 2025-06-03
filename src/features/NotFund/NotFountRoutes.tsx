export const NotFoundRoutes = {
  path: "*",
  lazy: async () => {
    const NotFoundPage = await import("./NotFoundPage");
    return { Component: NotFoundPage.default };
  },
};
