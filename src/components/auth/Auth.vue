<template>
  <div class="auth-content">
    <div class="auth-modal">
      <!-- <img src="@/assets/logo.png" width="200" alt="Logo" /> -->
      <i class="fas fa-headset fa-5x"></i>
      <h3>Talk</h3>
      <hr />

      <div class="auth-title">Login</div>
      <input type="text" name="email" v-model="user.email" placeholder="E-mail" />
      <input type="password" name="password" v-model="user.password" placeholder="Senha" />

      <b-button type="submit" role="button" @click="signin" variant="success">Entrar</b-button>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data: function () {
    return {
      showSignup: false,
      user: {},
    };
  },
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/login`, this.user)
        .then((res) => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    },
  },
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.auth-modal a {
  margin-top: 35px;
}

.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>