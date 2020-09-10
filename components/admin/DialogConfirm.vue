<template>
  <v-dialog v-model="dialog" max-width="400px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="onNo">
          {{ button.no }}
        </v-btn>
        <v-btn color="blue darken-1" text @click="onYes">
          {{ button.yes }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      dialogConfirm: "dialogConfirm",
      confirm: "confirm"
    }),
    dialog: {
      get: function() {
        return this.dialogConfirm;
      },
      set: function(value) {
        if (!value) {
          this.hideConfirm();
        }
      }
    },
    title() {
      return this.confirm.title || "Подтверждение";
    },
    message() {
      return this.confirm.message || "";
    },
    button() {
      return (
        this.confirm.button || {
          no: "Отмена",
          yes: "Удалить"
        }
      );
    }
  },
  methods: {
    ...mapActions({
      hideConfirm: "hideConfirm"
    }),
    onYes() {
      this.hideConfirm();
      if (this.confirm.callback) {
        this.confirm.callback(true);
      }
    },
    onNo() {
      this.hideConfirm();
      if (this.confirm.callback) {
        this.confirm.callback(false);
      }
    }
  }
};
</script>
