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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
    Sections: () => import("~/components/sections/Section")
  },
  computed: {
    ...mapGetters({
      page: "pages/page"
    }),
    isEdit() {
      return this.$auth.loggedIn;
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
