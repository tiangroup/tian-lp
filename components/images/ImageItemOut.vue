<template>
  <div :class="[divClass, { 'no-image': !img }]">
    <img v-if="img && img.indexOf('http') === 0" :src="img" loading="lazy" />
    <nuxt-img
      v-else-if="img"
      :src="src"
      :image-style="imageStyle"
      loading="lazy"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    divClass: { type: String, default: "" },
    img: String,
    imageStyle: { type: String, default: null }
  },
  computed: {
    ...mapGetters({
      _isEdit: "isEdit",
      isApp: "isApp",
      site: "sites/site"
    }),
    src() {
      if (this._isEdit && !this.isApp) {
        return "/uploads/" + this.site.name + this.img;
      } else {
        return this.$site_img(this.img);
      }
    }
  }
};
</script>
