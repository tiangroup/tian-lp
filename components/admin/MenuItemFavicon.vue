<template>
  <v-list-item link @click="openUpload">
    <v-list-item-icon>
      <v-icon>mdi-image-filter-vintage</v-icon>
    </v-list-item-icon>
    <v-list-item-title>Фавикон</v-list-item-title>
  </v-list-item>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    process: false
  }),
  computed: {
    ...mapGetters({
      site: "sites/site"
    })
  },
  methods: {
    ...mapActions({
      saveSite: "sites/saveSite"
    }),
    ...mapMutations({
      setFavicon: "sites/SET_FAVICON"
    }),
    openUpload() {
      this.$images.upload({
        title: "Загрузить фавикон",
        path: "favicon",
        value: this.site.favicon,
        upload: "static",
        callback: image => {
          console.log(image);
          this.setFavicon(image.value);
          this.saveSite();
        }
      });
    }
  }
};
</script>
