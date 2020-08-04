<template>
  <div>
    <v-app-bar app color="blue" dark class="over">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Редактирование</v-toolbar-title>

      <v-tooltip bottom v-if="change">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            class="ml-2"
            :loading="saveLoading"
            @click="savePage"
          >
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </template>
        <span>Сохранить изменения</span>
      </v-tooltip>

      <v-spacer></v-spacer>

      <v-tooltip bottom v-if="!isPreview">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="setPreview(true)">
            <v-icon>mdi-monitor-eye</v-icon>
          </v-btn>
        </template>
        <span>Предпросмотр</span>
      </v-tooltip>
      <v-tooltip bottom v-if="isPreview">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="setPreview(false)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Редактировать</span>
      </v-tooltip>
      <v-divider vertical></v-divider>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="$auth.logout()" v-bind="attrs" v-on="on">
            <v-icon>mdi-exit-to-app</v-icon>
          </v-btn>
        </template>
        <span>Выйти из редактирования</span>
      </v-tooltip>
    </v-app-bar>

    <v-navigation-drawer app class="over" v-model="drawer" temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">/</v-list-item-title>
          <!--
          <v-list-item-subtitle>v 2.0</v-list-item-subtitle>
          -->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav dense>
        <!--
        <menu-item-settings />
        -->

        <menu-item-settings />

        <menu-item-seo />

        <v-subheader>Страницы</v-subheader>
        <menu-item-pages />
        <menu-item-add-page />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import MenuItemSeo from "~/components/admin/MenuItemSeo";
import MenuItemSettings from "~/components/admin/MenuItemSettings";
export default {
  components: {
    MenuItemSeo,
    MenuItemSettings
  },
  data: () => ({
    drawer: false
  }),
  computed: {
    ...mapGetters({
      changePage: "pages/change",
      saveLoadingPage: "pages/saveLoading",
      changeForm: "forms/change",
      saveLoadingForm: "forms/saveLoading",
      isPreview: "isPreview"
    }),
    change() {
      return this.changePage || this.changeForm;
    },
    saveLoading() {
      return this.saveLoadingPage || this.saveLoadingForm;
    }
  },
  methods: {
    ...mapMutations({
      setPreview: "SET_IS_PREVIEW"
    }),
    savePage() {
      if (this.changePage) {
        this.$store.dispatch("pages/savePage");
      }
      if (this.changeForm) {
        this.$store.dispatch("forms/saveForms");
      }
    }
  }
};
</script>

<style scoped>
.over {
  z-index: 10000;
}
</style>
