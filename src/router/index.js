import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Guard from "@/service/middleware";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",

    name: "Home",
    component: Home
  },
  {
    path: "/logged",
    name: "logged",
    beforeEnter: Guard.redirectIfNotAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Logged" */ "../views/Logged.vue")
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: Guard.redirectIfAutheticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue")
  },
  {
    path: "/profile",
    name: "profile",
    beforeEnter: Guard.redirectIfNotAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue")
  },
  {
    path: "/posts",
    name: "posts",
    beforeEnter: Guard.redirectIfNotAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Posts.vue")
  },
  {
    path: "/post/:id",
    name: "post",
    props: true,
    beforeEnter: Guard.redirectIfNotAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Post.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
