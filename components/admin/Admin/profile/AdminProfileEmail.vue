<template>
  <v-card>
    <v-card-title>Адрес электронной почты</v-card-title>
    <v-card-text>
      <div class="mb-2">{{ email }}</div>

      <v-alert type="error" :value="error" transition="scale-transition">
        {{ errorMsg }}
      </v-alert>
      <div v-if="state == 'change'">
        <v-text-field
          label="Новый e-mail"
          v-model.trim="newEmail"
          :rules="[rules.email]"
        />
        <v-text-field
          label="Введите пароль"
          type="password"
          v-model.trim="password"
        />
      </div>
      <div v-else-if="state == 'confirm'">
        <v-text-field
          label="Введите код подтверждения"
          v-model.trim="codeConfirm"
        />
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        :loading="process"
        @click="onCancel"
        v-show="!process && (state == 'change' || state == 'confirm')"
      >
        Отмена
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        :loading="process"
        @click="onSave"
        v-show="state == 'change'"
        :disabled="disabled"
      >
        Сохранить
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        :loading="process"
        @click="onConfirm"
        v-show="state == 'confirm'"
        :disabled="disabledConfirm"
      >
        Подтвердить
      </v-btn>
      <v-btn color="blue darken-1" text @click="onChange" v-show="!state">
        Изменить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    process: false,
    state: null,
    password: null,
    newEmail: null,
    errorMsg: null,
    error: false,
    codeConfirm: null,
    rules: {
      required: value => !!value || "Поле обязательно для заполнения",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return value ? pattern.test(value) || "Неверный e-mail" : true;
      }
    }
  }),
  computed: {
    email() {
      return this.state == "confirm"
        ? `Код подтверждения отправлен на новый адрес ${this.newEmail}`
        : this.$auth.user.email;
    },
    disabled() {
      return (
        !this.password ||
        !this.newEmail ||
        this.rules.email(this.newEmail) !== true
      );
    },
    disabledConfirm() {
      return !this.codeConfirm;
    }
  },
  methods: {
    onChange() {
      this.state = "change";
    },
    onCancel() {
      this.state = null;
    },
    async onSave() {
      this.process = true;
      this.error = false;
      try {
        const data = await this.$axios.$post(
          `${this.$site_app}/api/auth/email-change`,
          {
            password: this.password,
            new_email: this.newEmail
          }
        );
        if (data.status) {
          this.password = null;
          this.state = "confirm";
        } else {
          this.errorMsg = data.msg;
          this.error = true;
        }
      } catch (error) {
        console.error(error);
      }
      this.process = false;
    },
    async onConfirm() {
      this.process = true;
      this.error = false;
      try {
        const data = await this.$axios.$post(
          `${this.$site_app}/api/auth/email-confirm`,
          {
            code: this.codeConfirm,
            new_email: this.newEmail
          }
        );
        if (data.status) {
          this.codeConfirm = null;
          this.newEmail = null;
          this.state = null;
          await this.$auth.fetchUser();
        } else {
          this.errorMsg = data.msg;
          this.error = true;
        }
      } catch (error) {
        console.error(error);
      }
      this.process = false;
    }
  }
};
</script>
