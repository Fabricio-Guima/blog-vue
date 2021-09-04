<template>
  <div>
    <transition>
      <div class="container" v-if="comments && comments.length" key="comments">
        <h1>Post Comments</h1>

        <div class="row">
          <div
            v-for="(comment, index) in comments"
            :key="index"
            class="col-sm-12 align-items-center"
          >
            <!-- <router-link :to="{ name: 'post', params: { id: post.id } }">
        </router-link> -->
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
      comments: [],
      noComments: false,
      totalItems: 0
    };
  },
  computed: {
    url() {
      return `/post-comments/${this.id}/public?page=${Number(
        this.$route.query.page
      )}`;
    }
  },
  methods: {
    getAllCommentsPostByIdPublic() {
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
    }
  },
  watch: {
    url() {
      this.getAllCommentsPostByIdPublic();
    }
  },
  created() {
    this.getAllCommentsPostByIdPublic();
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
