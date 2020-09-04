<template>
  <label class="field field--text" :class="{ 'field--required': item.required }">
    <span class="field__label">{{ item.label }}</span>
    <input
      type="text"
      class="field__input"
      :name="item.id"
      :required="!!item.required"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  props: {
    item: Object,
    value: String,
  },
};
</script>
