<template>
  <div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section"></buttons-section>

    <component
      :is="view"
      :section="section"
      :isEdit="isEdit"
      @itemFieldEdit="itemFieldEdit"
      @sectionFieldEdit="sectionFieldEdit"
      @onItemDelete="onItemDelete"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    section: Object
  },
  components: {
    ButtonsSection: () => import("@/components/admin/ButtonsSection"),
    View1: () => import("./views/view1"),
    View2: () => import("./views/view2"),
    View3: () => import("./views/view3")
  },
  computed: {
    isEdit() {
      return this.$auth.loggedIn;
    },
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    ...mapGetters({
      change: "pages/change"
    }),
    view() {
      return this.section.settings.view;
    }
  },
  data: () => ({}),
  methods: {
    ...mapMutations({
      setSection: "pages/SET_SECTION",
      setSectionField: "pages/SET_SECTION_FIELD",
      setItemField: "pages/SET_ITEM_FIELD"
    }),
    itemFieldEdit(item) {
      this.setItemField({
        sectionId: this.section.id,
        itemId: item.id,
        items: item.items,
        field: item.field,
        value: item.value
      });
      this.$store.dispatch("pages/savePage");
    },
    async onItemDelete(payload) {
      const item = this.section.items.find(i => i.id == payload.itemId);
      const formData = new FormData();
      formData.append("image", item.img);
      await this.$axios.post("/api/upload/image-remove", formData);
    },
    sectionFieldEdit(data) {
      this.setSectionField({
        id: this.section.id,
        field: data.field,
        value: data.value
      });
      this.$store.dispatch("pages/savePage");
    }
  }
};
</script>
