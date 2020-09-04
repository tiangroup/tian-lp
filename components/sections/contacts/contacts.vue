<template>
  <div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section"></buttons-section>

    <component
      class="contacts bg-secondary"
      :class="{ mDark: section.settings.background === 'dark' }"
      :is="view"
      :section="section"
      :isEdit="isEdit"
      @onItemDelete="onItemDelete"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import View1 from "./ContactsView1";
import View2 from "./ContactsView2";
import View3 from "./ContactsView3";
export default {
  props: {
    section: Object,
  },
  components: {
    View1,
    View2,
    View3,
  },
  computed: {
    ...mapGetters({
      isEdit: "isEdit",
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    view() {
      return this.section.settings.view;
    },
  },
  methods: {
    async onItemDelete(payload) {
      const item = this.section.items.find((i) => i.id == payload.itemId);
      const formData = new FormData();
      formData.append("image", item.img);
      await this.$axios.post("/api/upload/image-remove", formData);
    },
  },
};
</script>
<style>
.contacts a {
  color: var(--theme-color);
}
</style>