<template>
  <div class="container">
    <h1>Editar post</h1>
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
        <label for="title">Título</label>

        <ValidationProvider v-slot="{ errors }" rules="required" name="title">
          <input type="text" class="form-control" id="title" v-model="title" />
          <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
            {{ errors[0] }}
          </div>
        </ValidationProvider>
      </div>
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

      <button type="submit" class="btn btn-primary" :disabled="spinner.update">
        <img
          v-if="spinner.edit"
          src="@/assets/img/spinner.svg"
          alt=""
          width="20"
          height="20"
          class="d-inline-block"
        />
        Editar
      </button>
    </ValidationObserver>

    {{ title }}
    {{ body }}
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import message from "@/utils/messages";
export default {
  name: "EditPost",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: ["id"],
  data() {
    return {
      title: "",
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
        title: this.title,
        body: this.body
      };
      this.$axios
        .put(`/posts/${this.id}`, payload)
        .then((response) => {
          console.log("resposta: ", response.data);

          this.response.color = "success";
          this.response.message = "Post atualizado com sucesso";
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

    getPostById() {
      this.$axios
        .get(`/posts/${this.id}`)
        .then((response) => {
          console.log(response.data);
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
    this.getPostById();
  }
};
</script>

<style scoped>
.container {
  margin-top: 80px;
}
</style>
