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
            <image-item
              divClass="highlights__icon"
              :svg="item.svg"
              :img="item.img"
              :itemId="item.id"
              :sectionId="section.id"
              field="img"
              fieldSvg="svg"
            />
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
          <div
            class="highlights__item cell cell-12 cell-sm-6 cell-lg-3"
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
import { mapGetters } from "vuex";
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
