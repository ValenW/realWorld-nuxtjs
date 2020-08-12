module.exports = {
  router: {
    extendRoutes: (routes, resolve) => {
      routes.push(
        {
          name: "root",
          path: "/",
          redirect: "/home",
        },
        {
          name: "register",
          path: "/register",
          component: resolve(__dirname, "pages/login"),
        }
      );
    },
  },
};
