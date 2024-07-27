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
        commit("setStories", res.data);
      } catch (err) {
        commit("setError", {
          error: err.response,
          status: err.response.status,
        });
      }
    },
  },
};
