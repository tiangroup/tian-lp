<template>
  <div :class="[divClass, { 'no-image': !img }]" v-html="img"></div>
</template>

<script>
export default {
  props: {
    divClass: { type: String, default: "" },
    img: String
  }
};
</script>
