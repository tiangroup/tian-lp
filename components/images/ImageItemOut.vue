<template>
  <div :class="[divClass, { 'no-image': !img }]">
    <nuxt-img v-if="img" :src="$site_img(img)" :image-style="imageStyle" />
  </div>
</template>

<script>
export default {
  props: {
    divClass: { type: String, default: "" },
    img: String,
    imageStyle: { type: String, default: null }
  }
};
</script>
