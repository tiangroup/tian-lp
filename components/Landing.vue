<template>
  <div class="landing">
    <sections
      v-for="section in page.headers"
      :key="section.id"
      :section="section"
      :type="String('headers')"
    />
    <sections
      v-for="section in page.sections"
      :key="section.id"
      :section="section"
      :type="String('sections')"
    />
  </div>
</template>

<script>
import Sections from "~/components/sections/Section";
import { mapGetters } from "vuex";

export default {
  components: {
    Sections
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      page: "pages/page"
    })
  }
};
</script>
