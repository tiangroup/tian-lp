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
      isApp: "isApp"
    }),
    isEdit() {
      return this.$auth.loggedIn;
    },
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
