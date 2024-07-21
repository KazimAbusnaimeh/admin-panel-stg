import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/register",
    name: "home",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
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
