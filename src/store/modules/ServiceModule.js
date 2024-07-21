import ApiService from "@/core/service/ApiService";

export default {
  state: {
    services: {},
  },
  getters: {
    getServices(state) {
      return state.services;
    },
  },
  mutations: {
    setServices(state, payload) {
      state.services = payload;
    },
  },
  actions: {
    async getAllServices({ commit }) {
      try {
        commit("setError", null);
        let res = await ApiService.get(
          "/api/v1/service//provider/get-all-services"
        );
        commit("setServices", res.data);
      } catch (err) {
        commit("setError", err.response);
        console.log("kazim", err.response);
      }
    },
  },
};
