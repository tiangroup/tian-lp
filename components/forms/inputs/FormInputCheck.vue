<template>
  <label
    class="field field--check"
    :class="{ 'field--required': item.required }"
  >
    <input
      type="checkbox"
      class="field__input"
      :name="item.id"
      :required="!!item.required"
      v-model="check"
    />

    <div class="fake-checkbox"></div>
    <div class="field__label">
      {{ item.label }}
    </div>
  </label>
</template>

<script>
export default {
  props: {
    item: Object,
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  computed: {
    check: {
      get() {
        return this.value;
      },
      set(value) {
        this.value = value;
        this.$emit("input", value);
      }
    }
  }
};
</script>
