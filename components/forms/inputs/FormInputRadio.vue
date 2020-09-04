<template>
  <div>
    <div class="field__label">{{ item.label }}</div>
    <label class="field field--radio" v-for="(value, index) in values" :key="index">
      <input
        type="radio"
        class="field__input"
        :name="item.id"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
      <span class="fake-radio"></span>
      <span class="field__label">{{ value }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    value: String,
  },
  computed: {
    values() {
      const values = this.item.values;
      if (values) {
        return values.split("\n").filter((s) => s.trim() != "");
      } else {
        return [];
      }
    },
  },
};
</script>
