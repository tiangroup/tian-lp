<template>
  <div>
    <v-app-bar app color="blue" dark clipped-left>
      <v-toolbar-title>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span>Админ панель</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="exit" v-bind="attrs" v-on="on">
            <v-icon>mdi-exit-to-app</v-icon>
          </v-btn>
        </template>
        <span>Выйти из админ панели</span>
      </v-tooltip>
    </v-app-bar>

    <v-navigation-drawer app class="over" v-model="drawer" clipped>
      <v-list nav dense>
        <v-list-item link @click="$emit('select', 'AdminForms')">
          <v-list-item-icon>
            <v-icon>mdi-web</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Формы</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    drawer: null
  }),
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
