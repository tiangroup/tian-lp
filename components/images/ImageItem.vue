<template>
  <component
    :is="comp"
    :divClass="divClass"
    :img="img"
    :itemId="itemId"
    :sectionId="sectionId"
    :field="fieldName"
    :items="items"
  />
</template>

<script>
import { mapGetters } from "vuex";
import out from "./ImageItemOut";
import edit from "./ImageItemEdit";
import outSvg from "./ImageItemOutSvg";
import editSvg from "./ImageItemEditSvg";
export default {
  props: {
    divClass: { type: String, default: "" },
    img: String,
    itemId: String,
    sectionId: String,
    field: { type: String, default: "img" },
    items: { type: String, default: "items" },
    fieldSvg: { type: String, default: null }
  },
  components: {
    out,
    edit,
    outSvg,
    editSvg
  },
  computed: {
    ...mapGetters({
      isEdit: "isEdit"
    }),
    fieldName() {
      return this.fieldSvg ? this.fieldSvg : this.field;
    },
    comp() {
      if (this.fieldSvg) {
        return this.isEdit ? "editSvg" : "outSvg";
      } else {
        return this.isEdit ? "edit" : "out";
      }
    }
  }
};
</script>
