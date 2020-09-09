<template>
  <div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section" />
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
              :itemId="item.id"
              :sectionId="section.id"
              :field="null"
              fieldSvg="svg"
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
            <buttons-item-add :sectionId="section.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {
    section: Object
  },
  computed: {
    ...mapGetters({
      isEdit: "isEdit"
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    }
  }
};
</script>
