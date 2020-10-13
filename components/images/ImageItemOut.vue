<template>
  <div :class="[divClass, { 'no-image': !img }]">
    <img v-if="img && img.indexOf('http') === 0" :src="$site_img(img)" />
    <nuxt-img v-else-if="img" :src="$site_img(img)" :image-style="imageStyle" />
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
