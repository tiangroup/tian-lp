<template>
  <component
    :is="comp"
    :divClass="divClass"
    :img="img"
    :itemId="itemId"
    :sectionId="sectionId"
    :field="field"
    :items="items"
    :fieldSvg="fieldSvg"
    :svg="svg"
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
    img: { type: String, default: null },
    itemId: String,
    sectionId: String,
    field: { type: String, default: "img" },
    items: { type: String, default: "items" },
    fieldSvg: { type: String, default: null },
    svg: { type: String, default: null }
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
      if (this.fieldSvg && this.field && this.svg) {
        return this.isEdit ? "editSvg" : "outSvg";
      } else if (this.fieldSvg && this.field) {
        return this.isEdit ? "edit" : "out";
      } else if (this.fieldSvg) {
        return this.isEdit ? "editSvg" : "outSvg";
      } else {
        return this.isEdit ? "edit" : "out";
      }
    }
  }
};
</script>
