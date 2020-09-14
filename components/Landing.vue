<template>
  <div>
    <Login v-if="isLogin"></Login>
    <div class="landing" v-else>
      <sections
        v-for="section in page.sections.filter(s => s.id)"
        :key="section.id"
        :section="section"
      />
      <div class="add-section" v-if="page.sections.length === 0 && isEdit">
        <new-section-button />
      </div>

      <overlay v-if="isEdit" />

      <image-upload v-if="isEdit" />

      <image-svg v-if="isEdit" />

      <form-message />
      <form-editor v-if="isEdit" />

      <dialog-confirm v-if="isEdit" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Sections: () => import("~/components/sections/Section")
  },
  computed: {
    ...mapGetters({
      page: "pages/page",
      isApp: "isApp",
      isEdit: "isEdit",
      dialogImageUpload: "dialogImageUpload",
      dialogImageSvg: "dialogImageSvg"
    }),
    isLogin() {
      return this.isApp && !this.$auth.loggedIn;
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
