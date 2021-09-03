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
      ref="profileForm"
      tag="form"
      @submit.stop.prevent="update()"
      class="text-left"
    >
      <div class="form-group">
        <label for="exampleInputName1">Nome Completo</label>

        <ValidationProvider v-slot="{ errors }" rules="required" name="nome">
          <input
            type="name"
            class="form-control"
            id="exampleInputName1"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
            v-model="name"
          />
          <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
            {{ errors[0] }}
          </div>
        </ValidationProvider>
      </div>

      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required|email"
          name="email"
        >
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="email"
          />
          <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
            {{ errors[0] }}
          </div>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <ValidationProvider v-slot="{ errors }" rules="min:6" name="password">
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            v-model="password"
          />
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
        Atualizar
      </button>
    </ValidationObserver>
  </div>
</template>

<script>
// import Cookie from "js-cookie";
import { mapState, mapMutations } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import message from "@/utils/messages";
export default {
  name: "Register",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      response: {
        color: "",
        message: ""
      },
      spinner: {
        update: false
      }
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user
    })
  },
  methods: {
    ...mapMutations("user", ["STORE_USER"]),

    async update() {
      //se tiver erro de validação, validator vira false
      const validator = await this.$refs.profileForm.validate();
      if (!validator) {
        return;
      }

      this.resetResponse();

      this.spinner.update = true;

      const payload = {
        name: this.name,
        email: this.email
      };

      //verifar se campo senha foi preenchido
      if (this.password) {
        payload.password = this.password;
      }

      this.$axios
        .put("/me", payload)
        .then((response) => {
          console.log(response);

          this.response.color = "success";
          this.response.message = "perfil atualizado com sucesso";

          this.STORE_USER(response.data.data);
        })
        .catch((e) => {
          this.spinner.update = false;

          const errorCode = e?.response?.data?.error || "ServerError";
          this.response.color = "danger";
          this.response.message = message[errorCode];

          console.log(e);
        })
        .finally(() => {
          this.spinner.update = false;
        });
    },

    resetResponse() {
      this.response.color = "";
      this.response.message = "";
    },

    resetForm() {
      this.$refs.registerForm.reset();
      this.name = "";
      this.email = "";
      this.password = "";
    }
  },
  created() {
    this.name = this.user.name;
    this.email = this.user.email;
  }
};
</script>

<style></style>
