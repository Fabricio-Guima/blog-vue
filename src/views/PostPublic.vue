<template>
  <div class="container">
    <transition>
      <div class="row" v-if="post">
        <router-link
          :to="{ name: 'post-comments-public', params: { id: id } }"
          tag="button"
          class="btn btn-primary"
          >ver comentários</router-link
        >

        <div class="col-12 my-5">
          <h1>{{ post.title }}</h1>
          <p class="text-left mt-5">{{ post.body }}</p>
        </div>
      </div>

      <div class="container height" v-else key="loading">
        <div class="row height justify-content-center align-items-center">
          <loading class="mt-5" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: ["id"],
  data() {
    return {
      post: "",
      closeModal: true,
      comments: []
    };
  },

  methods: {
    getPostById() {
      this.$axios
        .get(`/posts/${this.id}/public`)
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

.height {
  height: 100vh !important;
}
</style>
