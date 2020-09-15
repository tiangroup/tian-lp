<template>
  <div>
    <v-app v-if="isAdmin">
      <admin-appbar @action="action" />
      <v-main>
        <component :is="comp" :params="params" />
      </v-main>
    </v-app>
    <Login v-else />
  </div>
</template>

<script>
import Admin from "~/components/admin/Admin/Admin";
import AdminForm from "~/components/admin/Admin/AdminForm";
export default {
  layout: "admin",
  components: {
    Admin,
    AdminForm
  },
  head: () => ({
    title: "Панель управления"
  }),
  data: () => ({
    comp: "Admin",
    params: {}
  }),
  computed: {
    isAdmin() {
      return this.$auth.loggedIn;
    }
  },
  methods: {
    action(payload) {
      this.params = payload.params;
      this.comp = payload.comp;
    }
  }
};
</script>
