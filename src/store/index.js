// src/store/index.js
import { createStore } from "vuex";
import Auth from "./modules/Auth";
import Story from "./modules/Story";
import Category from "./modules/Category";
import TypeOfWork from "./modules/TypeOfWork";

const store = createStore({
  modules: {
    Auth,
    Story,
    Category,
    TypeOfWork,
  },
});

export default store;
