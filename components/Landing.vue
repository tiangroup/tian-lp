<template>
  <div class="landing">
    <sections
      v-for="section in page.sections.filter(s => s.id)"
      :key="section.id"
      :section="section"
    />
    <div class="add-section" v-if="page.sections.length === 0 && isEdit">
      <new-section-button />
    </div>

    <panel v-if="$env.DEMO === 'true'" :sections="page.sections"></panel>

    <overlay v-if="isEdit" />

    <image-upload v-if="isEdit" />

    <image-svg v-if="isEdit" />

    <form-message />
    <form-editor v-if="isEdit" />

    <dialog-confirm v-if="isEdit" />

    <dialog-error />

    <forms-licence />

    <div v-if="counter" v-html="counter"></div>

    <yandex-metrika-counter v-if="ym" :ym="ym" />
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
      site: "sites/site"
    }),
    counter() {
      return !this.isEdit && this.site && this.site.counter
        ? this.site.counter
        : null;
    },
    ym() {
      return !this.isEdit && this.site && this.site.ym ? this.site.ym : null;
    }
  },
  methods: {
    ...mapActions({
      loadSections: "sections/loadSections"
    })
  },
  mounted() {
    if (this.isEdit) {
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
