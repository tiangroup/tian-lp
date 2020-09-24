<template>
  <v-menu v-if="isEdit" absolute offset-y>
    <template v-slot:activator="{ on, attrs }">
      <div :class="[divClass, { 'no-image': !img }]" v-bind="attrs" v-on="on">
        <img v-if="img" :src="$site_img(img, imageStyle)" />
      </div>
    </template>
    <v-list>
      <v-list-item @click="imageSelect">
        <v-list-item-title>
          {{ img ? "Изменить картинку" : "Вставить картинку" }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item v-if="img" @click="imageDelete">
        <v-list-item-title>
          Удалить картинку
        </v-list-item-title>
      </v-list-item>
      <v-list-item v-if="fieldSvg" @click="svgSelect">
        <v-list-item-title>
          Вставить svg картинку
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  props: {
    divClass: { type: String, default: "" },
    img: String,
    itemId: String,
    sectionId: String,
    field: { type: String, default: "img" },
    items: { type: String, default: "items" },
    fieldSvg: String,
    svg: String,
    imageStyle: { type: String, default: null }
  },
  data: () => ({
    deleteDialog: false
  }),
  computed: {
    ...mapGetters({
      isEdit: "isEdit"
    })
  },
  methods: {
    ...mapMutations({
      showImageUpload: "SET_DIALOG_IMAGE_UPLOAD",
      setImageUpload: "SET_IMAGE_UPLOAD",
      setSectionField: "pages/SET_SECTION_FIELD",
      setItemField: "pages/SET_ITEM_FIELD"
    }),
    ...mapActions({
      savePage: "pages/savePage"
    }),
    imageSelect() {
      this.$images.upload({
        sectionId: this.sectionId,
        id: this.itemId,
        field: this.field,
        items: this.items,
        value: this.img,
        imageStyle: this.imageStyle
      });
    },
    svgSelect() {
      this.$images.svg({
        sectionId: this.sectionId,
        itemId: this.itemId,
        items: this.items,
        field: this.fieldSvg,
        value: this.svg,
        callback: () => {
          this.imageRemove();
        }
      });
    },
    async imageDelete() {
      this.$confirm({
        title: "Удалить картинку",
        message: "Вы действительно хотите удалить картинку?",
        button: {
          no: "Отмена",
          yes: "Удалить"
        },
        callback: async confirm => {
          if (confirm) {
            this.$overlay(true);
            this.imageRemove();
            this.$overlay(false);
            this.deleteDialog = false;
          }
        }
      });
    },
    async imageRemove() {
      const formData = new FormData();
      formData.append("image", this.img);
      await this.$axios.post(
        `${this.$site_app}/api/upload/image-remove`,
        formData
      );
      if (this.items) {
        this.setItemField({
          sectionId: this.sectionId,
          itemId: this.itemId,
          items: this.items,
          field: this.field,
          value: null
        });
      } else {
        this.setSectionField({
          id: this.sectionId,
          field: this.field,
          value: null
        });
      }
      await this.savePage();
    }
  }
};
</script>
