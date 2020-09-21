<template>
  <div id="lp">
    <v-app v-if="$auth.loggedIn">
      <appbar />
      <v-main>
        <nuxt />
      </v-main>
    </v-app>
    <v-app v-else>
      <v-main>
        <nuxt />
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "/assets/css/style.css"
      }
    ]
  }
};
</script>
