<template>
<div>
  <v-app-bar app color="blue" dark clipped-left>
    <v-toolbar-title>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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
      <!--
      <v-list-item link @click="$emit('action', 'AdminForms')">
        <v-list-item-icon>
          <v-icon>mdi-text-box-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Формы</v-list-item-title>
      </v-list-item>
      -->
      <v-list-group prepend-icon="mdi-text-box-multiple" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Формы</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item selectable v-for="item in forms" :key="item.id" @click="$emit('action', item.action)">
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</div>
</template>

<script>
import {
  mapGetters
} from "vuex";

export default {
  fetchOnServer: false,
  data: () => ({
    drawer: true,
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
  },
  computed: {
    ...mapGetters({
      isApp: "isApp"
    })
  },
  methods: {
    exit() {
      if (!this.isApp) {
        this.$auth.logout();
      }
      this.$router.push("/");
    }
  }
};
</script>
