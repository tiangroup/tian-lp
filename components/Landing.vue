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
      <v-overlay :value="overlay" v-if="isEdit" z-index="10000">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <image-upload v-if="isEdit && dialogImageUpload" />

      <form-message />
      <form-editor v-if="isEdit" />

      <dialog-confirm />
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
      overlay: "overlay",
      dialogImageUpload: "dialogImageUpload"
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
