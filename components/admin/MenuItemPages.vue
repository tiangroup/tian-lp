<template>
  <v-list-item-group v-model="item">
    <v-list-item link v-for="page in _pages" :key="page">
      <v-list-item-icon>
        <!--
        <v-icon>mdi-application</v-icon>
        -->
      </v-list-item-icon>

      <v-list-item-title>{{ page }}</v-list-item-title>
    </v-list-item>
  </v-list-item-group>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      pages: "sites/pages",
      page: "pages/page"
    }),
    item: {
      get() {
        const page = this.pages.find(p => p.page == this.page.id);
        return page ? this._pages.indexOf(page.slug) : -1;
      },
      set(value) {
        if (value > -1 && this._pages[value]) {
          this.$emit("routes");
          this.$router.push(this._pages[value]);
        }
      }
    },
    _pages() {
      return this.pages.map(i => i.slug).sort();
    }
  },
  methods: {
    ...mapActions({
      loadPage: "pages/loadPage"
    })
  }
};
</script>
