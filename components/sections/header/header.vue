<template>
  <header :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section">
      <menu-editor-button
        v-if="isEdit"
        @click="showMenuEditor = true"
      ></menu-editor-button>
    </buttons-section>
    <component :is="view" :section="section" :isEdit="isEdit" />
    <menu-editor
      v-if="isEdit"
      :show="showMenuEditor"
      :section="section"
      @onClose="showMenuEditor = false"
    ></menu-editor>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    ButtonsSection: () => import("@/components/admin/ButtonsSection"),
    MenuEditor: () => import("./menu/MenuEditor"),
    MenuEditorButton: () => import("./menu/MenuEditorButton"),
    View1: () => import("./views/view1"),
    View2: () => import("./views/view2"),
    View3: () => import("./views/view3"),
    View4: () => import("./views/view4"),
    View5: () => import("./views/view5"),
    View6: () => import("./views/view6")
  },
  props: {
    section: Object,
    type: String
  },
  data: () => ({
    showMenuEditor: false
  }),
  computed: {
    isEdit() {
      return this.$auth.loggedIn;
    },
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    view() {
      return this.section.settings.view || "view1";
    }
  }
};
</script>
