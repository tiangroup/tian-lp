<template>
  <div class="landing" :class="landingClass">
    <sections
      v-for="section in page.sections.filter(s => s.id)"
      :key="section.id"
      :section="section"
    />
    <div class="add-section" v-if="page.sections.length === 0 && isEdit">
      <new-section-button />
    </div>

    <panel v-if="site.demo || isEdit" :sections="page.sections"></panel>

    <overlay v-if="isEdit" />

    <dialog-editor-source v-if="isEdit" />
    <dialog-editor-upload v-if="isEdit" />

    <image-upload v-if="isEdit" />

    <image-svg v-if="isEdit" />

    <form-message />
    <form-editor v-if="isEdit" />

    <dialog-confirm v-if="isEdit" />

    <dialog-error />

    <forms-licence />

    <div v-if="counter" v-html="counter"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Sections from "~/components/sections/Section";
export default {
  components: {
    Sections
  },
  computed: {
    ...mapGetters({
      page: "pages/page",
      isEdit: "isEdit",
      dialogImageUpload: "dialogImageUpload",
      dialogImageSvg: "dialogImageSvg",
      site: "sites/site",
      ym: "sites/ym",
      settings: "sites/settings"
    }),
    counter() {
      return !this.isEdit && this.site && this.site.counter
        ? this.site.counter
        : null;
    },
    landingClass() {
      return {
        mLight:
          !this.settings.background || this.settings.background === "light",
        mDark: this.settings.background === "dark",
        "buttons--style2": this.settings.buttons == "rect"
      };
    }
  },
  methods: {
    ...mapActions({
      loadSections: "sections/loadSections"
    })
  },
  mounted() {
    if (!this.isEdit && this.ym) {
      this.$yandexMetrika.init(this.ym);
    }
    if (this.isEdit || this.site.demo) {
      this.loadSections();
    }
  }
};
</script>

<style scoped>
.add-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  flex-direction: column;
}
</style>
