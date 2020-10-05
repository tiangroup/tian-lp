<template>
  <v-list-item link @click="openForm" :disabled="slug == '/'">
    <v-list-item-icon>
      <v-icon>mdi-application</v-icon>
    </v-list-item-icon>
    <v-list-item-title>Настройки страницы</v-list-item-title>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Настройки страницы</span>
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="URL страницы"
            prefix="/"
            v-model="settings.slug"
            :error-messages="errorMessages"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn text small color="error" @click="deleteDialog = true">
            Удалить
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">
            Отмена
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save"
            :disabled="!formIsValid"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Удалить страницу</span>
        </v-card-title>
        <v-card-text>
          Вы действительно хотите удалить данную страницу?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteDialog = false">
            Отмена
          </v-btn>
          <v-btn color="blue darken-1" text @click="deletePage">
            Удалить
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
    deleteDialog: false,
    settings: {
      slug: ""
    }
  }),
  methods: {
    ...mapActions({
      loadSite: "sites/loadSite"
    }),
    openForm() {
      this.settings.slug = this.slug ? this.slug.replace("/", "") : null;
      this.dialog = true;
    },
    cancel() {
      this.dialog = false;
    },
    async save() {
      const slug = "/" + this.settings.slug.trim().replace("/", "");
      const page = this.site.pages.find(p => p.page == this.page.id);
      const data = await this.$axios.$put("/api/sites/pages", {
        site_id: this.site.id,
        page_id: page.id,
        slug: slug
      });
      await this.loadSite(this.site.id);
      this.$router.push(slug);
    },
    async deletePage() {
      this.deleteDialog = false;
      this.dialog = false;
      this.$overlay(true);
      const page = this.site.pages.find(p => p.page == this.page.id);
      const data = await this.$axios.$put("/api/sites/pages/delete", {
        site_id: this.site.id,
        page_id: page.id
      });
      await this.loadSite(this.site.id);
      this.$overlay(false);
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters({
      site: "sites/site",
      page: "pages/page"
    }),
    slug() {
      const page = this.site.pages.find(p => p.page == this.page.id);
      return page ? page.slug : null;
    },
    errorMessages() {
      const slug = this.settings.slug;
      let message =
        slug &&
        slug.trim() &&
        "/" + slug.trim() != this.slug &&
        !!this.site.pages.find(p => p.slug === "/" + slug.trim())
          ? "Такая страница уже есть"
          : null;
      if (!message && slug) {
        message = slug.indexOf("/") > -1 ? "Недопустимый символ /" : null;
      }
      return message;
    },
    formIsValid() {
      return (
        !this.errorMessages &&
        this.settings.slug &&
        this.settings.slug.trim() &&
        "/" + this.settings.slug.trim() != this.slug
      );
    }
  }
};
</script>
