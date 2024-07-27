// src/store/index.js
import { createStore } from "vuex";
import Auth from "./modules/Auth";
import Story from "./modules/Story";

const store = createStore({
  modules: {
    Auth,
    Story,
  },
});

export default store;
