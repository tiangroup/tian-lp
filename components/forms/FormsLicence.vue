<template>
  <div class="over">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>
          <!--
          <span class="headline">Условия лицензионного соглашения</span>
          -->
          <v-spacer></v-spacer>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                v-show="isChange"
                v-if="isEdit"
                @click="save"
                :loading="processSave"
              >
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
            </template>
            <span>Сохранить изменения</span>
          </v-tooltip>

          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div v-if="isEdit">
            <editor-ext v-model="editText" editContent="html" />
          </div>
          <div v-else v-html="editText"></div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data: () => ({
    text: undefined,
    processSave: false
  }),
  computed: {
    ...mapGetters({
      isEdit: "isEdit",
      show: "forms/licence",
      site: "sites/site"
    }),
    isChange() {
      return this.text != undefined;
    },
    editText: {
      get() {
        return this.site.licence || "";
      },
      set(value) {
        this.text = value;
      }
    },
    dialog: {
      get() {
        return this.show;
      },
      set(value) {
        this.$forms.licence(value);
      }
    }
  },
  methods: {
    ...mapMutations({
      setLicence: "sites/SET_LICENCE"
    }),
    ...mapActions({
      saveSite: "sites/saveSite"
    }),
    async save() {
      this.processSave = true;
      this.setLicence(this.text);
      await this.saveSite();
      this.text = undefined;
      this.processSave = false;
    }
  }
};
</script>

<style scoped>
.over {
  z-index: 100007;
}
</style>
