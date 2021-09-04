<template>
  <div class="container">
    <transition>
      <div class="row" v-if="post">
        <router-link
          :to="{ name: 'post-comments', params: { id: id } }"
          tag="button"
          class="btn btn-primary"
          >ver comentários</router-link
        >
        <router-link
          :to="{ name: 'create-post-comments', params: { id: id } }"
          tag="button"
          class="btn btn-primary ml-3"
          >Criar comentário</router-link
        >

        <router-link
          :to="{ name: 'edit-post', params: { id: id } }"
          tag="button"
          class="btn btn-primary ml-3"
          >Editar post</router-link
        >

        <button
          type="button"
          class="btn btn-danger ml-3"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Excluir post
        </button>

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

    <!-- Modal -->
    <div
      v-if="closeModal"
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style="display-none: none"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Deletar Post</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Deseja deletar este post?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              id="btn-close"
              class=" btn btn-secondary"
              data-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              @click="deletePostById"
              class="btn btn-primary"
            >
              Deletar
            </button>
          </div>
        </div>
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
      closeModal: true,
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
    },

    deletePostById() {
      this.$axios
        .delete(`/posts/${this.id}`)
        .then((response) => {
          console.log(response.data);

          document.getElementById("btn-close").click();

          this.$router.push({ name: "posts" });
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
