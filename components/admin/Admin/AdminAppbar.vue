<template>
  <div>
    <v-app-bar app color="blue" dark clipped-left>
      <v-toolbar-title>
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          v-if="!drawer"
        ></v-app-bar-nav-icon>

        <span>Панель управления</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="exit" v-bind="attrs" v-on="on">
            <v-icon>mdi-exit-to-app</v-icon>
          </v-btn>
        </template>
        <span>Выйти из панели управления</span>
      </v-tooltip>
    </v-app-bar>

    <v-navigation-drawer app class="over" v-model="drawer" clipped>
      <v-list nav dense>
        <v-list-item
          selectable
          @click="
            $emit('action', { comp: 'AdminSite', params: { forms: forms } })
          "
        >
          <v-list-item-icon>
            <v-icon v-if="overdate">mdi-web-clock</v-icon>
            <v-icon v-else>mdi-web</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Сайт</v-list-item-title>
        </v-list-item>

        <v-list-group
          prepend-icon="mdi-text-box-multiple"
          no-action
          v-if="isForms"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Формы</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            selectable
            v-for="item in forms"
            :key="item.id"
            @click="$emit('action', item.action)"
          >
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-item selectable @click="$router.push('/')">
          <v-list-item-icon>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Редактировать сайт</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  fetchOnServer: false,
  data: () => ({
    drawer: null,
    forms: null
  }),
  async fetch() {
    const forms = await this.$axios.$get(`${this.$site_app}/forms`);
    this.forms = forms.map(item => ({
      id: item.id,
      title: item.form.title,
      action: {
        comp: "AdminForm",
        params: item
      }
    }));
    this.reloadSite();
  },
  computed: {
    ...mapGetters({
      isApp: "isApp",
      site: "sites/site"
    }),
    isForms() {
      return this.forms && this.forms.length;
    },
    overdate() {
      if (this.site.deploy && this.site.deploy.publish && this.site.updates) {
        return this.site.updates > this.site.deploy.publish;
      } else if (this.site.deploy && !this.site.deploy.publish) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions({
      reloadSite: "sites/reloadSite"
    }),
    exit() {
      this.$auth.logout();
    }
  }
};
</script>
