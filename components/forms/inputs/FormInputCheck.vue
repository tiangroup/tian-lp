<template>
  <label class="field field--check" :class="{ 'field--required': item.required }">
    <input
      type="checkbox"
      class="field__input"
      :name="item.id"
      :required="!!item.required"
      v-model="check"
    />

    <span class="fake-checkbox"></span>
    <span class="field__label">{{ item.label }}</span>
  </label>
</template>

<script>
export default {
  props: {
    item: Object,
    value: false,
  },
  computed: {
    check: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value ? 1 : null);
      },
    },
  },
};
</script>
