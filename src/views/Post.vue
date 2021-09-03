<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>{{ post.title }}</h1>
        <p class="text-left">{{ post.body }}</p>
        {{ comments }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: ["id"],
  data() {
    return {
      post: "",
      comments: []
    };
  },

  methods: {
    getPostById() {
      this.$axios
        .get(`/posts/${this.id}`)
        .then((response) => {
          console.log(response.data);
          this.post = response.data.data;
          this.comments = response.data.data.comments;
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  created() {
    this.getPostById();
  }
};
</script>

<style scoped>
.container {
  margin-top: 80px;
}
</style>
