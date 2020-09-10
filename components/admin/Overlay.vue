<template>
  <v-overlay :value="overlay" z-index="10000">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      overlay: "overlay"
    })
  }
};
</script>
