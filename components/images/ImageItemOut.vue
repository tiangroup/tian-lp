<template>
  <div :class="[divClass, { 'no-image': !img }]">
    <img
      v-if="img && img.indexOf('http') === 0"
      :src="img"
      :loading="loading"
    />
    <nuxt-img
      v-else-if="img"
      :src="src"
      :image-style="imageStyle"
      :loading="loading"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    divClass: { type: String, default: "" },
    img: String,
    imageStyle: { type: String, default: null },
    sectionId: String
  },
  computed: {
    ...mapGetters({
      _isEdit: "isEdit",
      isApp: "isApp",
      site: "sites/site",
      page: "pages/page"
    }),
    src() {
      if (this._isEdit && !this.isApp) {
        return "/uploads/" + this.site.name + this.img;
      } else {
        return this.$site_img(this.img);
      }
    },
    loading() {
      let index = this.page.sections
        .filter(s => s.show)
        .map(s => s.id)
        .indexOf(this.sectionId);
      return index > 2 ? "lazy" : null;
    }
  }
};
</script>
