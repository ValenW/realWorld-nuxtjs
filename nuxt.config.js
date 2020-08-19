module.exports = {
  router: {
    linkActiveClass: "active",
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
  plugins: ["~/plugins/request.js", "~/plugins/dayjs.js"],
};
