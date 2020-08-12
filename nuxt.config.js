module.exports = {
  router: {
    extendRoutes: (routes, resolve) => {
      routes.push({
        name: "root",
        path: "/",
        redirect: "/home",
      });
    },
  },
};
