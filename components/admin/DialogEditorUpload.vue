<template>
  <div>
    <v-dialog v-model="dialog" max-width="800px" scrollable>
      <v-card>
        <v-card-title>
          <span class="headline">Загрузки</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text style="min-height: 200px">
          <v-row>
            <!--
            <v-col v-for="n in 14" :key="n" class="d-flex child-flex" cols="4">
              <v-img
                :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                class="grey lighten-2"
              ></v-img>
            </v-col>
            -->
            <v-col
              v-for="file in files"
              :key="file"
              class="d-flex child-flex"
              cols="4"
            >
              <v-img :src="file.src" contain class="grey lighten-2"></v-img>
            </v-col>
          </v-row>
          <v-btn
            color="green"
            dark
            absolute
            bottom
            right
            fab
            class="btn-add"
            @click="openUpload"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      dialogEditorUpload: "dialogEditorUpload",
      editorUpload: "editorUpload",
      site: "sites/site"
    }),
    dialog: {
      get: function() {
        return this.dialogEditorUpload;
      },
      set: function(value) {
        if (!value) {
          this.hideEditorUpload();
        }
      }
    },
    files() {
      const path = `/uploads/${this.site.name}/${this.editorUpload.sectionId}/upload`;
      return this.editorUpload.files
        ? this.editorUpload.files.map(file => ({ src: `${path}/${file}` }))
        : [];
    }
  },
  methods: {
    ...mapActions({
      hideEditorUpload: "hideEditorUpload"
    }),
    close() {
      this.dialog = false;
    },
    openUpload() {
      this.$images.upload({
        title: "Загрузить картинку",
        path: `${this.editorUpload.sectionId}/upload`,
        value: null,
        upload: "static",
        callback: image => {
          console.log(image);
        }
      });
    },
    async getFiles() {
      // const { files } = await this.$axios.$get(
      //   `${this.$site_app}/api/upload/section/${this.editorUpload.sectionId}`
      // );
      // console.log(files);
    }
  },
  watch: {
    dialogEditorUpload: function() {
      if (this.dialogEditorUpload) {
        console.log(this.editorUpload);
        this.getFiles();
      }
    }
  }
};
</script>

<style scoped>
.btn-add {
  margin: 0px 20px 50px 0px;
}
</style>
