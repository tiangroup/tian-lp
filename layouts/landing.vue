<template>
  <div id="lp" :style="colorStyle" :class="lpClass">
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
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "/assets/css/style.css"
        },
        {
          rel: "icon",
          type: "image/x-icon",
          href: this.site.favicon
            ? this.$site_img(this.site.favicon)
            : "/favicon.ico"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      isApp: "isApp",
      settings: "sites/settings",
      site: "sites/site"
    }),
    colorStyle() {
      return this.settings.color
        ? {
            "--hue":
              this.settings.color.h >= 0 ? `${this.settings.color.h}` : null,
            "--saturation":
              this.settings.color.s >= 0
                ? Math.floor(this.settings.color.s * 100) + "%"
                : null,
            "--lightness":
              this.settings.color.l >= 0
                ? Math.floor(this.settings.color.l * 100) + "%"
                : null
          }
        : null;
    },
    lpClass() {
      return {
        "buttons--style2": this.settings.buttons == "rect"
      };
    }
  }
};
</script>
