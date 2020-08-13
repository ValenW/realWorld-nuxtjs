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
  },
};

export const actions = {};
