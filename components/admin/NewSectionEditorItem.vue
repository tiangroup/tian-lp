<template>
  <v-card class="mb-4">
    <v-card-title>
      <span>{{ section.name }}</span>
      <v-spacer></v-spacer>
      <v-btn fab x-small dark color="green" @click="add">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
  </v-card>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  props: {
    section: Object
  },
  methods: {
    ...mapMutations({
      addSection: "pages/ADD_SECTION"
    }),
    ...mapActions({
      savePage: "pages/savePage"
    }),
    add() {
      this.addSection({
        section: this.section.template
      });
      this.savePage();
    }
  }
};
</script>
