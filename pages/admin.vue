<template>
  <div>
    <v-app v-if="isAdmin">
      <admin-appbar @action="action" />
      <v-main>
        <component :is="comp" :params="params" />
      </v-main>
      <dialog-error />
    </v-app>
    <Login v-else />
  </div>
</template>

<script>
import AdminForm from "~/components/admin/Admin/form/AdminForm";
import AdminSite from "~/components/admin/Admin/site/AdminSite";
export default {
  layout: "admin",
  components: {
    Admin,
    AdminForm,
    AdminSite
  },
  head: () => ({
    title: "Панель управления"
  }),
  data: () => ({
    comp: "AdminSite",
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
