<template>
  <client-only>
    <div>
      <medium-editor
        :text="_text"
        :options="{
          ...editorOptions,
          editContent
        }"
        @edit="operation => applyItemTextEdit(operation)"
      />
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Исходный код</span>
          </v-card-title>

          <v-card-text>
            <v-textarea outlined v-model="source"></v-textarea>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Отмена
            </v-btn>
            <v-btn color="blue darken-1" text @click="sourceOk">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </client-only>
</template>

<script>
import { mapMutations } from "vuex";
import MediumButton from "medium-button";
export default {
  props: {
    text: String,
    editContent: {
      type: String,
      default: "text"
    },
    sectionId: String,
    field: String,
    items: {
      type: String,
      default: "items"
    },
    itemId: {
      type: String,
      default: null
    },
    object: {
      type: String,
      default: null
    }
  },
  data: () => ({
    _text: null,
    dialog: false,
    source: null
  }),
  computed: {
    editorOptions() {
      const _this = this;
      let options = {
        placeholder: {
          text: "Введите текст",
          hideOnClick: true
        },
        toolbar: false,
        imageDragging: false
      };
      if (this.editContent == "html") {
        options = {
          placeholder: {
            text: "Введите текст",
            hideOnClick: true
          },
          toolbar: {
            buttons: [
              "bold",
              "italic",
              "underline",
              "h2",
              "h3",
              {
                name: "anchor",
                aria: "ссылка"
              },
              {
                name: "orderedlist",
                aria: "нумерованный срисок"
              },
              {
                name: "unorderedlist",
                aria: "ненумерованный срисок"
              },
              {
                name: "html",
                aria: "преобразовать в html"
              },
              {
                name: "removeFormat",
                aria: "убрать форматирование"
              },
              "source"
            ]
          },
          extensions: {
            source: new MediumButton({
              label: "&lt;/&gt;",
              action: function(html, mark, parent) {
                _this.source = JSON.parse(JSON.stringify(_this._text));
                _this.dialog = true;
                // const promise = new Promise(function(resolve, reject) {
                //   let timerId = setTimeout(function tick() {
                //     if (_this.dialog) {
                //       timerId = setTimeout(tick, 2000);
                //     } else {
                //       resolve(_this.source);
                //     }
                //   }, 2000);
                // });
                // let result = await promise;
                // console.log(result);
                return html;
              }
            })
          },
          anchor: {
            placeholderText: "Вставьте ссылку",
            targetCheckbox: true,
            targetCheckboxText: "открывать ссылку в новом окне"
          }
        };
      }
      return options;
    }
  },
  methods: {
    ...mapMutations({
      setSectionField: "pages/SET_SECTION_FIELD",
      setItemField: "pages/SET_ITEM_FIELD",
      setObjectField: "pages/SET_OBJECT_FIELD"
    }),
    applyItemTextEdit(operation) {
      let text = operation.api.origElements.textContent;
      if (operation.api.options.editContent == "html") {
        text = operation.api.origElements.innerHTML;
      }

      this._text = text;

      const payload = {
        text: text,
        field: this.field,
        items: this.items,
        itemId: this.itemId,
        sectionId: this.sectionId,
        object: this.object
      };

      this.$emit("onEdit", payload);

      if (this.object) {
        this.setObjectField({
          sectionId: this.sectionId,
          objectField: this.object,
          field: this.field,
          value: text
        });
      } else if (this.itemId) {
        this.setItemField({
          sectionId: this.sectionId,
          itemId: this.itemId,
          items: this.items,
          field: this.field,
          value: text
        });
      } else {
        this.setSectionField({
          id: this.sectionId,
          field: this.field,
          value: text
        });
      }
    },
    sourceOk() {
      this._text = this.source;
      this.dialog = false;
    }
  },
  created() {
    this._text = JSON.parse(JSON.stringify(this.text));
  }
};
</script>
