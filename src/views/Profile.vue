<template>
  <div class="container">
    <h1>profile</h1>

    <profileComponent />
  </div>
</template>

<script>
import profileComponent from "@/components/Profile";
export default {
  name: "Profile",
  components: {
    profileComponent
  }
};
</script>

<style scoped>
.container {
  margin-top: 80px;
}
</style>
