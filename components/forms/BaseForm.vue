<template>
  <div>
    <div class="form-wrap bg-theme" :style="styleDiv" v-if="form">
      <buttons-form-editor v-if="isEdit && form" :form="form" />
      <form-base :form="form" />
    </div>
    <v-tooltip bottom v-else-if="isEdit">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          dark
          x-small
          color="green"
          v-bind="attrs"
          v-on="on"
          @click="createForm"
          :loading="loading"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Добавить форму</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    section: Object,
    field: {
      type: String,
      default: "form"
    }
  },
  data: () => ({
    loading: false,
    formData: {}
  }),
  async fetch() {
    if (this.formId) {
      await this.$store.dispatch("forms/loadForm", this.formId);
    }
  },
  computed: {
    ...mapGetters({
      getForm: "forms/form",
      isEdit: "isEdit"
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    form() {
      return this.formId ? this.getForm(this.formId) : null;
    },
    formId() {
      return this.section[this.field];
    }
  },
  methods: {
    ...mapActions({
      savePage: "pages/savePage",
      addForm: "forms/addForm",
      loadForm: "forms/loadForm"
    }),
    async createForm() {
      if (!this.formId) {
        this.loading = true;
        await this.addForm({
          sectionId: this.section.id,
          field: this.field
        });
        await this.savePage();
        await this.loadForm(this.formId);
      }
    }
  }
};
</script>
