<template>
  <div>
    <v-list-item-group v-model="item">
      <v-list-item link v-for="page in pages" :key="page.id">
        <v-list-item-icon>
          <v-icon>mdi-application</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ page.slug }}</v-list-item-title>
      </v-list-item>
    </v-list-item-group>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapGetters({
      pages: "sites/pages",
      page: "pages/page"
    }),
    item: {
      get() {
        return this.pages.indexOf(this.pages.find(p => p.page == this.page.id));
      },
      set(value) {
        /*const id = this.pages[value].page;
        this.overlay(true);
        this.loadPage(id).then(() => {
          this.overlay(false);
        });*/
        this.$router.push(this.pages[value].slug);
      }
    }
  },
  methods: {
    ...mapActions({
      loadPage: "pages/loadPage"
    }),
    ...mapMutations({
      overlay: "SET_OVERLAY"
    })
  }
};
</script>
