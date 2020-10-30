<template>
  <div class="login">
    <transition name="bounce" mode="out-in">
      <v-card min-width="380" v-if="state == 'forgot'" key="forgot">
        <v-card-title>Забыли пароль</v-card-title>
        <v-card-text>
          <v-text-field label="Введите свой e-mail" required></v-text-field>
          <v-btn color="success" block class="mt-4">
            Отправить
          </v-btn>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="state = null">
            Авторизоваться
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card min-width="380" v-else key="login">
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
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="state = 'forgot'">
            Забыли пароль
          </v-btn>
        </v-card-actions>
      </v-card>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: null,
    password: null,
    error: null,
    process: false,
    state: null
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

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
