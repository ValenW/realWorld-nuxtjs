const cookieParser = process.server ? require("cookieparser") : undefined;
const Cookie = process.client ? require("js-cookie") : undefined;

// must declare as method and return object
// to avoid conflict of data in server render
// for the instance during server render is always the exactly one
export const state = () => ({
  // current user login status
  user: null,
});

export const mutations = {
  setUser: (state, data) => {
    state.user = data;
    Cookie.set("user", data);
  },
  removeUser: (state) => {
    state.user = null;
    Cookie.remove("user");
  },
};

export const actions = {
  // will auto be called in server render process
  // for init store data in server, and then can pass them to client for usage
  nuxtServerInit: ({ commit }, { req }) => {
    if (req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie);
      try {
        const user = JSON.parse(parsed.user);
        commit("setUser", user);
      } catch (err) {
        console.error("Invalid cookie found when parse user in cookie");
      }
    }
  },
};
