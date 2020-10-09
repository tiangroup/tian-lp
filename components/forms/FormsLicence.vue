<template>
  <div class="over">
    <v-dialog
      v-model="show"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Условия лицензионного соглашения</span>
          <v-spacer></v-spacer>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" v-show="isChange">
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
            </template>
            <span>Сохранить изменения</span>
          </v-tooltip>

          <v-btn icon @click="$forms.licence(false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <editor-ext v-model="editText" editContent="html" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    text: undefined
  }),
  computed: {
    ...mapGetters({
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
        //console.log(value);
        //this.setLicence(value);
        this.text = value;
      }
    }
  },
  methods: {
    ...mapMutations({
      setLicence: "sites/SET_LICENCE"
    })
  }
};
</script>

<style scoped>
.over {
  z-index: 100007;
}
</style>
