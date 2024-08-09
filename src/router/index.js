import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/register",
    name: "register",
    showInHeader: false,
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/log-in",
    name: "log in",
    showInHeader: false,
    component: () => import("../views/LogIn.vue"),
  },
  {
    path: "/home",
    name: "home",
    showInHeader: true,
    isLocal: true,
    icon: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/story-table",
    name: "story",
    showInHeader: true,
    isLocal: true,
    icon: "camera",
    component: () => import("../views/story/StoryTable.vue"),
  },
  {
    path: "/category-table",
    name: "category",
    showInHeader: true,
    isLocal: true,
    icon: "appstore",
    component: () => import("../views/category/CategoryTable.vue"),
  },
  {
    path: "/story-form",
    name: "story Create",
    showInHeader: false,
    component: () => import("../views/story/StoryForm.vue"),
  },
  {
    path: "/type-of-work-table",
    name: "type of work",
    showInHeader: true,
    isLocal: true,
    icon: "apartment",
    component: () => import("../views/typeOfWork/TypeOfWorkTable.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  let user = store.getters.getUser;
  if (to.fullPath == "/") {
    next("/log-in");
  } else if (to.fullPath == "/log-in" && user) {
    next("/home");
  } else if (to.fullPath == "/register" && user) {
    next("/home");
  } else {
    next();
  }
});

export default router;
