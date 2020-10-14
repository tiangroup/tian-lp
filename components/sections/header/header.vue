<template>
  <header :class="{ 'position-relative': _isEdit }" :id="section.id">
    <buttons-section v-if="_isEdit" :section="section">
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
import View1 from "./HeaderView1";
import View2 from "./HeaderView2";
import View3 from "./HeaderView3";
import View4 from "./HeaderView4";
import View5 from "./HeaderView5";
import View6 from "./HeaderView6";
export default {
  components: {
    View1,
    View2,
    View3,
    View4,
    View5,
    View6
  },
  props: {
    section: Object
  },
  data: () => ({
    showMenuEditor: false
  }),
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
    },
    view() {
      return this.section.settings.view || "view1";
    }
  }
};
</script>
