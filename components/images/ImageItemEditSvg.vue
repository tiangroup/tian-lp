<template>
  <v-menu v-if="isEdit" absolute offset-y>
    <template v-slot:activator="{ on }">
      <div
        v-on="on"
        :class="[divClass, { 'no-image': !svg }]"
        style="cursor: pointer"
        v-html="svg"
      ></div>
    </template>
    <v-list>
      <v-list-item @click="svgSelect">
        <v-list-item-title>
          {{ svg ? "Изменить svg картинку" : "Вставить svg картинку" }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item v-if="field" @click="imageSelect">
        <v-list-item-title>
          Загрузить картинку
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
    field: { type: String, default: "svg" },
    items: { type: String, default: "items" },
    svg: String,
    fieldSvg: String
  },
  computed: {
    ...mapGetters({
      _isEdit: "isEdit",
      isSectionEdit: "isSectionEdit"
    }),
    isEdit() {
      return this.isSectionEdit(this.sectionId);
    }
  },
  methods: {
    ...mapMutations({
      setSectionField: "pages/SET_SECTION_FIELD",
      setItemField: "pages/SET_ITEM_FIELD"
    }),
    ...mapActions({
      savePage: "pages/savePage"
    }),
    svgSelect() {
      this.$images.svg({
        sectionId: this.sectionId,
        itemId: this.itemId,
        items: this.items,
        field: this.fieldSvg,
        value: this.svg
      });
    },
    imageSelect() {
      this.$images.upload({
        sectionId: this.sectionId,
        id: this.itemId,
        field: this.field,
        items: this.items,
        value: this.img,
        callback: item => {
          if (this.items) {
            this.setItemField({
              sectionId: this.sectionId,
              itemId: this.itemId,
              items: this.items,
              field: this.fieldSvg,
              value: null
            });
          } else {
            this.setSectionField({
              id: this.sectionId,
              field: this.fieldSvg,
              value: null
            });
          }
          this.savePage();
        }
      });
    }
  }
};
</script>
