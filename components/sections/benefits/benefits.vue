<template>
  <div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section"></buttons-section>

    <component :is="view" :section="section" :isEdit="isEdit" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import View1 from "./BenefitsView1";
import View2 from "./BenefitsView2";
import View3 from "./BenefitsView3";
export default {
  props: {
    section: Object
  },
  components: {
    View1,
    View2,
    View3
  },
  computed: {
    ...mapGetters({
      isEdit: "isEdit"
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    view() {
      return this.section.settings.view;
    }
  }
};
</script>
<style scoped>
.benefits >>> .v-skeleton-loader__heading,
.benefits >>> .v-skeleton-loader__text {
  background-color: var(--separator-color);
}
</style>
