<template>
  <v-list-item link @click="dialog = true">
    <v-list-item-icon>
      <v-icon>mdi-plus</v-icon>
    </v-list-item-icon>
    <v-list-item-title>Добавить страницу</v-list-item-title>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Добавить страницу</span>
        </v-card-title>

        <v-form ref="form_add_page" @submit.prevent="submitAddPage">
          <v-card-text>
            <v-text-field
              label="URL страницы"
              prefix="/"
              v-model="newPage.slug"
              :error-messages="errorMessages"
            />
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="resetAddPage">
              Отмена
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              type="submit"
              :disabled="!formAddPageIsValid"
            >
              Добавить
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    newPage: {
      slug: ""
    }
  }),
  methods: {
    resetAddPage() {
      this.$refs.form_add_page.reset();
      this.dialog = false;
    },
    async submitAddPage() {
      const slug = "/" + this.newPage.slug.trim().replace("/", "");
      const data = await this.$axios.$post("/api/sites/pages", {
        site_id: this.site.id,
        slug: slug
      });
      console.log(data);
      this.resetAddPage();
      this.loadSite(this.site.id);
    },
    ...mapActions({
      loadSite: "sites/loadSite"
    })
  },
  computed: {
    ...mapGetters({
      site: "sites/site"
    }),
    formAddPageIsValid() {
      return (
        !this.errorMessages && this.newPage.slug && this.newPage.slug.trim()
      );
    },
    errorMessages() {
      let message =
        this.newPage.slug &&
        this.newPage.slug.trim() &&
        !!this.site.pages.find(p => p.slug === "/" + this.newPage.slug)
          ? "Такая страница уже есть"
          : null;
      if (!message && this.newPage.slug) {
        message =
          this.newPage.slug.indexOf("/") > -1 ? "Недопустимый символ /" : null;
      }
      return message;
    }
  }
};
</script>
