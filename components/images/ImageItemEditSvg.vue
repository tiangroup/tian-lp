<template>
  <v-menu v-if="isEdit" absolute offset-y>
    <template v-slot:activator="{ on }">
      <div
        v-on="on"
        :class="[divClass, { 'no-image': !img }]"
        style="cursor: pointer"
        v-html="img"
      ></div>
    </template>
    <v-list>
      <v-list-item @click="svgEdit">
        <v-list-item-title>
          Изменить svg картинку
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    divClass: { type: String, default: "" },
    img: String,
    itemId: String,
    sectionId: String,
    field: { type: String, default: "svg" },
    items: { type: String, default: "items" }
  },
  computed: {
    ...mapGetters({
      isEdit: "isEdit"
    })
  },
  methods: {
    svgEdit() {
      this.$images.svg({
        sectionId: this.sectionId,
        itemId: this.itemId,
        items: this.items,
        field: this.field,
        value: this.img
      });
    }
  }
};
</script>
