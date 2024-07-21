import ApiService from "@/core/service/ApiService";
export default {
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    destroyUser(state) {
      localStorage.removeItem("user");
    },
    setError(state, payload) {
      state.error = payload;
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getError(state) {
      return state.error;
    },
  },
  actions: {
    async signUp({ commit }, payload) {
      try {
        commit("setError", null);
        let res = await ApiService.post("/api/v1/auth/admin/signup", payload);
        commit("setUser", res);
      } catch (err) {
        commit("setError", err.response.data.error.errors);
      }
    },
  },
};
