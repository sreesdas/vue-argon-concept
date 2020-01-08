import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/oil_and_gas",
    name: "oil_and_gas",
    component: () =>
      import(/* webpackChunkName: "oilandgas" */ "../views/OilAndGas.vue")
  },
  {
    path: "/hse",
    name: "hse",
    component: () => import(/* webpackChunkName: "hse" */ "../views/Hse.vue")
  },
  {
    path: "/drilling_services",
    name: "drilling_services",
    component: () =>
      import(/* webpackChunkName: "drilling" */ "../views/DrillingServices.vue")
  },
  {
    path: "/well_services",
    name: "well_services",
    component: () =>
      import(/* webpackChunkName: "wellservices" */ "../views/WellServices.vue")
  },
  {
    path: "/well_status",
    name: "well_status",
    component: () =>
      import(/* webpackChunkName: "wellstatus" */ "../views/WellStatus.vue")
  },
  {
    path: "/finance",
    name: "finance",
    component: () =>
      import(/* webpackChunkName: "finance" */ "../views/Finance.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
