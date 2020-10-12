<template>
  <v-card class="mb-4">
    <v-card-title>
      <span>{{ section.name }}</span>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            fab
            x-small
            dark
            color="green"
            @click="add"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Добавить на страницу</span>
      </v-tooltip>
    </v-card-title>
    <v-card-text>
      <img v-if="section.preview" :src="`${$site_api}${section.preview.url}`" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  props: {
    section: Object,
    sectionId: {
      type: String,
      default: null
    }
  },
  methods: {
    ...mapMutations({
      addSection: "pages/ADD_SECTION"
    }),
    ...mapActions({
      savePage: "pages/savePage"
    }),
    async add() {
      this.addSection({
        sectionId: this.sectionId,
        section: this.section.template
      });
      this.$emit("onAdd");
      this.$overlay(true);
      await this.savePage();
      this.$overlay(false);
    }
  }
};
</script>
