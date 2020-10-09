<template>
  <client-only>
    <medium-editor
      :text="value"
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
    value: String,
    editContent: {
      type: String,
      default: "text"
    }
  },
  data: () => ({}),
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
    applyItemTextEdit(operation) {
      let text = operation.api.origElements.textContent;
      if (operation.api.options.editContent == "html") {
        text = operation.api.origElements.innerHTML;
      }

      this.$emit("input", text);
    }
  }
};
</script>
