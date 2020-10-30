<template>
  <div>
    <v-dialog v-model="dialog" max-width="800px" scrollable>
      <v-card>
        <v-card-title>
          <span class="headline">Загрузки</span>
          <v-spacer></v-spacer>
          <v-btn icon v-show="false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
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
              :key="file.src"
              class="d-flex child-flex"
              cols="4"
            >
              <v-menu absolute offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-img
                    v-bind="attrs"
                    v-on="on"
                    :src="file.src"
                    contain
                    aspect-ratio="2"
                    class="grey lighten-2"
                  ></v-img>
                </template>
                <v-list>
                  <!--
                  <v-list-item>
                    <v-text-field label="Ссылка" :value="file.url" autofocus />
                  </v-list-item>
                  -->
                  <v-list-item @click="copyLink(file)">
                    <v-list-item-title>
                      Скопировать ссылку
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="deleteFile(file)">
                    <v-list-item-title>
                      Удалить картинку
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
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
    <v-snackbar v-model="snackbar" top>
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.style.position = "fixed";
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = "2em";
  textArea.style.height = "2em";

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = "transparent";

  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Copying text command was " + msg);
  } catch (err) {
    console.log("Oops, unable to copy");
  }

  document.body.removeChild(textArea);
}
export default {
  data: () => ({
    snackbar: false,
    message: ""
  }),
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
      return this.editorUpload.files
        ? this.editorUpload.files.map(file => ({
            src: `${this.$site_app}${file.url}`,
            url: file.url,
            img: file.img
          }))
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
          this.$editorUpload({
            sectionId: this.editorUpload.sectionId
          });
        }
      });
    },
    copyLink(file) {
      //copyTextToClipboard(file.url);
      this.$clipboard(file.src);
      this.message = "Ссылка скопирована в буфер обмена";
      this.snackbar = true;
      this.dialog = false;
    },
    async deleteFile(file) {
      this.$confirm({
        title: "Удалить картинку",
        message: "Вы действительно хотите удалить картинку?",
        button: {
          no: "Отмена",
          yes: "Удалить"
        },
        callback: async confirm => {
          if (confirm) {
            const formData = new FormData();
            formData.append("image", file.img);
            formData.append("upload", "static");
            await this.$axios.post(
              `${this.$site_app}/api/upload/image-remove`,
              formData
            );
            this.$editorUpload({
              sectionId: this.editorUpload.sectionId
            });
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.btn-add {
  margin: 0px 20px 50px 0px;
}
</style>
