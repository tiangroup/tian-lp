<template>
  <landing></landing>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  layout: "landing",
  async fetch({ store, error, params }) {
    const site = store.getters["sites/site"];
    if (site) {
      const page = site.pages.find(p => p.slug === "/" + params.slug);
      if (page) {
        await store.dispatch("pages/loadPage", page.page);
      } else {
        error({ statusCode: 404, message: "Страница не найдена" });
      }
    } else {
      error({ statusCode: 404, message: "Сайт не найден" });
    }
  },
  components: {
    Landing: () => import("~/components/Landing")
  },
  head() {
    const meta = this.head
      ? this.head.meta.map(item => ({
          hid: item.name,
          name: item.name,
          content: item.content
        }))
      : null;
    const title = this.head ? this.head.title : null;
    return {
      title,
      meta
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
