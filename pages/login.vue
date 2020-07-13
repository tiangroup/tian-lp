<template>
  <v-app>
    <v-card v-if="$auth.loggedIn" class="mx-auto mt-4" max-width="400">
      <v-card-title>Вы авторизованы</v-card-title>
      <v-card-text>
        <v-btn @click="$auth.logout()" color="success" block class="mt-4"
          >Выйти</v-btn
        >
      </v-card-text>
    </v-card>
    <v-card v-else class="mx-auto mt-4" max-width="400">
      <v-card-title>Авторизация</v-card-title>
      <v-card-text>
        <v-alert type="error" :value="error" transition="scale-transition"
          >Неверный логин или пароль
        </v-alert>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="username"
            label="Логин"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="password"
            label="Пароль"
            required
          ></v-text-field>
          <v-btn
            type="submit"
            color="success"
            :loading="process"
            block
            class="mt-4"
            >Войти</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    username: "",
    password: "",
    error: null,
    process: false
  }),
  methods: {
    async login() {
      this.error = null;
      this.process = true;
      return this.$auth
        .loginWith("local", {
          data: {
            identifier: this.username,
            password: this.password
          }
        })
        .catch(e => {
          this.error = true;
          this.process = false;
        });
    }
  },
  head() {
    return {
      title: "Авторизация"
    };
  }
};
</script>
