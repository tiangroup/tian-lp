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
      :upload="true"
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
    text: {
      type: String,
      default: ""
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
      return (
        this._isEdit && (!this.sectionId || this.isSectionEdit(this.sectionId))
      );
    },
    out() {
      const out = this.value === undefined ? this.text : this.value;
      if (this._isEdit && out) {
        const reg = `(src=["'])/`;
        const regexp = new RegExp(reg, "ig");
        return out.replace(regexp, `$1${this.$site_app}/`);
      } else {
        return out;
      }
    }
  },
  methods: {
    onInput(text) {
      console.log(text);
      this.$emit("input", text);
    }
  }
};
</script>
