<template>
  <div>
    <v-speed-dial
      absolute
      v-model="fab"
      top
      right
      direction="left"
      transition="slide-x-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="green" x-small dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </template>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            x-small
            color="green"
            v-bind="attrs"
            v-on="on"
            @click="itemAdd"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Добавить новый элемент после текущего</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            x-small
            color="green"
            v-bind="attrs"
            v-on="on"
            @click="itemDown"
          >
            <v-icon>mdi-arrow-down</v-icon>
          </v-btn>
        </template>
        <span>Переместить элемент вперёд</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            x-small
            color="green"
            v-bind="attrs"
            v-on="on"
            @click="itemUp"
          >
            <v-icon>mdi-arrow-up</v-icon>
          </v-btn>
        </template>
        <span>Переместить элемент назад</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            x-small
            color="red"
            v-bind="attrs"
            v-on="on"
            @click="deleteDialog = true"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Удалить элемент</span>
      </v-tooltip>
      <slot></slot>
    </v-speed-dial>
    <v-dialog v-model="deleteDialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Удалить элемент</span>
        </v-card-title>

        <v-card-text>Вы действительно хотите удалить элемент?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteDialog = false">
            Отмена
          </v-btn>
          <v-btn color="blue darken-1" text @click="onDeleteItem">
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    itemId: String,
    sectionId: String,
    items: {
      type: String,
      default: "items"
    }
  },
  data: () => ({
    fab: false,
    deleteDialog: false
  }),
  methods: {
    ...mapMutations({
      addItem: "pages/ADD_ITEM",
      deleteItem: "pages/DELETE_ITEM",
      downItem: "pages/DOWN_ITEM",
      upItem: "pages/UP_ITEM"
    }),
    onDeleteItem() {
      this.itemDelete();
      this.$emit("onAction", { action: "delete" });
      this.deleteDialog = false;
    },
    async itemAdd() {
      this.addItem({
        sectionId: this.sectionId,
        itemId: this.itemId,
        items: this.items,
        itemNew: {}
      });
      await this.$store.dispatch("pages/savePage");
      this.$emit("onAction", { action: "add" });
    },
    async itemDelete() {
      this.$emit("onItemDelete", { itemId: this.itemId });
      this.deleteItem({
        sectionId: this.sectionId,
        itemId: this.itemId,
        items: this.items
      });
      await this.$store.dispatch("pages/savePage");
    },
    itemDown() {
      this.downItem({
        sectionId: this.sectionId,
        itemId: this.itemId,
        items: this.items
      });
      this.$emit("onAction", { action: "down" });
    },
    itemUp() {
      this.upItem({
        sectionId: this.sectionId,
        itemId: this.itemId,
        items: this.items
      });
      this.$emit("onAction", { action: "up" });
    }
  }
};
</script>
