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
        <span>Редактирование мессенджеров</span>
      </v-list-item>

      <v-container v-if="drawer">
        <messenger-list-editor-item
          v-for="(item, index) in section.items[itemIndex].messengers.filter(
            i => i.id
          )"
          :key="item.id"
          :item="item"
          :section-id="section.id"
          :first="index == 0"
          :last="index + 1 == items.length"
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
    MessengerListEditorItem: () => import("./MessengerListEditorItem")
  },
  props: {
    itemIndex: Number,
    show: Boolean,
    section: Object
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
      }
    }
  },
  methods: {
    ...mapMutations({
      addItem: "pages/ADD_ITEM"
    }),
    async newItem() {
      //   this.addItem({
      //     sectionId: this.sectionId,
      //     items: "items.messenger",
      //     itemNew: {
      //       type: "viber"
      //     }
      //   });
      //   this.$overlay(true);
      //   await this.$store.dispatch("pages/savePage");
      //   this.$overlay(false);
      console.log(this.section.items[this.itemIndex].messengers);
    }
  }
};
</script>

<style scoped>
.over {
  z-index: 10010;
}
</style>
