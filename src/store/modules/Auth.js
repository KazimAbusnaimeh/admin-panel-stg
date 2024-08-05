import ApiService from "@/core/service/ApiService";
import Swal from "sweetalert2";
import router from "@/router";
export default {
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null,
    loggedOutStatus: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", user);
    },
    setLoggedOutStatus(state, payload) {
      state.loggedOutStatus = payload;
    },
    destroyUser() {
      if (localStorage.getItem("user")) localStorage.removeItem("user");
    },
    setError(
      state,
      { error, showError = true, callback = () => {}, status = 400 }
    ) {
      if (error !== undefined) state.error = error;
      else state.error = "Server not responding";
      if (showError && state.error && status != 401)
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
    getLoggedOutStatus(state) {
      return state.loggedOutStatus;
    },
  },
  actions: {
    async signUp({ commit }, payload) {
      try {
        commit("setError", { error: null });
        let res = await ApiService.post("/api/v1/auth/admin/signup", payload);
        commit("setUser", JSON.stringify(res.data));
      } catch (err) {
        commit("setError", {
          error: err.response?.data?.message || undefined,
        });
      }
    },
    async logIn({ commit }, payload) {
      try {
        commit("setError", { error: null });
        let res = await ApiService.post(
          "/api/v1/auth/admin/login",
          payload,
          true
        );
        commit("setUser", JSON.stringify(res.data));
      } catch (err) {
        commit("setError", {
          error: err.response?.data?.message || undefined,
        });
      }
    },
    LogOut({ commit }) {
      commit("setLoggedOutStatus", true);
      commit("setUser", null);
      try {
        commit("setError", null);
      } catch (err) {
        console.log(err);
      }
      commit("destroyUser");
      router.push("/log-in");
    },
  },
};
