<template>
  <v-card>
    <v-card-title>Архив сайта</v-card-title>
    <v-card-text>
      Скачать сайт в архиве
      <v-select :items="['tar.gz', 'zip']" v-model="archive_type"></v-select>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        @click="archive"
        :loading="processArchive"
      >
        Скачать
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    processArchive: false,
    archive_type: "tar.gz",
    file: null
  }),
  computed: {
    ...mapGetters({
      site: "sites/site"
    })
  },
  methods: {
    async archive() {
      this.processArchive = true;
      try {
        if (!this.file) {
          const data = await this.$axios.$post(
            `${this.$site_app}/api/sites/${this.site.id}/archive`,
            {
              type: this.archive_type
            }
          );
          if (data.status) {
            this.file = data.file;
          }
        }
        if (this.file) {
          let link = document.createElement("a");
          link.setAttribute("href", this.file);
          link.setAttribute("download", "download");
          //link.setAttribute("target", "_blank");
          //document.body.appendChild(link);
          link.click();
        }
      } catch (error) {
        console.error(error);
      }
      this.processArchive = false;
    }
  },
  watch: {
    archive_type(val) {
      this.file = null;
    }
  }
};
</script>
