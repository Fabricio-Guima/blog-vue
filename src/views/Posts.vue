<template>
  <div class="container">
    <div class="row">
      <div
        v-for="(post, index) in posts"
        :key="index"
        class="col-sm-12 col-md-6 col-lg-4 mb-4 align-items-center"
      >
        <div class="card mx-auto" style="width: 18rem;">
          <router-link :to="{ name: 'post', params: { id: post.id } }">
            <div class="container-card fake-img bg-primary">
              <p class="text-white pt-4">{{ post.title }}</p>
            </div>
            <div class="card-body">
              <p class="card-text ">
                {{ post.body | truncate(25) }}
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-5">
      <Pagination :totalItems="totalItems" />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
export default {
  name: "Posts",
  components: {
    Pagination
  },
  data() {
    return {
      posts: [],
      totalItems: 0
    };
  },
  computed: {
    url() {
      return `/posts?page=${Number(this.$route.query.page)}`;
    }
  },
  methods: {
    getPosts() {
      this.posts = null;

      this.$axios.get(this.url).then((response) => {
        this.posts = response.data.data;
        this.totalItems = Number(response.data.meta.total);
      });
    }
  },
  watch: {
    url() {
      this.getPosts();
    }
  },
  created() {
    this.getPosts();
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

div.card {
  min-height: 300px !important;
  border-radius: 4px;
}
.fake-img {
  width: 100%;
  height: 150px;
}
</style>
