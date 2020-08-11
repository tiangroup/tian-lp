<template>
  <div>
    <v-menu v-if="isEdit" absolute offset-y>
      <template v-slot:activator="{ on, attrs }">
        <div :class="[divClass, { 'no-image': !img }]" v-bind="attrs" v-on="on">
          <img v-if="img" :src="$site_img(img)" />
        </div>
      </template>
      <v-list>
        <v-list-item @click="imageSelect">
          <v-list-item-title>
            Вставить картинку
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="img" @click="deleteDialog = true">
          <v-list-item-title>
            Удалить картинку
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <div v-else :class="[divClass, { 'no-image': !img }]">
      <img v-if="img" :src="$site_img(img)" />
    </div>
    <v-dialog v-model="deleteDialog" persistent max-width="400px" v-if="isEdit">
      <v-card>
        <v-card-title>
          <span class="headline">Удалить картинку</span>
        </v-card-title>

        <v-card-text>Вы действительно хотите удалить картинку?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteDialog = false">
            Отмена
          </v-btn>
          <v-btn color="blue darken-1" text @click="imageDelete">
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  props: {
    divClass: { type: String, default: "" },
    img: String,
    itemId: String,
    sectionId: String,
    fieldName: { type: String, default: "img" },
    fieldItems: { type: String, default: "items" }
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
      setItemField: "pages/SET_ITEM_FIELD",
      overlay: "SET_OVERLAY"
    }),
    ...mapActions({
      savePage: "pages/savePage"
    }),
    imageSelect() {
      this.setImageUpload({
        sectionId: this.sectionId,
        id: this.itemId,
        field: this.fieldName,
        items: this.fieldItems,
        value: this.img
      });
      this.showImageUpload(true);
    },
    async imageDelete() {
      this.overlay(true);
      const formData = new FormData();
      formData.append("image", this.img);
      await this.$axios.post("/api/upload/image-remove", formData);
      this.setItemField({
        sectionId: this.sectionId,
        itemId: this.itemId,
        items: this.fieldItems,
        field: this.fieldName,
        value: null
      });
      await this.savePage();
      this.overlay(false);
      this.deleteDialog = false;
    }
  }
};
</script>
