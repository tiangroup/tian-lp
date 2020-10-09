<template>
  <v-app>
    <div class="login">
      <v-card min-width="350">
        <v-card-title>Авторизация</v-card-title>
        <v-card-subtitle>Панель управления</v-card-subtitle>
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
            >
              Войти
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    username: null,
    password: null,
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
        .then(() => {
          if (this.$auth.user.id !== this.$sites.site.admin) {
            this.$auth.logout();
            this.error = true;
            this.process = false;
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
  // mounted() {
  //   if (!this.$auth.loggedIn) {
  //     this.$auth.logout();
  //   }
  // }
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
}
</style>
