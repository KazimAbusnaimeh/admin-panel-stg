// src/store/index.js
import { createStore } from "vuex";
import ServiceModule from "./modules/ServiceModule";
import Auth from "./modules/Auth";

const store = createStore({
  modules: {
    ServiceModule,
    Auth,
  },
});

export default store;
