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
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  props: {
    section: Object,
    sectionId: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      site: "sites/site",
      page: "pages/page"
    })
  },
  methods: {
    ...mapMutations({
      addSection: "pages/ADD_SECTION"
    }),
    ...mapActions({
      savePage: "pages/savePage",
      addForm: "forms/addForm",
      loadForm: "forms/loadForm"
    }),
    async add() {
      this.addSection({
        sectionId: this.sectionId,
        section: this.section.template
      });
      this.$emit("onAdd");
      this.$overlay(true);
      await this.savePage();
      // создание форм
      if (this.section.forms && this.section.forms.length) {
        let section;
        if (this.sectionId) {
          const top_section = this.page.sections.find(
            s => s.id === this.sectionId
          );
          const index = this.page.sections.indexOf(top_section);
          if (index > -1) {
            section = this.page.sections[index + 1];
          }
        } else {
          section = this.page.sections[0];
        }
        if (section) {
          for (let form of this.section.forms) {
            await this.addForm({
              template: form.template,
              siteId: this.site.id,
              sectionId: section.id,
              field: form.name
            });
            await this.loadForm(section[form.name]);
          }
          await this.savePage();
        }
      }
      this.$overlay(false);
    }
  }
};
</script>
