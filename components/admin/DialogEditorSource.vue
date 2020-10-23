<template>
  <div>
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-title>
          <span class="headline">Исходный код</span>
        </v-card-title>

        <v-card-text>
          <v-textarea outlined v-model="source" rows="10"></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Отмена
          </v-btn>
          <v-btn color="blue darken-1" text @click="onOk">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    html: undefined
  }),
  computed: {
    ...mapGetters({
      dialogEditorSource: "dialogEditorSource",
      editorSource: "editorSource"
    }),
    dialog: {
      get: function() {
        return this.dialogEditorSource;
      },
      set: function(value) {
        if (!value) {
          this.hideEditorSource();
        }
      }
    },
    source: {
      get: function() {
        return this.editorSource.html;
      },
      set: function(value) {
        this.html = value;
      }
    }
  },
  methods: {
    ...mapActions({
      hideEditorSource: "hideEditorSource"
    }),
    onOk() {
      if (this.editorSource.callback) {
        this.editorSource.callback(
          this.html === undefined ? this.editorSource.html : this.html
        );
      }
      this.dialog = false;
    }
  }
};
</script>
