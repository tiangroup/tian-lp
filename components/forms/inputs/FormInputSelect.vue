<template>
  <div>
    <label
      class="field field--select"
      :class="{ 'field--required': item.required }"
    >
      <div class="field__label">{{ item.label }}</div>
      <select
        class="field__select field__input"
        :required="!!item.required"
        :value="value"
        @input="$emit('input', $event.target.value)"
        :name="item.id"
      >
        <option v-for="(val, index) in values" :key="index" :value="val">
          {{ val }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    value: String
  },
  computed: {
    values() {
      const values = this.item.values;
      if (values) {
        return values.split("\n").filter(s => s.trim() != "");
      } else {
        return [];
      }
    }
  }
};
</script>
