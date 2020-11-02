<template>
  <div class="login">
    <transition name="bounce" mode="out-in">
      <v-card min-width="380" v-if="state == 'forgot'" key="forgot">
        <v-card-title>Забыл пароль</v-card-title>
        <v-card-text>
          <v-alert
            type="error"
            :value="errorForgot"
            transition="scale-transition"
          >
            {{ errorForgotMsg }}
          </v-alert>
          <v-text-field
            label="Введите свой e-mail"
            v-model.trim="email"
          ></v-text-field>
          <v-btn
            color="success"
            block
            class="mt-4"
            @click="forgot"
            :disabled="disabledForgot"
            :loading="process"
          >
            Отправить письмо
          </v-btn>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="state = null">
            Авторизоваться
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card
        min-width="380"
        v-else-if="state == 'password-reset'"
        key="password-reset"
      >
        <v-card-title>Сбросить пароль</v-card-title>
        <v-card-subtitle>
          Скопируйте код сброса из своего электронного письма<br />
          и вставьте его ниже
        </v-card-subtitle>
        <v-card-text>
          <v-alert
            type="error"
            :value="errorPasswordReset"
            transition="scale-transition"
          >
            {{ errorPasswordResetMsg }}
          </v-alert>
          <v-text-field
            label="Код сброса"
            v-model.trim="resetCode"
          ></v-text-field>
          <v-text-field
            label="Новый пароль"
            v-model.trim="newPassword"
            append-outer-icon="mdi-autorenew"
            @click:append-outer="generatePassword"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'"
          ></v-text-field>
          <v-btn
            color="success"
            block
            class="mt-4"
            @click="passwordReset"
            :disabled="disabledPasswordReset"
            :loading="process"
          >
            Сбросить пароль
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
          <v-alert type="error" :value="error" transition="scale-transition">
            Неверный логин или пароль
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
            Забыл пароль
          </v-btn>
        </v-card-actions>
      </v-card>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    username: null,
    password: null,
    error: null,
    process: false,
    state: null,
    email: null,
    errorForgot: false,
    errorForgotMsg: null,
    errorPasswordReset: false,
    errorPasswordResetMsg: false,
    resetCode: null,
    newPassword: null,
    showPassword: false
  }),
  methods: {
    login() {
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
    },
    async forgot() {
      this.errorForgot = false;
      this.process = true;
      try {
        const data = await this.$axios.$post(
          `${this.$site_app}/api/auth/forgot`,
          {
            site_id: this.site.id,
            email: this.email
          }
        );
        if (data.status) {
          this.state = "password-reset";
        } else {
          this.errorForgotMsg = data.msg;
          this.errorForgot = true;
        }
        console.log(data);
      } catch (error) {
        console.error(error);
      }
      this.process = false;
    },
    async passwordReset() {
      this.process = true;
      this.errorPasswordReset = false;
      try {
        const data = await this.$axios.$post(
          `${this.$site_app}/api/auth/password-reset`,
          {
            site_id: this.site.id,
            code: this.resetCode,
            password: this.newPassword
          }
        );
        if (data.status) {
          this.state = null;
        } else {
          this.errorPasswordResetMsg = data.msg;
          this.errorPasswordReset = true;
        }
      } catch (error) {
        console.error(error);
      }
      this.process = false;
    },
    generatePassword() {
      this.showPassword = true;
      this.newPassword = this.pass_gen(10);
    },
    pass_gen(len) {
      const chrs = "abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789";
      //const chrs = "qwertyuiopasdfghjklzxcvbnm123456789";
      let str = "";
      for (var i = 0; i < len; i++) {
        var pos = Math.floor(Math.random() * chrs.length);
        str += chrs.substring(pos, pos + 1);
      }
      return str;
    }
  },
  computed: {
    ...mapGetters({
      site: "sites/site"
    }),
    title() {
      if (this.state == "forgot") {
        return "Забыл пароль";
      } else if (this.state == "password-reset") {
        return "Сбросить пароль";
      } else {
        return "Авторизация";
      }
    },
    disabledForgot() {
      return !this.email;
    },
    disabledPasswordReset() {
      return !this.resetCode || !this.newPassword;
    }
  },
  head() {
    return {
      title: this.title
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
