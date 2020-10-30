<template>
  <client-only>
    <medium-editor
      :text="_text"
      :options="{
        ...editorOptions,
        editContent
      }"
      @edit="operation => applyItemTextEdit(operation)"
      v-if="active"
    />
  </client-only>
</template>

<script>
import { mapMutations } from "vuex";
import MediumButton from "medium-button";
export default {
  props: {
    value: {
      type: String,
      default: undefined
    },
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
    },
    upload: false
  },
  data: () => ({
    _text: null,
    active: true
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
              "h2",
              "h3",
              "h4",
              {
                name: "anchor",
                aria: "ссылка"
              },
              {
                name: "image",
                aria: "преобразовать в картинку"
              },
              {
                name: "orderedlist",
                aria: "нумерованный список"
              },
              {
                name: "unorderedlist",
                aria: "ненумерованный список"
              },
              {
                name: "html",
                aria: "преобразовать в html"
              },
              {
                name: "removeFormat",
                aria: "убрать форматирование"
              },
              "source",
              this.sectionId && this.upload ? "upload" : ""
            ]
          },
          extensions: {
            source: new MediumButton({
              label: "&lt;/&gt;",
              action: function(html, mark, parent) {
                _this.$editorSource({
                  html: _this._text,
                  callback: _this.callbackEditorSource
                });
                return html;
              }
            }),
            upload: new MediumButton({
              label: "upload",
              action: function(html, mark, parent) {
                _this.$editorUpload({
                  sectionId: _this.sectionId
                });
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
        text = this.clearImage(text);
      }

      if (this.value !== undefined) {
        this.$emit("input", text);
      } else {
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
      }
    },
    callbackEditorSource(source) {
      this.active = false;
      this._text = JSON.parse(JSON.stringify(source));
      this.active = true;
    },
    clearImage(text) {
      const reg = `(src=["'])${this.$site_app}`;
      const regexp = new RegExp(reg, "ig");

      return text.replace(regexp, "$1");
    }
  },
  created() {
    let text;
    if (this.value === undefined) {
      text = JSON.parse(JSON.stringify(this.text));
    } else {
      text = JSON.parse(JSON.stringify(this.value));
    }
    const reg = `(src=["'])/`;
    const regexp = new RegExp(reg, "ig");
    this._text = text.replace(regexp, `$1${this.$site_app}/`);
  }
};
</script>
