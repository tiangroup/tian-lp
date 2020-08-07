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
    View1: () => import("./HeaderView1"),
    View2: () => import("./HeaderView2"),
    View3: () => import("./HeaderView3"),
    View4: () => import("./HeaderView4"),
    View5: () => import("./HeaderView5"),
    View6: () => import("./HeaderView6")
  },
  props: {
    section: Object
  },
  data: () => ({
    showMenuEditor: false
  }),
  computed: {
    ...mapGetters({
      isEdit: "isEdit"
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    view() {
      return this.section.settings.view || "view1";
    }
  }
};
</script>
