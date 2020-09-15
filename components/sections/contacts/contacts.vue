<template>
  <div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            x-small
            color="blue"
            v-bind="attrs"
            v-on="on"
            @click="updateMapKey"
          >
            <v-icon>mdi-key-variant</v-icon>
          </v-btn>
        </template>
        <span>Указать ключ от Яндекс-карты</span>
      </v-tooltip>
    </buttons-section>

    <component
      class="contacts bg-secondary"
      :class="{ mDark: section.settings.background === 'dark' }"
      :is="view"
      :section="section"
      :isEdit="isEdit"
    />

    <v-dialog v-model="dialogMapKey" max-width="33rem" v-if="isEdit">
      <v-card>
        <v-card-title class="mb-10">
          Api-ключ от Яндекс.карт
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogMapKey = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Ключ" outlined v-model="userKey"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="gray" text @click="dialogMapKey = false"
            >Отменить</v-btn
          >
          <v-btn depressed color="green" dark @click="saveMapKey(userKey)"
            >Сохранить</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import View1 from "./ContactsView1";
import View2 from "./ContactsView2";
import View3 from "./ContactsView3";
export default {
  props: {
    section: Object
  },
  components: {
    View1,
    View2,
    View3
  },
  data() {
    return {
      dialogMapKey: false,
      userKey: ""
    };
  },
  computed: {
    ...mapGetters({
      isEdit: "isEdit"
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    view() {
      return "view2";
      //return this.section.settings.view;
    }
  },
  methods: {
    ...mapMutations({
      setSectionField: "pages/SET_SECTION_FIELD"
    }),
    updateMapKey() {
      this.userKey = this.section.map_key || "";
      this.dialogMapKey = true;
    },
    saveMapKey(key) {
      this.setSectionField({
        id: this.section.id,
        field: "map_key",
        value: key
      });
      this.$store.dispatch("pages/savePage");
      this.dialogMapKey = false;
    }
  }
};
</script>
<style>
.contacts a {
  color: var(--theme-color);
}
</style>
