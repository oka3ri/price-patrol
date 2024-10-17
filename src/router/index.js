import { createRouter, createWebHistory } from "vue-router";

// dashboard
const dashboardMain = () => import("@/views/dashboard/Main.vue");

const routes = [
  {
    path: "",
    // name: 'home',
    // component: HomeView,
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboardMain,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  return next();
});
