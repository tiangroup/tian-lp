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

      <slot></slot>

      <!--
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            small
            color="green"
            v-bind="attrs"
            v-on="on"
            @click="downSection"
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
            small
            color="green"
            v-bind="attrs"
            v-on="on"
            @click="upSection"
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
            small
            color="red"
            v-bind="attrs"
            v-on="on"
            @click="dialog = true"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Удалить блок</span>
      </v-tooltip>
      -->
    </v-speed-dial>

    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Удалить блок</span>
        </v-card-title>

        <v-card-text>Вы действительно хотите удалить блок?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Отмена</v-btn
          >
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Удалить</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-navigation-drawer
      app
      class="over"
      v-model="settingsDrawer"
      right
      temporary
      width="400"
    >
      <settings
        :component="section.__component"
        :sectionId="section.id"
        :settings="section.settings"
      />
    </v-navigation-drawer>
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
    dialog: false
  }),
  methods: {
    ...mapMutations({
      setSectionField: "pages/SET_SECTION_FIELD"
    }),
    setShowSection(show) {
      this.setSectionField({
        id: this.section.id,
        field: "show",
        value: show
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
