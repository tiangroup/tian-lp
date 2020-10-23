<template>
  <div>
    <div v-if="isPreview">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="over btn-edit"
            fixed
            top
            right
            fab
            dark
            medium
            color="blue"
            v-bind="attrs"
            v-on="on"
            @click="setPreview(false)"
            :disabled="reloading"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Редактировать</span>
      </v-tooltip>
    </div>
    <v-app-bar app color="blue" dark class="over" v-else>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Редактирование</v-toolbar-title>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            class="ml-2"
            :loading="reloading"
            @click="undo"
            :disabled="saveLoading"
            v-show="change"
          >
            <v-icon>mdi-undo</v-icon>
          </v-btn>
        </template>
        <span>Отменить изменения</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            class="ml-2"
            :loading="saveLoading"
            :disabled="reloading"
            @click="save"
            v-show="change"
          >
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </template>
        <span>Сохранить изменения</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            class="ml-2"
            :loading="processPublish"
            @click="publish"
            v-show="isPublish && !change"
          >
            <v-icon>mdi-cloud-upload</v-icon>
          </v-btn>
        </template>
        <span>Опубликовать</span>
      </v-tooltip>

      <!--
      <v-btn
        text
        class="ml-2"
        @click="publish"
        :loading="processPublish"
        v-if="isPublish && !change"
      >
        Опубликовать
        <v-icon right>mdi-cloud-upload</v-icon>
      </v-btn>
      -->

      <v-spacer></v-spacer>

      <!--
      <v-tooltip bottom v-if="isPublish">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
            @click="setPreview(true)"
          >
            Опубликовать
            <v-icon right>mdi-cloud-upload</v-icon>
          </v-btn>
        </template>
        <span>Опубликовать</span>
      </v-tooltip>
      -->
      <v-tooltip bottom v-if="!isPreview">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            @click="setPreview(true)"
            :disabled="reloading"
          >
            <v-icon>mdi-monitor-eye</v-icon>
          </v-btn>
        </template>
        <span>Предпросмотр</span>
      </v-tooltip>
      <v-tooltip bottom v-if="isPreview">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            @click="setPreview(false)"
            :disabled="reloading"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Редактировать</span>
      </v-tooltip>
      <v-divider vertical inset class="ml-4"></v-divider>
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
        <span>Страница</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="drawer = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-list-item>

      <!--
      <v-list-item>
        <v-list-item-title>{{ slug }}</v-list-item-title>

        <v-list-item-title>{{ slug }}</v-list-item-title>

        <v-list-item-subtitle v-text="slug"></v-list-item-subtitle>

      </v-list-item>
      -->

      <!--
      <v-divider></v-divider>
      -->

      <v-list nav dense>
        <v-subheader>{{ slug }}</v-subheader>
        <menu-item-seo />
        <menu-item-page-settings />

        <!--
        <v-subheader>Страницы</v-subheader>
        <menu-item-pages />
        <menu-item-add-page />
        -->

        <v-subheader>Сайт</v-subheader>

        <!--
        <v-list-item link @click="publish" v-if="isPublish && !change">
          <v-list-item-icon>
            <v-icon>mdi-cloud-upload</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Опубликовать</v-list-item-title>
        </v-list-item>
        -->

        <v-list-group prepend-icon="mdi-text-box-multiple" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Страницы</v-list-item-title>
            </v-list-item-content>
          </template>
          <menu-item-pages @routes="onRoutes" />
          <menu-item-add-page />
        </v-list-group>

        <menu-item-metrika />

        <menu-item-counter />

        <menu-item-sitemap />

        <menu-item-robots />

        <menu-item-settings />

        <v-subheader>Администрирование</v-subheader>
        <v-list-item link @click="$router.push('/admin')">
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Панель управления</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data: () => ({
    drawer: false,
    processPublish: false
  }),
  computed: {
    ...mapGetters({
      changePage: "pages/change",
      saveLoadingPage: "pages/saveLoading",
      changeForm: "forms/change",
      saveLoadingForm: "forms/saveLoading",
      saveLoadingSite: "sites/saveLoading",
      isPreview: "isPreview",
      page: "pages/page",
      site: "sites/site",
      changeSite: "sites/change",
      reloadingPage: "pages/reloading",
      reloadingForms: "forms/reloading"
    }),
    change() {
      return this.changePage || this.changeForm || this.changeSite;
    },
    saveLoading() {
      return (
        this.saveLoadingPage || this.saveLoadingForm || this.saveLoadingSite
      );
    },
    reloading() {
      return this.reloadingPage || this.reloadingForms;
    },
    slug() {
      const page = this.site.pages.find(p => p.page == this.page.id);
      return page ? page.slug : null;
    },
    isPublish() {
      return (
        this.site.deploy &&
        this.site.deploy.sites &&
        this.site.deploy.sites.active &&
        this.site.updates &&
        this.site.updates > this.site.deploy.publish
      );
    }
  },
  methods: {
    ...mapActions({
      savePage: "pages/savePage",
      saveForms: "forms/saveForms",
      saveSite: "sites/saveSite",
      reloadPage: "pages/reloadPage",
      reloadSite: "sites/reloadSite",
      reloadForms: "forms/reloadForms"
    }),
    ...mapMutations({
      setPreview: "SET_IS_PREVIEW"
    }),
    save() {
      if (this.changePage) {
        this.savePage();
      }
      if (this.changeForm) {
        this.saveForms();
      }
      if (this.changeSite) {
        this.saveSite();
      }
    },
    async undo() {
      if (this.changePage) {
        this.setPreview(true);
        await this.reloadPage();
        this.setPreview(false);
      }
      if (this.changeForm) {
        await this.reloadForms();
      }
      if (this.changeSite) {
        await this.reloadSite();
      }
    },
    onRoutes() {
      this.drawer = false;
    },
    async publish() {
      this.processPublish = true;
      try {
        const data = await this.$axios.$post(
          `${this.$site_app}/api/sites/publish`,
          {
            site_id: this.site.id
          }
        );
        if (data.status) {
          //await this.reloadPage();
          await this.reloadSite();
        }
      } catch (error) {
        console.error(error);
        this.$error({
          message:
            "Произошла непредвиденная ошибка, попробуйте повторить позже."
        });
      }
      this.processPublish = false;
    }
  }
};
</script>

<style scoped>
.over {
  z-index: 120;
}
.btn-edit {
  top: 16px !important;
}
</style>
