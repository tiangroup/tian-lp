<template>
  <div>
    <v-list-item link v-for="page in pages" :key="page.id">
      <v-list-item-icon>
        <v-icon>mdi-application</v-icon>
      </v-list-item-icon>
      <v-list-item-title>{{ page.slug }}</v-list-item-title>
    </v-list-item>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      pages: "sites/pages"
    })
  }
};
</script>
