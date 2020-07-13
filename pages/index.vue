<template>
  <landing></landing>
</template>

<script>
import Landing from "~/components/Landing";
import { mapGetters } from "vuex";

export default {
  layout: "landing",
  async fetch({ store, req }) {
    //const hostname = req.hostname;

    //await store.dispatch("sites/loadSites", hostname);

    const rootSite = store.getters["sites/root"];

    if (rootSite) {
      await store.dispatch("pages/loadPage", rootSite.page);
    }
  },
  components: {
    Landing
  },
  head() {
    return {
      title: this.head.title
    };
  },
  computed: {
    ...mapGetters({
      head: "pages/head"
    })
  }
};
</script>
