<template>
  <v-snackbar v-model="snackbar" top color="error">
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      dialogError: "dialogError",
      error: "error"
    }),
    snackbar: {
      get: function() {
        return this.dialogError;
      },
      set: function(value) {
        if (!value) {
          this.hideError();
        }
      }
    },
    message() {
      return this.error.message || "";
    }
  },
  methods: {
    ...mapActions({
      hideError: "hideError"
    })
  }
};
</script>
