<template>
  <div>
    <div class="form-wrap bg-theme" :style="styleDiv">
      <form-editor
        v-if="isEdit && section[field]"
        :section="section"
        :field="field"
      />
      <form-base :section="section" :field="field" />
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
    }
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
