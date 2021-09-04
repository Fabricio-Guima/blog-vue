<template>
  <div>
    <transition>
      <div class="container" v-if="comments && comments.length" key="comments">
        <h1>Meus Comentários</h1>

        <div class="row">
          <div
            v-for="(comment, index) in comments"
            :key="index"
            class="col-sm-12"
          >
            <!-- <router-link :to="{ name: 'post', params: { id: post.id } }">
        </router-link> -->
            <router-link
              :to="{ name: 'edit-comment', params: { id: comment.id } }"
              tag="button"
              class="btn btn-primary"
              >Editar meu comentário</router-link
            >
            <button
              :data-id="comment.id"
              type="button"
              class="btn btn-danger ml-3"
              data-toggle="modal"
              data-target="#exampleModal"
              @click="getBtnId(comment.id)"
            >
              Excluir comentário
            </button>
            <div id="accordion" class="mb-4">
              <div class="card">
                <div class="card-header" :id="`heading${index}`">
                  <h5 class="mb-0">
                    <button
                      class="btn btn-link"
                      data-toggle="collapse"
                      :data-target="`#collapse${index}`"
                      aria-expanded="true"
                      :aria-controls="`collapse${index}`"
                    >
                      {{ comment.body | truncate(25) }}
                    </button>
                  </h5>
                </div>

                <div
                  :id="`collapse${index}`"
                  class="collapse"
                  :aria-labelledby="`heading${index}`"
                  data-parent="#accordion"
                >
                  <div class="card-body">
                    {{ comment.body }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center mt-5">
          <Pagination :totalItems="totalItems" />
        </div>

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
                <h5 class="modal-title" id="exampleModalLabel">
                  Deletar comentário
                </h5>
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
                Deseja deletar este Comentário?
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
                  @click="deleteCommentById"
                  class="btn btn-primary"
                >
                  Deletar
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Fim modal -->
      </div>

      <div class="container" v-else-if="noComments" key="noComments">
        <div class="row">
          <div class="col-12">
            <h2>Não há comentários registrados</h2>
          </div>
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
import Pagination from "@/components/Pagination";
export default {
  name: "Posts",
  components: {
    Pagination
  },
  props: ["id"],
  data() {
    return {
      closeModal: true,
      comments: [],
      noComments: false,
      totalItems: 0,
      commentId: null
    };
  },
  computed: {
    url() {
      return `/post-comments?page=${Number(this.$route.query.page)}`;
    }
  },
  methods: {
    getAllCommentsPostByUser() {
      this.comments = null;

      this.$axios
        .get(this.url)
        .then((response) => {
          console.log(response.data);

          this.comments = response.data.data;
          this.totalItems = Number(response.data.meta.total);

          if (this.comments.length == 0) {
            this.noComments = true;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteCommentById() {
      this.$axios
        .delete(`/post-comments/${this.commentId}`)
        .then((response) => {
          console.log(response.data);

          document.getElementById("btn-close").click();

          this.$router.push({
            name: "posts"
          });
        })
        .catch((e) => {
          document.getElementById("btn-close").click();
          console.log(e);
        });
    },
    getBtnId(id) {
      this.commentId = id;
    }
  },
  watch: {
    url() {
      this.getAllCommentsPostByUser();
    }
  },
  created() {
    this.getAllCommentsPostByUser();
  }
};
</script>

<style scoped>
.container {
  margin-top: 80px;
}
a {
  text-decoration: none;
}
.container-card {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}

.fake-img {
  width: 100%;
  height: 150px;
}

.height {
  height: 100vh !important;
}
</style>
