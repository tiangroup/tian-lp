<template>
  <div :class="{ 'position-relative': _isEdit }" :id="section.id">
    <buttons-section v-if="_isEdit" :section="section" />
    <div
      class="process custom-h-spacing custom-v-spacing bg-primary"
      :class="{ mDark: section.settings.background === 'dark' }"
    >
      <div class="landing__container">
        <h2 v-if="isEdit">
          <editor
            :text="section.title || ''"
            :sectionId="section.id"
            field="title"
          />
        </h2>
        <h2 v-else>{{ section.title }}</h2>
        <div class="process__list cells" v-if="section.items">
          <div
            class="process__item cell cell-12 cell-sm-6 cell-lg-3"
            v-for="item in section.items.filter(i => i.id)"
            :key="item.id"
            :style="styleDiv"
          >
            <buttons-item
              v-if="isEdit"
              :itemId="item.id"
              :sectionId="section.id"
            />

            <image-item
              divClass="process__image"
              :svg="item.svg"
              :img="item.img"
              :itemId="item.id"
              :sectionId="section.id"
              field="img"
              fieldSvg="svg"
              imageStyle="icon_md"
            />

            <div class="process__body">
              <div class="process__title" v-if="isEdit">
                <editor
                  :text="item.title || ''"
                  :sectionId="section.id"
                  field="title"
                  :itemId="item.id"
                />
              </div>
              <div class="process__title" v-else>
                {{ item.title }}
              </div>
              <div class="process__description" v-if="isEdit">
                <editor
                  :text="item.description || ''"
                  :sectionId="section.id"
                  field="description"
                  :itemId="item.id"
                />
              </div>
              <div class="process__description" v-else>
                {{ item.description }}
              </div>
            </div>
          </div>
          <div
            class="process__item cell cell-12 cell-sm-6 cell-lg-3"
            v-if="isEdit && (!section.items || !section.items.length)"
          >
            <div class="item__add-button">
              <buttons-item-add :sectionId="section.id" />
            </div>
            <div class="process__image no-image"></div>
            <div class="process__body">
              <v-skeleton-loader
                boilerplate
                type="heading, paragraph"
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
.process >>> .v-skeleton-loader__heading,
.process >>> .v-skeleton-loader__text {
  background-color: var(--separator-color);
}
.process >>> .v-skeleton-loader__heading {
  margin-bottom: 1rem;
}
</style>
