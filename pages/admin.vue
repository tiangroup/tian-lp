<template>
  <div>
    <v-app v-if="isAdmin">
      <appbar-admin @select="select" />
      <v-main>
        <admin />
      </v-main>
    </v-app>
    <Login v-else />
  </div>
</template>

<script>
export default {
  layout: "admin",
  computed: {
    isAdmin() {
      return this.$auth.loggedIn;
    }
  },
  methods: {
    select(name) {}
  }
};
</script>
