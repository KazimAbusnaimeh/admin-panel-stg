import ApiService from "@/core/service/ApiService";
export default {
  state: {
    stories: {},
    story: {},
  },
  getters: {
    getStories(state) {
      return state.stories;
    },
    getStory(state) {
      return state.story;
    },
  },
  mutations: {
    setStories(state, payload) {
      state.stories = payload;
    },
    setStory(state, payload) {
      state.story = payload;
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
    async getStoryById({ commit }, id) {
      try {
        commit("setError", { error: null });
        let res = await ApiService.get(`/api/v1/story/get/${id}`);
        commit("setStory", res.data.data);
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
    async updateStory({ commit }, payload) {
      try {
        commit("setError", { error: null });
        const id = payload.get("id");
        await ApiService.put(`/api/v1/story/update/${id}`, payload);
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
