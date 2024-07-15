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
        let res = await ApiService.get("/api/v1/service/category/IT-Service");
        commit("setServices", res);
      } catch (err) {
        console.log("kazim", err.response);
      }
    },
  },
};
