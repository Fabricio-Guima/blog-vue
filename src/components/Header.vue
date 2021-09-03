<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
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
          <router-link to="/profile" class="nav-item nav-link"
            >Profile</router-link
          >
          <router-link to="/posts" class="nav-item nav-link">Posts</router-link>
          <router-link to="/create-post" class="nav-item nav-link"
            >Create post</router-link
          >
          <router-link to="/logout" class="nav-item nav-link"
            >Logout</router-link
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style></style>
