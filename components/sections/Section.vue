<template>
  <component :is="comp" :section="section" :isEdit="isEdit" v-if="isShow" />
</template>

<script>
import { mapGetters } from "vuex";
import sections_header from "~/components/sections/header/header";
import sections_benefits from "~/components/sections/benefits/benefits";
import sections_highlights from "~/components/sections/highlights/highlights";
import sections_process from "~/components/sections/process/process";
import sections_promo from "~/components/sections/promo/promo";
import sections_partners from "~/components/sections/partners/partners";
import sections_staff from "~/components/sections/staff/staff";
import sections_tarifs from "~/components/sections/tarifs/tarifs";
import sections_video from "~/components/sections/video/video";
import sections_photoes from "~/components/sections/photoes/photoes";
import sections_questions from "~/components/sections/questions/questions";
import sections_reviews from "~/components/sections/reviews/reviews";
import sections_cta from "~/components/sections/cta/cta";
import sections_contacts from "~/components/sections/contacts/contacts";
import sections_footer from "~/components/sections/footer/footer";
import sections_products from "~/components/sections/products/products";
export default {
  props: {
    section: Object
  },
  components: {
    sections_header,
    sections_benefits,
    sections_highlights,
    sections_process,
    sections_promo,
    sections_partners,
    sections_staff,
    sections_tarifs,
    sections_video,
    sections_photoes,
    sections_questions,
    sections_reviews,
    sections_cta,
    sections_contacts,
    sections_footer,
    sections_products
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
