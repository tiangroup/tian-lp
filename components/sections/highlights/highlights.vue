<template>
  <div :class="{ 'position-relative': _isEdit }" :id="section.id">
    <buttons-section v-if="_isEdit" :section="section" />

    <div
      class="highlights bg-primary"
      :class="{ mDark: section.settings.background === 'dark' }"
    >
      <div class="landing__container">
        <div class="highlights__list cells">
          <div
            class="highlights__item cell cell-12 cell-sm-6 cell-lg-3"
            v-for="item in section.items.filter((i) => i.id)"
            :key="item.id"
            :style="styleDiv"
          >
            <buttons-item
              v-if="isEdit"
              :itemId="item.id"
              :sectionId="section.id"
            />
            <image-item
              divClass="highlights__icon"
              :svg="item.svg"
              :img="item.img"
              :itemId="item.id"
              :sectionId="section.id"
              field="img"
              fieldSvg="svg"
              imageStyle="icon_sm"
            />
            <div class="highlights__text">
              <editor-html
                :text="item.title"
                :sectionId="section.id"
                field="title"
                :itemId="item.id"
              />
            </div>
          </div>
          <div
            class="highlights__item cell cell-12 cell-sm-6 cell-lg-3"
            v-if="isEdit && (!section.items || !section.items.length)"
          >
            <div class="item__add-button">
              <buttons-item-add :sectionId="section.id" />
            </div>
            <div class="highlights__icon no-image"></div>
            <div class="highlights__text grow-1">
              <v-skeleton-loader
                boilerplate
                type="paragraph"
                width="100%"
              ></v-skeleton-loader>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    section: Object
  },
  computed: {
    ...mapGetters({
      _isEdit: "isEdit",
      isSectionEdit: "isSectionEdit"
    }),
    isEdit() {
      return this._isEdit && this.isSectionEdit(this.section);
    },
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    }
  }
};
</script>
<style scoped>
.highlights >>> .v-skeleton-loader__text {
  background-color: var(--separator-color);
}
</style>
