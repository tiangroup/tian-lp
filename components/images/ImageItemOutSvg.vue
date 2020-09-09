<template>
  <div :class="[divClass, { 'no-image': !svg }]" v-html="svg"></div>
</template>

<script>
export default {
  props: {
    divClass: { type: String, default: "" },
    svg: String
  }
};
</script>
