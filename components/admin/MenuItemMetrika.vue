<template>
  <v-list-item link @click="openForm">
    <v-list-item-icon>
      <v-icon>mdi-chart-bar</v-icon>
    </v-list-item-icon>
    <v-list-item-title>Метрика</v-list-item-title>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Метрика</span>
        </v-card-title>

        <v-card-text>
          <v-text-field label="Идентификатор Яндекс.Метрика" v-model="ym" />
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
    ym: {
      get() {
        return this.content == undefined ? this.site.ym : this.content;
      },
      set(value) {
        this.content = value === this.site.ym ? undefined : value;
      }
    },
    isSave() {
      return this.content != undefined;
    }
  },
  methods: {
    ...mapActions({
      saveSite: "sites/saveSite"
    }),
    ...mapMutations({
      setUpdates: "sites/SET_UPDATES",
      setYm: "sites/SET_YM"
    }),
    async save() {
      this.process = true;
      this.setYm(this.content);
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
