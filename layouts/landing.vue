<template>
  <div id="lp" :style="colorStyle">
    <v-app v-if="$auth.loggedIn">
      <appbar />
      <v-main>
        <nuxt />
      </v-main>
    </v-app>
    <v-app v-else>
      <v-main>
        <Login v-if="isApp"></Login>
        <nuxt v-else />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "/assets/css/style.css"
      }
    ]
  },
  computed: {
    ...mapGetters({
      isApp: "isApp",
      settings: "sites/settings"
    }),
    colorStyle() {
      return this.settings.color
        ? {
            "--hue": this.settings.color.h ? this.settings.color.h : null,
            "--saturation": this.settings.color.s
              ? Math.floor(this.settings.color.s * 100) + "%"
              : null,
            "--lightness": this.settings.color.l
              ? Math.floor(this.settings.color.l * 100) + "%"
              : null
          }
        : null;
    }
  }
};
</script>
