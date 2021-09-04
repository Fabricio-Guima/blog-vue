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
    beforeEnter: Guard.redirectIfAutheticated,
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
  },
  {
    path: "/post-public/:id",
    name: "post-public",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "post-public" */ "../views/PostPublic.vue")
  },
  {
    path: "/create-post",
    name: "create-post",
    props: true,
    beforeEnter: Guard.redirectIfNotAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "create-post" */ "../views/CreatePost.vue")
  },
  {
    path: "/edit-post/:id",
    name: "edit-post",
    props: true,
    beforeEnter: Guard.redirectIfNotAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "edit-post" */ "../views/EditPost.vue")
  },
  {
    path: "create-post-comments/:id",
    name: "create-post-comments",
    props: true,
    beforeEnter: Guard.redirectIfNotAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "create-post-comments" */ "../views/CreatePostComments.vue"
      )
  },

  {
    path: "/post-comments/:id",
    name: "post-comments",
    props: true,
    beforeEnter: Guard.redirectIfNotAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "post-comments" */ "../views/PostComments.vue"
      )
  },
  {
    path: "/post-comments-public/:id",
    name: "post-comments-public",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "post-comments" */ "../views/PostCommentsPublic.vue"
      )
  },
  {
    path: "/edit-comment/:id",
    name: "edit-comment",
    props: true,
    beforeEnter: Guard.redirectIfNotAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "edit-comment" */ "../views/EditComment.vue")
  },
  {
    path: "/my-comments",
    name: "my-comments",
    props: true,
    beforeEnter: Guard.redirectIfNotAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "my-comments" */ "../views/MyComments.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
