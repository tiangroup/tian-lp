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
        <span>Добавить блок</span>
      </v-list-item>
      <v-container>
        <new-section-editor-item
          v-for="section in sections"
          :key="section.component"
          :section="section"
          :sectionId="sectionId"
          @onAdd="drawer = false"
        />
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    show: Boolean,
    sectionId: {
      type: String,
      default: null,
    },
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
    ...mapGetters({
      sections: "sections/sections",
    }),
  },
};
</script>

<style scoped>
.over {
  z-index: 120;
}
</style>
