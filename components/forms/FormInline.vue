<template>
  <div>
    <div class="form-wrap bg-theme" :style="styleDiv">
      <form-editor-button
        v-if="isEdit && section[field]"
        :formId="section[field]"
      />
      <form-base
        :section="section"
        :field="field"
        :hiddenData="hiddenData"
        @send="onSend"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    section: Object,
    field: {
      type: String,
      default: "form"
    },
    hiddenData: String
  },
  async fetch() {
    if (this.section[this.field]) {
      await this.$store.dispatch("forms/loadForm", this.section[this.field]);
    }
  },
  computed: {
    ...mapGetters({
      _isEdit: "isEdit",
      isSectionEdit: "isSectionEdit"
    }),
    isEdit() {
      return this._isEdit && this.isSectionEdit(this.section);
    },
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    }
  },
  methods: {
    onSend(payload) {
      this.$forms.showMessage(payload);
    }
  }
};
</script>
