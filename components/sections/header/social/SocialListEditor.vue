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
        <span>Редактирование социальных сетей</span>
      </v-list-item>

      <v-container v-if="drawer">
        <social-list-editor-item
          v-for="(item, index) in section.socials.filter((i) => i.id)"
          :key="item.id"
          :item="item"
          :sectionId="section.id"
          :first="index == 0"
          :last="index + 1 == section.socials.length"
        />
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
  components: {
    SocialListEditorItem: () => import("./SocialListEditorItem"),
  },
  props: {
    show: Boolean,
    section: Object,
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
        items: "socials",
        itemNew: {
          type: "vk",
        },
      });
      this.$overlay(true);
      await this.$store.dispatch("pages/savePage");
      this.$overlay(false);
    },
  },
};
</script>

<style scoped>
.over {
  z-index: 200;
}
</style>
