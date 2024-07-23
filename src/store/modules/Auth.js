import ApiService from "@/core/service/ApiService";
import Swal from "sweetalert2";
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
    setError(state, { error, showError = true, callback = () => {} }) {
      console.log("kazim error", error);
      if (error !== undefined) state.error = error;
      else state.error = "Server not responding";
      if (showError && state.error)
        Swal.fire("Somthing Went Wrong", state.error, "error").then(() => {
          if (typeof callback == "function") callback();
        });
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
        commit("setError", { error: null });
        let res = await ApiService.post("/api/v1/auth/admin/signup", payload);
        commit("setUser", res);
      } catch (err) {
        commit("setError", {
          error: err.response?.data?.message || undefined,
        });
      }
    },
  },
};
