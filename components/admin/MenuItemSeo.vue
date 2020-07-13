<template>
  <v-list-item link @click="dialog = true">
    <v-list-item-icon>
      <v-icon>mdi-web</v-icon>
    </v-list-item-icon>
    <v-list-item-title>SEO</v-list-item-title>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">SEO</span>
        </v-card-title>

        <v-card-text>
          <v-text-field label="Заголовок страницы (title)" v-model="title" />
          <v-text-field label="keywords" v-model="keywords" />
          <v-text-field label="description" v-model="description" />
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
import { mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    dialog: false,
    _title: null,
    _keywords: null,
    _description: null
  }),
  computed: {
    ...mapGetters({
      head: "pages/head"
    }),
    title: {
      get: function() {
        return this.head.title;
      },
      set: function(value) {
        this._title = value;
      }
    },
    keywords: {
      get: function() {
        return this.head.keywords;
      },
      set: function(value) {
        this._keywords = value;
      }
    },
    description: {
      get: function() {
        return this.head.description;
      },
      set: function(value) {}
    }
  },
  methods: {
    ...mapMutations({
      setHead: "pages/SET_HEAD"
    }),
    save: function() {
      this.setHead({
        title: this._title,
        keywords: this._keywords,
        description: this._description
      });
      this.$store.dispatch("pages/savePage");
      this.dialog = false;
    },
    cancel: function() {
      this.dialog = false;
    }
  }
};
</script>
