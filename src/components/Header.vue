<template>
  <header>
    <!-- Usuário  logado -->
    <nav
      v-if="this.$store.state.user.userLogged"
      class="navbar navbar-expand-lg navbar-light bg-light fixed-top"
    >
      <router-link to="/" class="navbar-brand">
        {{ this.$store.state.user.userLogged }}</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <router-link to="/" class="nav-item nav-link">Home</router-link>
          <!-- <router-link to="/login" class="nav-item nav-link">Login</router-link> -->
          <!-- <router-link to="/register" class="nav-item nav-link"
            >Register</router-link
          > -->
          <router-link to="/profile" class="nav-item nav-link"
            >Profile</router-link
          >
          <router-link to="/posts" class="nav-item nav-link">Posts</router-link>
          <router-link to="/create-post" class="nav-item nav-link"
            >Create post</router-link
          >
          <router-link to="/my-comments" class="nav-item nav-link"
            >my comments</router-link
          >
          <button @click.prevent.stop="logout" class="btn btn-primary btn-sm">
            Logout
          </button>
        </div>
      </div>
    </nav>

    <!-- Usuário não logado -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light mt-6">
      <router-link to="/" class="navbar-brand">Blog</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <router-link to="/" class="nav-item nav-link">Home</router-link>
          <router-link to="/login" class="nav-item nav-link">Login</router-link>
          <router-link to="/register" class="nav-item nav-link"
            >Register</router-link
          >
          <!-- <router-link to="/profile" class="nav-item nav-link"
            >Profile</router-link
          > -->
          <!-- <router-link to="/posts" class="nav-item nav-link">Posts</router-link> -->
          <!-- <router-link to="/create-post" class="nav-item nav-link"
            >Create post</router-link
          > -->
          <!-- <router-link to="/my-comments" class="nav-item nav-link"
            >my comments</router-link
          > -->
          <!-- <button @click.prevent.stop="logout" class="btn btn-primary btn-sm">
            Logout
          </button> -->
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "@/service/cookie";
import store from "@/store";

export default {
  name: "Header",
  computed: {
    ...mapState({
      user: (state) => state.user.user
    })
  },
  methods: {
    logout() {
      Cookie.deleteToken();

      let userLogged = false;
      store.commit("user/UPDATE_USERLOGGED", userLogged);

      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style></style>
