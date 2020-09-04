<template>
  <component
    :is="comp"
    :divClass="divClass"
    :img="img"
    :itemId="itemId"
    :sectionId="sectionId"
    :field="field"
    :items="items"
  />
</template>

<script>
import { mapGetters } from "vuex";
import out from "~/components/admin/ImageItemOut";
import edit from "~/components/admin/ImageItemEdit";
export default {
  props: {
    divClass: { type: String, default: "" },
    img: String,
    itemId: String,
    sectionId: String,
    field: { type: String, default: "img" },
    items: { type: String, default: "items" }
  },
  components: {
    out,
    edit
  },
  computed: {
    ...mapGetters({
      isEdit: "isEdit"
    }),
    comp() {
      return this.isEdit ? "edit" : "out";
    }
  }
};
</script>
