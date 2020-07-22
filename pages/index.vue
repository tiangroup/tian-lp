<template>
  <landing></landing>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "landing",
  async fetch({ store, error }) {
    const site = store.getters["sites/site"];
    if (site) {
      const page = site.pages.find(p => p.slug == "/");
      if (page) {
        await store.dispatch("pages/loadPage", page.page);
      }
    } else {
      error({ statusCode: 404, message: "Сайт не найден" });
    }
  },
  components: {
    Landing: () => import("~/components/Landing")
  },
  head() {
    return {
      title: this.page ? this.head.title : null
    };
  },
  computed: {
    ...mapGetters({
      page: "pages/page",
      head: "pages/head"
    })
  }
};
</script>
