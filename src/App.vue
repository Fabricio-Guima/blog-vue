<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style-type: none;
  box-sizing: border;
}
img {
  display: block;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-enter-leave {
  transition: all 0.3s;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
