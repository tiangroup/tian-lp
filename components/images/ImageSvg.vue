<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title>
        <span class="headline">Вставить svg картинку</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-textarea
            outlined
            name="svg"
            label="SVG код"
            v-model="svgValue"
          ></v-textarea>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey" class="white--text" @click="save">
          Сохранить
        </v-btn>
        <v-btn color="green darken-1" text @click="close">
          Отмена
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data: () => ({
    svg: null
  }),
  computed: {
    ...mapGetters({
      dialogImageSvg: "dialogImageSvg",
      imageSvg: "imageSvg"
    }),
    dialog: {
      get: function() {
        return this.dialogImageSvg;
      },
      set: function(value) {
        if (!value) {
          this.hideImageSvg();
        }
      }
    },
    svgValue: {
      get() {
        return !this.dialogImageSvg ? null : this.imageSvg.value;
      },
      set(value) {
        this.svg = value;
      }
    }
  },
  methods: {
    ...mapActions({
      hideImageSvg: "hideImageSvg"
    }),
    ...mapMutations({
      setItemField: "pages/SET_ITEM_FIELD"
    }),
    close() {
      this.hideImageSvg();
    },
    save() {
      // if (this.imageSvg.callback) {
      //   this.imageSvg.callback(this.svg || this.imageSvg.value);
      // }
      this.setItemField({
        sectionId: this.imageSvg.sectionId,
        itemId: this.imageSvg.itemId,
        items: this.imageSvg.items,
        field: this.imageSvg.field,
        value: this.svg === null ? this.imageSvg.value : this.svg
      });
      this.hideImageSvg();
    }
  },
  watch: {
    dialogImageSvg(value) {
      if (!value) {
        this.svg = null;
      }
    }
  }
};
</script>
