<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        dark
        x-small
        color="green"
        v-bind="attrs"
        v-on="on"
        absolute
        top
        left
        @click="onEditor"
        class="mt-8"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <span>Редактировать форму</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    formId: String,
    popup: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onEditor() {
      this.$forms.showEditor({
        formId: this.formId,
        popup: this.popup
      });
    }
  }
};
</script>
