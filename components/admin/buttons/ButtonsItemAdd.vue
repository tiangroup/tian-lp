<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        dark
        x-small
        color="green"
        v-bind="attrs"
        v-on="on"
        @click="onAddClick"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <span>Добавить новый элемент</span>
  </v-tooltip>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  props: {
    sectionId: String,
    items: {
      type: String,
      default: "items"
    }
  },
  methods: {
    ...mapMutations({
      addItem: "pages/ADD_ITEM"
    }),
    ...mapActions({
      savePage: "pages/savePage"
    }),
    async onAddClick() {
      this.addItem({
        sectionId: this.sectionId,
        items: this.items,
        itemNew: {}
      });
      await this.savePage();
    }
  }
};
</script>
