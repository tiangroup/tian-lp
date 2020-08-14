<template>
  <div>
    <div class="field__label">Нужно что-то выбрать:</div>
    <label class="field field--radio">
      <input type="radio" class="field__input" name="option" />
      <div class="fake-radio"></div>
      <div class="field__label">Или одно</div>
    </label>
    <label class="field field--radio">
      <input type="radio" class="field__input" name="option" />
      <div class="fake-radio"></div>
      <div class="field__label">Или другое</div>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    value: String
  }
};
</script>
