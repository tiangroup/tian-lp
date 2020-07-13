<template>
  <div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section" />

    <div
      class="highlights bg-primary"
      :class="{ mDark: section.settings.background === 'dark' }"
    >
      <div class="landing__container">
        <div class="highlights__list cells">
          <div
            class="highlights__item cell cell-12 cell-sm-6 cell-lg-3"
            v-for="item in section.items.filter(i => i.id)"
            :key="item.id"
            :style="styleDiv"
          >
            <buttons-item
              v-if="isEdit"
              :itemId="item.id"
              :sectionId="section.id"
            />
            <div
              class="highlights__icon"
              :class="{ 'no-image': !item.svg }"
              v-html="item.svg"
              :title="isEdit ? 'Двойной клик - изменить картинку' : ''"
              @dblclick="
                itemSvgSelect({
                  itemId: item.id,
                  field: 'svg',
                  value: item.svg
                })
              "
            ></div>
            <div class="highlights__text" v-if="isEdit">
              <editor
                :text="item.title || ''"
                :sectionId="section.id"
                field="title"
                :itemId="item.id"
              />
            </div>
            <div class="highlights__text" v-else>{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>

    <image-svg
      v-if="isEdit"
      :dialog="dialogImageSvg"
      :itemSvgEdit="itemSvgEdit"
      @close="dialogImageSvg = false"
      @save="itemSvgSave"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    section: Object,
    type: String
  },
  components: {
    Editor: () => import("@/components/admin/Editor"),
    ButtonsSection: () => import("@/components/admin/ButtonsSection"),
    ButtonsItem: () => import("@/components/admin/ButtonsItem"),
    ImageSvg: () => import("@/components/admin/ImageSvg")
  },
  data: () => ({
    dialogImageSvg: false,
    itemSvgEdit: {}
  }),
  computed: {
    isEdit() {
      return this.$auth.loggedIn;
    },
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    ...mapGetters({
      sections: "sections/sections",
      change: "pages/change"
    })
  },
  methods: {
    ...mapMutations({
      setSectionField: "pages/SET_SECTION_FIELD",
      setItemField: "pages/SET_ITEM_FIELD"
    }),
    itemSvgSelect(item) {
      this.itemSvgEdit = item;
      this.dialogImageSvg = true;
    },
    itemSvgSave(payload) {
      this.dialogImageSvg = false;
      this.setItemField({
        sectionId: this.section.id,
        itemId: payload.itemId,
        items: "items",
        field: payload.field,
        value: payload.value
      });
    }
  }
};
</script>
