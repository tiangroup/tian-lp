<template>
  <div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section"></buttons-section>

    <component
      :is="view"
      :section="section"
      :isEdit="isEdit"
      @onItemDelete="onItemDelete"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    section: Object
  },
  components: {
    View1: () => import("./BenefitsView1"),
    View2: () => import("./BenefitsView2"),
    View3: () => import("./BenefitsView3")
  },
  computed: {
    ...mapGetters({
      isEdit: "isEdit",
      change: "pages/change"
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    view() {
      return this.section.settings.view;
    }
  },
  methods: {
    async onItemDelete(payload) {
      const item = this.section.items.find(i => i.id == payload.itemId);
      const formData = new FormData();
      formData.append("image", item.img);
      await this.$axios.post("/api/upload/image-remove", formData);
    }
  }
};
</script>
