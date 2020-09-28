<template>
  <div>
    <v-dialog v-model="dialog" max-width="400" persistent scrollable>
      <v-card>
        <v-card-title>
          <span class="headline">Вставить картинку</span>
        </v-card-title>

        <v-card-text
          v-if="orig"
          style="height: 280px;"
          class="row justify-center align-center"
        >
          <v-container fluid pl-6>
            <v-row justify="center">
              <img :src="$site_img(origImage, imageStyle)" v-if="!inputLink" />
              <v-text-field
                v-else
                label="Cсылка на картинку"
                v-model="imageLink"
              />
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-text
          v-else
          style="height: 280px;"
          class="row justify-center align-center"
        >
          <v-container fluid pl-6>
            <v-row v-if="!image" justify="center">
              <v-btn
                v-if="!inputLink"
                color="blue-grey"
                class="white--text"
                fab
                x-large
                @click="selectFile"
              >
                <v-icon dark>mdi-file-image</v-icon>
              </v-btn>
              <v-text-field
                v-else
                label="Cсылка на картинку"
                v-model="imageLink"
              />
            </v-row>
            <v-row v-else justify="center">
              <img v-if="!inputLink" :src="image" @click="selectFile" />
              <v-text-field
                v-else
                label="Cсылка на картинку"
                v-model="imageLink"
              />
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-menu bottom left v-if="!image">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="inputLink = false">
                <v-list-item-title>выбрать файл</v-list-item-title>
              </v-list-item>
              <v-list-item @click="inputLink = true">
                <v-list-item-title>вставить ссылку</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <v-btn
            color="blue-grey"
            class="ma-2 white--text"
            @click="onUpload"
            v-if="image"
            :loading="loading"
          >
            Загрузить
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>

          <v-btn
            color="blue-grey"
            class="ma-2 white--text"
            @click="onUploadLink"
            v-if="imageLink"
            :loading="loading"
          >
            Загрузить
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            v-if="orig && !inputLink"
            @click="selectFile"
          >
            Изменить
          </v-btn>

          <v-btn color="green darken-1" text @click="close">Отмена</v-btn>
        </v-card-actions>
      </v-card>

      <input type="file" @change="getImage" ref="file" />
    </v-dialog>

    <v-snackbar v-model="snackbar" top color="error">
      {{ shackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data: () => ({
    image: null,
    selectedFile: null,
    loading: false,
    snackbar: false,
    shackbarText: null,
    inputLink: false,
    imageLink: null
  }),
  computed: {
    ...mapGetters({
      itemImageEdit: "imageUpload",
      dialogImageUpload: "dialogImageUpload"
    }),
    dialog: {
      get: function() {
        return this.dialogImageUpload;
      },
      set: function(value) {
        if (!value) {
          this.hideImageUpload();
        }
      }
    },
    orig() {
      return this.itemImageEdit.value && !this.image;
    },
    origImage() {
      return this.itemImageEdit.value;
    },
    imageStyle() {
      return this.itemImageEdit.imageStyle;
    }
  },
  methods: {
    ...mapMutations({
      setSectionField: "pages/SET_SECTION_FIELD",
      setItemField: "pages/SET_ITEM_FIELD"
    }),
    ...mapActions({
      savePage: "pages/savePage",
      hideImageUpload: "hideImageUpload"
    }),
    selectFile() {
      this.$refs.file.click();
    },
    close() {
      this.image = null;
      this.imageLink = null;
      this.dialog = false;
    },
    getImage(event) {
      this.selectedFile = event.target.files[0];
      const image = event.target.files[0];
      if (image.type.indexOf("image/") === 0) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
          this.image = e.target.result;
        };
      } else {
        this.shackbarText = "Выбранный файл не является картинкой";
        this.snackbar = true;
      }
    },
    async onUpload() {
      try {
        this.loading = true;
        const formData = new FormData();
        formData.append("image", this.selectedFile, this.selectedFile.name);
        formData.append("old_image", this.itemImageEdit.value);
        // контекстный путь картинки
        const path = `${this.itemImageEdit.sectionId}${
          this.itemImageEdit.id ? "/" + this.itemImageEdit.id : ""
        }`;
        formData.append("path", path);
        const { data } = await this.$axios.post(
          `${this.$site_app}/api/upload/image`,
          formData
        );
        const itemImageEdit = JSON.parse(JSON.stringify(this.itemImageEdit));
        itemImageEdit.value = data.data.path;
        if (itemImageEdit.sectionId) {
          if (itemImageEdit.items) {
            this.setItemField({
              sectionId: itemImageEdit.sectionId,
              itemId: itemImageEdit.id,
              items: itemImageEdit.items,
              field: itemImageEdit.field,
              value: itemImageEdit.value
            });
          } else {
            this.setSectionField({
              id: itemImageEdit.sectionId,
              field: itemImageEdit.field,
              value: itemImageEdit.value
            });
          }
          await this.savePage();
        }
        await this.$emit("onUpload", itemImageEdit);
        this.image = null;
        this.loading = false;
        this.dialog = false;
        if (this.itemImageEdit.callback) {
          this.itemImageEdit.callback(itemImageEdit);
        }
      } catch (err) {
        console.error(err);
        this.loading = false;
      }
    },
    async onUploadLink() {
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append("old_image", this.itemImageEdit.value);
        formData.append("image_link", this.imageLink);
        // контекстный путь картинки
        const path = `${this.itemImageEdit.sectionId}${
          this.itemImageEdit.id ? "/" + this.itemImageEdit.id : ""
        }`;
        formData.append("path", path);
        const { data } = await this.$axios.post(
          `${this.$site_app}/api/upload/image-link`,
          formData
        );
        const itemImageEdit = JSON.parse(JSON.stringify(this.itemImageEdit));
        itemImageEdit.value = data.data.path;
        if (itemImageEdit.sectionId) {
          if (itemImageEdit.items) {
            this.setItemField({
              sectionId: itemImageEdit.sectionId,
              itemId: itemImageEdit.id,
              items: itemImageEdit.items,
              field: itemImageEdit.field,
              value: itemImageEdit.value
            });
          } else {
            this.setSectionField({
              id: itemImageEdit.sectionId,
              field: itemImageEdit.field,
              value: itemImageEdit.value
            });
          }
          await this.savePage();
        }
        this.$emit("onUpload", itemImageEdit);
        this.image = null;
        this.loading = false;
        this.imageLink = null;
        this.dialog = false;
        if (this.itemImageEdit.callback) {
          this.itemImageEdit.callback(itemImageEdit);
        }
      } catch (err) {
        console.error(err);
        this.loading = false;
        this.shackbarText = "Ошибка загрузки по ссылке";
        this.snackbar = true;
      }
    }
  }
};
</script>

<style scoped>
input[type="file"] {
  position: absolute;
  top: -500px;
}
</style>
