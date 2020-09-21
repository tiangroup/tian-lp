<template>
  <client-only>
    <medium-editor
      :text="_text"
      :options="{
        ...editorOptions,
        editContent
      }"
      @edit="operation => applyItemTextEdit(operation)"
    />
  </client-only>
</template>

<script>
import { mapMutations } from "vuex";
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
    _text: null
  }),
  computed: {
    editorOptions() {
      return {
        placeholder: {
          text: "Введите текст",
          hideOnClick: true
        },
        toolbar: {
          buttons: [
            "bold",
            "italic",
            "underline",
            "anchor",
            "h2",
            "h3",
            "removeFormat",
            "html"
          ]
        }
      };
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
    }
  },
  created() {
    this._text = JSON.parse(JSON.stringify(this.text));
  }
};
</script>
