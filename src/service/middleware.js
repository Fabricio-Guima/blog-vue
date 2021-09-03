import Cookie from "@/service/cookie";
import axios from "axios";
import store from "@/store";

export default {
  async redirectIfNotAuthenticated(to, from, next) {
    const token = Cookie.getToken();
    if (!token) {
      next({ name: "login" });
    }

    //nao basta o token exister, tem que verificar se ele tá válido la na rota /me do backend
    //se o token estiver inválido, vou deletá-lo
    // e volto para a tela de login, pois nao tem token
    await axios
      .get("/me")
      .then((response) => {
        if (!store?.state?.user?.id) {
          store.commit("user/STORE_USER", response.data.data);
        }
      })
      .catch(() => {
        Cookie.deleteToken();
      });

    next();
  },

  redirectIfAutheticated(to, from, next) {
    const token = Cookie.getToken();
    let n;
    if (token) {
      n = { name: "logged" };
    }

    //se n for vazio, ele vai seguir a rotina dele normalmente
    next(n);
  }
};
