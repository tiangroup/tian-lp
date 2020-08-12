<template>
  <div :class="[divClass, { 'no-image': !img }]">
    <img v-if="img" :src="$site_img(img)" />
  </div>
</template>

<script>
export default {
  props: {
    divClass: { type: String, default: "" },
    img: String
  }
};
</script>
