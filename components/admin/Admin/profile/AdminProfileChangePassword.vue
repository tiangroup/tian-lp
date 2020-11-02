<template>
  <v-card>
    <v-card-title>Изменить пароль</v-card-title>
    <v-card-text>
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
      <v-btn color="blue darken-1" text :disabled="disabled" :loading="process">
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
    showPassword: false
  }),
  computed: {
    disabled() {
      return (
        !this.oldPassword ||
        !this.newPassword ||
        this.oldPassword === this.newPassword
      );
    }
  }
};
</script>
