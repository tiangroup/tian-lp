<template>
  <div>
    <v-navigation-drawer
      app
      class="over"
      v-model="drawer"
      right
      temporary
      width="460"
    >
      <v-list-item>
        <v-btn icon @click="drawer = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <span>Редактирование меню</span>
      </v-list-item>
      <v-container>
        <menu-editor-item
          v-for="(item, index) in section.menu.filter((i) => i.id)"
          :key="item.id"
          :menuItem="item"
          :sectionId="section.id"
          :first="index == 0"
          :last="index + 1 == section.menu.length"
        ></menu-editor-item>
        <v-row class="justify-center">
          <v-btn fab dark small color="green" @click="newItem">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    show: Boolean,
    section: Object,
  },
  components: {
    MenuEditorItem: () => import("./MenuEditorItem"),
  },
  computed: {
    drawer: {
      get() {
        return this.show;
      },
      set(value) {
        if (!value) {
          this.$emit("onClose", value);
        }
      },
    },
  },
  methods: {
    ...mapMutations({
      addItem: "pages/ADD_ITEM",
    }),
    async newItem() {
      this.addItem({
        sectionId: this.section.id,
        items: "menu",
        itemNew: {
          title: "Новый пункт",
        },
      });
      await this.$store.dispatch("pages/savePage");
    },
  },
};
</script>

<style scoped>
.over {
  z-index: 220;
}
</style>
