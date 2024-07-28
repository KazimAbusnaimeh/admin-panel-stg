import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/log-in",
    name: "log in",
    component: () => import("../views/LogIn.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/story-tabel",
    name: "story",
    component: () => import("../views/StoryTable.vue"),
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
