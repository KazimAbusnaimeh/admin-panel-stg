import ApiService from "@/core/service/ApiService";
export default {
  state: {
    stories: {},
  },
  getters: {
    getStories(state) {
      return state.stories;
    },
  },
  mutations: {
    setStories(state, payload) {
      state.stories = payload;
    },
  },
  actions: {
    async getAllStories({ commit }) {
      try {
        commit("setError", { error: null });
        let res = await ApiService.get("/api/v1/story/get");
        commit("setStories", res.data.data);
      } catch (err) {
        commit("setError", {
          error: err.response,
          status: err.response.status,
        });
      }
    },
    async createStory({ commit }, payload) {
      try {
        commit("setError", { error: null });
        await ApiService.post("/api/v1/story/create", payload);
      } catch (err) {
        commit("setError", {
          error: err.response,
          status: err.response.status,
        });
      }
    },
    async deleteStory({ commit }, id) {
      try {
        commit("setError", { error: null });
        await ApiService.delete("/api/v1/story/delete", id);
      } catch (err) {
        commit("setError", {
          error: err.response,
          status: err.response.status,
        });
      }
    },
  },
};
