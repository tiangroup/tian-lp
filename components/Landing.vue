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
    </div>
    <v-overlay :value="overlay" v-if="isEdit" z-index="10000">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <image-upload
      v-if="isEdit"
      :dialog="showDialogImageUpload"
      @close="showDialogImageUpload = false"
      @onUpload="showDialogImageUpload = false"
      :itemImageEdit="itemImageEdit"
    />
    <vue-confirm-dialog v-if="isEdit"></vue-confirm-dialog>
    <form-message />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
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
      dialogImageUpload: "dialogImageUpload",
      imageUpload: "imageUpload"
    }),
    showDialogImageUpload: {
      get() {
        return this.dialogImageUpload;
      },
      set(value) {
        this.setDialogImageUpload(value);
      }
    },
    itemImageEdit: {
      get() {
        return this.imageUpload;
      },
      set(value) {
        this.setImageUpload(value);
      }
    },
    isLogin() {
      return this.isApp && !this.$auth.loggedIn;
    }
  },
  methods: {
    ...mapActions({
      loadSections: "sections/loadSections"
    }),
    ...mapMutations({
      setDialogImageUpload: "SET_DIALOG_IMAGE_UPLOAD",
      setImageUpload: "SET_IMAGE_UPLOAD"
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
