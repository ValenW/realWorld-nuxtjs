import axios from "axios";

export const request = axios.create({
  baseURL: "https://conduit.productionready.io",
});

// nuxt provide context with query, req, res, app, store, ect
// must export as default
export default ({ store }) => {
  // request interceptor
  // every request will go throw this interceptor
  // we can do some common issue here, like set token
  request.interceptors.request.use(
    (config) => {
      const { user } = store.state;

      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
};
