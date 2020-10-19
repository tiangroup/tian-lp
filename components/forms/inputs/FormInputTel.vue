<template>
  <label
    class="field field--text"
    :class="{ 'field--required': item.required }"
  >
    <span class="field__label">{{ item.label }}</span>
    <input
      type="tel"
      class="field__input"
      :name="item.id"
      :required="!!item.required"
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-mask="mask"
      placeholder="+7 900 111-22-33"
    />
  </label>
</template>

<script>
import { VueMaskDirective as mask } from "v-mask";
export default {
  directives: {
    mask
  },
  data: () => ({
    mask: "+7 ### ###-##-##"
  }),
  props: {
    item: Object,
    value: String
  }
};
</script>
