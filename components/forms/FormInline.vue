<template>
  <div>
    <div class="form-wrap bg-theme" :style="styleDiv">
      <form-editor
        v-if="isEdit && section[field]"
        :section="section"
        :field="field"
      />
      <form-base :section="section" :field="field" :hiddenData="hiddenData" />
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
  computed: {
    ...mapGetters({
      isEdit: "isEdit"
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    }
  }
};
</script>
