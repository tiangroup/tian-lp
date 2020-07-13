<template>
  <div>
    <v-dialog v-model="dialog" max-width="320" persistent>
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
              v-model="itemSvgEdit.value"
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
  </div>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    itemSvgEdit: {}
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      this.$emit("save", this.itemSvgEdit);
    }
  }
};
</script>
