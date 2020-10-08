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
          <v-textarea outlined v-model="robots"></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">
            Отмена
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="!isSave"
            :loading="process"
            @click="save"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    process: false,
    content: undefined
  }),
  computed: {
    ...mapGetters({
      site: "sites/site"
    }),
    robots: {
      get() {
        return this.content == undefined ? this.site.robots : this.content;
      },
      set(value) {
        this.content = value === this.site.robots ? undefined : value;
      }
    },
    isSave() {
      return this.content != undefined;
    }
  },
  methods: {
    ...mapActions({
      reloadSite: "sites/reloadSite",
      saveSite: "sites/saveSite"
    }),
    ...mapMutations({
      setUpdates: "sites/SET_UPDATES",
      setRobots: "sites/SET_ROBOTS"
    }),
    async save() {
      this.process = true;
      this.setRobots(this.content);
      this.setUpdates();
      await this.saveSite();
      this.process = false;
      this.dialog = false;
      this.content = undefined;
    },
    cancel() {
      this.dialog = false;
      this.content = undefined;
    },
    async openForm() {
      this.dialog = true;
    }
  }
};
</script>
