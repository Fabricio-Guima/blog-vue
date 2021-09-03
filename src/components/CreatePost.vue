<template>
  <div class="mt-6">
    <div
      v-if="response.message"
      :class="`border rounded bg-${response.color} p-4 mb-4`"
    >
      <h4 :class="`text-sm text-white`">
        {{ response.message }}
      </h4>
    </div>

    <ValidationObserver
      ref="createPostForm"
      tag="form"
      @submit.stop.prevent="createPost()"
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
          v-if="spinner.update"
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
// import Cookie from "js-cookie";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import message from "@/utils/messages";
export default {
  name: "CreatePost",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      title: "",
      body: "",

      response: {
        color: "",
        message: ""
      },
      spinner: {
        create: false
      }
    };
  },
  methods: {
    async createPost() {
      //se tiver erro de validação, validator vira false
      const validator = await this.$refs.createPostForm.validate();
      if (!validator) {
        return;
      }

      this.resetResponse();

      this.spinner.create = true;

      const payload = {
        title: this.title,
        body: this.body,
        password: this.password
      };

      this.$axios
        .post("/posts", payload)
        .then((response) => {
          console.log(response);

          this.response.color = "success";
          this.response.message = "Criação do post feito com sucesso.";

          this.resetForm();
        })
        .catch((e) => {
          this.spinner.create = false;

          const errorCode = e?.response?.data?.error || "ServerError";
          this.response.color = "danger";
          this.response.message = message[errorCode];

          console.log(e);
        })
        .finally(() => {
          this.spinner.create = false;
        });
    },

    resetResponse() {
      this.response.color = "";
      this.response.message = "";
    },

    resetForm() {
      this.$refs.createPostForm.reset();
      this.title = "";
      this.body = "";
    }
  }
};
</script>

<style></style>
