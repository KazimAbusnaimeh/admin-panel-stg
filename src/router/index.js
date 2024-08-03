import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/register",
    name: "register",
    showInHeader: true,
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/log-in",
    name: "log in",
    showInHeader: true,
    component: () => import("../views/LogIn.vue"),
  },
  {
    path: "/home",
    name: "home",
    showInHeader: true,
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/story-tabel",
    name: "story",
    showInHeader: true,
    component: () => import("../views/story/StoryTable.vue"),
  },
  {
    path: "/story-create",
    name: "story Create",
    showInHeader: false,
    component: () => import("../views/story/StoryCreate.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.fullPath == "/") {
    next("/register");
  } else {
    next();
  }
});

export default router;
