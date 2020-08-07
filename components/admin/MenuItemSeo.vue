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
          <v-row>
            <v-col>
              <v-text-field
                label="Заголовок страницы (title)"
                v-model="headObj.title"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-card-subtitle class="text-subtitle-1">
              Мета теги
            </v-card-subtitle>
          </v-row>
          <v-row>
            <v-col cols="6" sm="4">
              <v-text-field label="name" />
            </v-col>
            <v-col cols="18" sm="8">
              <v-text-field label="content" />
            </v-col>
          </v-row>
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
