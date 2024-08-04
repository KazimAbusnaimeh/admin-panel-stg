import ApiService from "@/core/service/ApiService";
export default {
  state: {
    Categories: {},
    category: {},
  },
  getters: {
    getCategories(state) {
      return state.Categories;
    },
    getCategory(state) {
      return state.category;
    },
  },
  mutations: {
    setCategories(state, payload) {
      state.Categories = payload;
    },
    setCategory(state, payload) {
      state.category = payload;
    },
  },
  actions: {
    async getAllCategories({ commit }) {
      try {
        commit("setError", { error: null });
        let res = await ApiService.get("/api/v1/category/");
        commit("setCategories", res.data.data);
      } catch (err) {
        commit("setError", {
          error: err.response,
          status: err.response.status,
        });
      }
    },
    async getCategoryById({ commit }, id) {
      try {
        commit("setError", { error: null });
        let res = await ApiService.get(`/api/v1/category/get/${id}`);
        commit("setCategory", res.data.data);
      } catch (err) {
        commit("setError", {
          error: err.response,
          status: err.response.status,
        });
      }
    },
    async createCategory({ commit }, payload) {
      try {
        commit("setError", { error: null });
        await ApiService.post("/api/v1/category/add/", payload);
      } catch (err) {
        commit("setError", {
          error: err.response,
          status: err.response.status,
        });
      }
    },
    async updateCategory({ commit }, payload) {
      try {
        commit("setError", { error: null });
        await ApiService.put(`/api/v1/category/update/${payload._id}`, payload);
      } catch (err) {
        commit("setError", {
          error: err.response,
          status: err.response.status,
        });
      }
    },
    async deleteCategory({ commit }, id) {
      try {
        commit("setError", { error: null });
        await ApiService.delete("/api/v1/category/delete/", id);
      } catch (err) {
        commit("setError", {
          error: err.response,
          status: err.response.status,
        });
      }
    },
  },
};
