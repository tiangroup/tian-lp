<template>
  <v-card>
    <v-card-title>Изменить пароль</v-card-title>
    <v-card-text>
      <v-alert type="error" :value="error" transition="scale-transition">
        {{ errorMsg }}
      </v-alert>
      <v-text-field
        label="Старый пароль"
        type="password"
        v-model.trim="oldPassword"
      />
      <v-text-field
        label="Новый пароль"
        v-model.trim="newPassword"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        :type="showPassword ? 'text' : 'password'"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        :disabled="disabled"
        :loading="process"
        @click="changePassword"
      >
        Изменить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    process: false,
    oldPassword: null,
    newPassword: null,
    showPassword: false,
    errorMsg: null,
    error: false
  }),
  computed: {
    disabled() {
      return (
        !this.oldPassword ||
        !this.newPassword ||
        this.oldPassword === this.newPassword
      );
    }
  },
  methods: {
    async changePassword() {
      this.process = true;
      this.error = false;
      try {
        const data = await this.$axios.$post(
          `${this.$site_app}/api/auth/password-change`,
          {
            old_password: this.oldPassword,
            new_password: this.newPassword
          }
        );
        if (data.status) {
          this.oldPassword = null;
          this.newPassword = null;
          this.$auth.logout();
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
