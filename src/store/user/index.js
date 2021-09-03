export default {
  namespaced: true,

  state: () => ({
    user: {}
  }),

  getter: {},

  mutations: {
    STORE_USER(state, payload) {
      state.user = payload;
    }
  },

  actions: {}
};
