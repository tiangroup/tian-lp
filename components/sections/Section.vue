<template>
  <component :is="comp" :section="section" :type="type" v-if="isShow" />
</template>

<script>
export default {
  props: {
    section: Object,
    type: String
  },
  components: {
    sections_header: () => import("~/components/sections/header/header"),
    sections_benefits: () => import("~/components/sections/benefits/benefits"),
    sections_highlights: () =>
      import("~/components/sections/highlights/highlights"),
    sections_process: () => import("~/components/sections/process/process"),
    sections_promo: () => import("~/components/sections/promo/promo")
  },
  data: () => ({}),
  computed: {
    isShow() {
      return this.$auth.loggedIn || this.section.show === true;
    },
    comp() {
      return this.section.__component.replace(".", "_");
    }
  }
};
</script>
