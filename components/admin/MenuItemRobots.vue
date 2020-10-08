<template>
  <v-list-item link @click="openForm">
    <v-list-item-icon>
      <v-icon>mdi-robot</v-icon>
    </v-list-item-icon>
    <v-list-item-title>robots.txt</v-list-item-title>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">robots.txt</span>
        </v-card-title>

        <v-card-text>
          <v-textarea outlined v-model="content"></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">
            Отмена
          </v-btn>
          <v-btn color="blue darken-1" text @click="save">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    content: ""
  }),
  computed: {
    ...mapGetters({
      site: "sites/site"
    })
  },
  methods: {
    ...mapActions({
      reloadSite: "sites/reloadSite"
    }),
    async save() {
      this.$overlay(true);
      try {
        await this.$axios.$post(`${this.$site_app}/api/robots`, {
          content: this.content
        });
        await this.$axios.$put(`${this.$site_app}/api/sites/updates`, {
          site_id: this.site.id
        });
        this.reloadSite();
        this.$overlay(false);
        this.dialog = false;
      } catch (error) {
        this.$overlay(false);
        this.$error(error);
      }
    },
    cancel() {
      this.dialog = false;
    },
    async openForm() {
      this.$overlay(true);
      try {
        this.content = await this.$axios.$get(`${this.$site_app}/api/robots`);
        this.$overlay(false);
        this.dialog = true;
      } catch (error) {
        this.$overlay(false);
        this.$error(error);
      }
    }
  }
};
</script>
