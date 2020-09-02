<template>
<component :is="comp" :section="section" :isEdit="isEdit" />
</template>

<script>
import {
  mapGetters
} from "vuex";
export default {
  props: {
    section: Object
  },
  components: {
    sections_header: () => import("~/components/sections/header/header"),
    sections_benefits: () => import("~/components/sections/benefits/benefits"),
    sections_highlights: () =>
      import("~/components/sections/highlights/highlights"),
    sections_process: () => import("~/components/sections/process/process"),
    sections_promo: () => import("~/components/sections/promo/promo"),
    sections_partners: () => import("~/components/sections/partners/partners"),
    sections_staff: () => import("~/components/sections/staff/staff"),
    sections_tarifs: () => import("~/components/sections/tarifs/tarifs"),
    sections_video: () => import("~/components/sections/video/video"),
    sections_photoes: () => import("~/components/sections/photoes/photoes"),
    sections_questions: () =>
      import("~/components/sections/questions/questions"),
    sections_reviews: () => import("~/components/sections/reviews/reviews"),
    sections_cta: () => import("~/components/sections/cta/cta"),
    sections_footer: () => import("~/components/sections/footer/footer")
  },
  computed: {
    ...mapGetters({
      isEdit: "isEdit"
    }),
    isShow() {
      return this.isEdit || this.section.show === true;
    },
    comp() {
      return this.section.__component.replace(".", "_");
    }
  }
};
</script>
