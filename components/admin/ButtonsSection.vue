<template>
  <div>
    <v-speed-dial
      class="over2"
      absolute
      v-model="fab"
      :top="top"
      :right="right"
      :bottom="bottom"
      :left="left"
      direction="left"
      transition="slide-x-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue" x-small dark fab>
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
            color="blue"
            v-bind="attrs"
            v-on="on"
            @click="settingsDrawer = true"
          >
            <v-icon>mdi-cog-outline</v-icon>
          </v-btn>
        </template>
        <span>Настройки блока</span>
      </v-tooltip>

      <v-tooltip bottom v-if="section.show">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            x-small
            color="green"
            v-bind="attrs"
            v-on="on"
            @click="setShowSection(false)"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>
        <span>Видимый на сайте</span>
      </v-tooltip>
      <v-tooltip bottom v-else>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            x-small
            color="green"
            v-bind="attrs"
            v-on="on"
            @click="setShowSection(true)"
          >
            <v-icon>mdi-eye-off</v-icon>
          </v-btn>
        </template>
        <span>Скрытый на сайте</span>
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
            @click="showNewSectionEditor = true"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Добавить новый блок после текущего</span>
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
            @click="onDownClick"
          >
            <v-icon>mdi-arrow-down</v-icon>
          </v-btn>
        </template>
        <span>Переместить блок вниз</span>
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
            @click="onUpClick"
          >
            <v-icon>mdi-arrow-up</v-icon>
          </v-btn>
        </template>
        <span>Переместить блок наверх</span>
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
        <span>Удалить блок</span>
      </v-tooltip>

      <slot></slot>
    </v-speed-dial>

    <v-navigation-drawer
      app
      class="over"
      v-model="settingsDrawer"
      right
      temporary
      width="400"
    >
      <v-list-item>
        <v-btn icon @click="settingsDrawer = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <span>Настройки блока</span>
      </v-list-item>
      <settings
        :component="section.__component"
        :sectionId="section.id"
        :settings="section.settings"
      />
    </v-navigation-drawer>
    <new-section-editor
      :show="showNewSectionEditor"
      @onClose="showNewSectionEditor = false"
      :sectionId="section.id"
    />
    <v-dialog v-model="deleteDialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Удалить блок</span>
        </v-card-title>

        <v-card-text>
          Вы действительно хотите удалить данный блок?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteDialog = false">
            Отмена
          </v-btn>
          <v-btn color="blue darken-1" text @click="onDelete">
            Удалить
          </v-btn>
        </v-card-actions>

        <v-overlay :value="overlay_delete" :absolute="true">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  components: {
    Settings: () => import("@/components/admin/Settings")
  },
  props: {
    section: Object,
    top: {
      type: Boolean,
      default: function() {
        return this.bottom === true ? false : true;
      }
    },
    right: {
      type: Boolean,
      default: function() {
        return this.left === true ? false : true;
      }
    },
    bottom: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    settingsDrawer: false,
    fab: false,
    showNewSectionEditor: false,
    deleteDialog: false,
    overlay_delete: false
  }),
  methods: {
    ...mapMutations({
      setSectionField: "pages/SET_SECTION_FIELD",
      downSection: "pages/DOWN_SECTION",
      upSection: "pages/UP_SECTION",
      deleteSection: "pages/DELETE_SECTION"
    }),
    setShowSection(show) {
      this.setSectionField({
        id: this.section.id,
        field: "show",
        value: show
      });
    },
    onDownClick() {
      this.downSection({
        sectionId: this.section.id
      });
    },
    onUpClick() {
      this.upSection({
        sectionId: this.section.id
      });
    },
    async onDelete() {
      this.deleteSection({
        sectionId: this.section.id
      });
    }
  }
};
</script>

<style scoped>
.over {
  z-index: 10010;
}
.over2 {
  z-index: 1010;
}
</style>
