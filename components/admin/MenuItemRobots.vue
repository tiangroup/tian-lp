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
          <v-textarea outlined></v-textarea>
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
    robots: ""
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
      this.dialog = false;
    },
    cancel: function() {
      this.dialog = false;
    },
    openForm() {
      this.dialog = true;
    }
  }
};
</script>
