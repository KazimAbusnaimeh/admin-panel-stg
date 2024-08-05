import ApiService from "@/core/service/ApiService";
export default {
  state: {
    typesOfWork: {},
    typeOfWork: {},
  },
  getters: {
    getTypesOfWork(state) {
      return state.typesOfWork;
    },
    getTypeOfWork(state) {
      return state.typeOfWork;
    },
  },
  mutations: {
    setTypesOfWork(state, payload) {
      state.typesOfWork = payload;
    },
    setTypeOfWork(state, payload) {
      state.typeOfWork = payload;
    },
  },
  actions: {
    async getAllTypesOfWork({ commit }) {
      try {
        commit("setError", { error: null });
        let res = await ApiService.get("/api/v1/type-of-work/");
        commit("setTypesOfWork", res.data.data);
      } catch (err) {
        commit("setError", {
          error: err.response,
          status: err.response.status,
        });
      }
    },
    async getTypeOfWorkById({ commit }, id) {
      try {
        commit("setError", { error: null });
        let res = await ApiService.get(`/api/v1/type-of-work/get/${id}`);
        commit("setTypeOfWork", res.data.data);
      } catch (err) {
        commit("setError", {
          error: err.response,
          status: err.response.status,
        });
      }
    },
    async createTypeOfWork({ commit }, payload) {
      try {
        commit("setError", { error: null });
        await ApiService.post("/api/v1/type-of-work/add/", payload);
      } catch (err) {
        commit("setError", {
          error: err.response.data.message,
          status: err.response.status,
        });
      }
    },
    async updateTypeOfWork({ commit }, payload) {
      try {
        commit("setError", { error: null });
        await ApiService.put(
          `/api/v1/type-of-work/update/${payload._id}`,
          payload
        );
      } catch (err) {
        commit("setError", {
          error: err.response,
          status: err.response.status,
        });
      }
    },
    async deleteTypeOfWork({ commit }, id) {
      try {
        commit("setError", { error: null });
        await ApiService.delete("/api/v1/type-of-work/delete", id);
      } catch (err) {
        commit("setError", {
          error: err.response,
          status: err.response.status,
        });
      }
    },
  },
};
