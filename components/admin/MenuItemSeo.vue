<template>
  <v-list-item link @click="openForm">
    <v-list-item-icon>
      <v-icon>mdi-search-web</v-icon>
    </v-list-item-icon>
    <v-list-item-title>SEO</v-list-item-title>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">SEO</span>
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="Заголовок страницы (title)"
            v-model="headObj.title"
          />
          <v-text-field label="keywords" v-model="headObj.keywords" />
          <v-text-field label="description" v-model="headObj.description" />
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
    headObj: {}
  }),
  computed: {
    ...mapGetters({
      head: "pages/head"
    })
  },
  methods: {
    ...mapMutations({
      setHead: "pages/SET_HEAD"
    }),
    save: function() {
      this.setHead({
        title: this.headObj.title,
        keywords: this.headObj.keywords,
        description: this.headObj.description
      });
      this.$store.dispatch("pages/savePage");
      this.dialog = false;
    },
    cancel: function() {
      this.dialog = false;
    },
    openForm() {
      this.headObj = Object.assign({}, this.head);
      this.dialog = true;
    }
  }
};
</script>
