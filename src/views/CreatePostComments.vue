<template>
  <div class="container">
    <h1>Criar Comentário</h1>
    <div
      v-if="response.message"
      :class="`border rounded bg-${response.color} p-4 mb-4`"
    >
      <h4 :class="`text-sm text-white`">
        {{ response.message }}
      </h4>
    </div>

    <ValidationObserver
      ref="editForm"
      tag="form"
      @submit.stop.prevent="update()"
      class="text-left"
    >
      <div class="form-group">
        <label for="exampleInputtextarea1">Conteúdo</label>
        <ValidationProvider v-slot="{ errors }" rules="required" name="body">
          <textarea class="form-control" name="body" id="body" v-model="body">
          </textarea>

          <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
            {{ errors[0] }}
          </div>
        </ValidationProvider>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="spinner.edit">
        <img
          v-if="spinner.edit"
          src="@/assets/img/spinner.svg"
          alt=""
          width="20"
          height="20"
          class="d-inline-block"
        />
        Criar
      </button>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import message from "@/utils/messages";
export default {
  name: "CreatePostComment",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: ["id"],
  data() {
    return {
      body: "",
      post: {},
      comments: [],

      response: {
        color: "",
        message: ""
      },
      spinner: {
        edit: false
      }
    };
  },
  methods: {
    async update() {
      //se tiver erro de validação, validator vira false
      const validator = await this.$refs.editForm.validate();
      if (!validator) {
        return;
      }

      this.resetResponse();

      this.spinner.update = true;

      const payload = {
        body: this.body
      };
      this.$axios
        .post(`/posts/${this.id}/comments`, payload)
        .then((response) => {
          console.log("resposta: ", response.data);

          this.response.color = "success";
          this.response.message = "Comentário criado com sucesso";
        })
        .catch((e) => {
          this.spinner.edit = false;

          const errorCode = e?.response?.data?.error || "ServerError";
          this.response.color = "danger";
          this.response.message = message[errorCode];

          console.log(e);
        })
        .finally(() => {
          this.spinner.edit = false;
        });
    },
    getCommentPostById() {
      this.$axios
        .get(`/post-comments/${this.id}/show`)
        .then((response) => {
          console.log("aqui", response.data);
          this.title = response.data.data.title;
          this.body = response.data.data.body;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    resetResponse() {
      this.response.color = "";
      this.response.message = "";
    }
  },
  created() {
    this.getCommentPostById();
  }
};
</script>

<style scoped>
.container {
  margin-top: 80px;
}
</style>
