<template>
  <div id="lp">
    <v-app v-if="$auth.loggedIn">
      <appbar />
      <v-main>
        <nuxt />
      </v-main>
    </v-app>
    <nuxt v-else />
  </div>
</template>

<script>
import Appbar from "~/components/admin/Appbar";
export default {
  components: {
    Appbar
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://sharp-bartik-8c8c21.netlify.app/assets/css/style.css"
      }
    ]
  }
};
</script>
