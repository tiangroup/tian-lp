<template>
  <div>
    <editor
      v-if="isEdit"
      :data-placeholder="dataPlaceholder"
      :value="value"
      :text="text || ''"
      :sectionId="sectionId"
      :field="field"
      :items="items"
      :itemId="itemId"
      :object="object"
      @input="onInput"
      editContent="html"
    />
    <div v-else v-html="out"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    value: {
      type: String,
      default: undefined
    },
    text: String,
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
    dataPlaceholder: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      _isEdit: "isEdit",
      isSectionEdit: "isSectionEdit"
    }),
    isEdit() {
      return this._isEdit && this.isSectionEdit(this.sectionId);
    },
    out() {
      const out = this.value === undefined ? this.text : this.value;
      return out;
    }
  },
  methods: {
    onInput(text) {
      this.$emit("input", text);
    }
  }
};
</script>
