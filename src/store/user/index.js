export default {
  namespaced: true,

  state: () => ({
    user: {},
    userLogged: false
  }),

  getter: {},

  mutations: {
    STORE_USER(state, payload) {
      state.user = payload;
    },
    UPDATE_USERLOGGED(state, payload) {
      state.userLogged = payload;
    }
  },

  actions: {}
};
