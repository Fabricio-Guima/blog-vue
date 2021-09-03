<template>
  <div class="container">
    <h1>Create Post</h1>

    <CreatePostComponent />
  </div>
</template>

<script>
import CreatePostComponent from "@/components/CreatePost";
export default {
  name: "CreatePost",
  components: {
    CreatePostComponent
  }
};
</script>

<style scoped>
.container {
  margin-top: 80px;
}
</style>
