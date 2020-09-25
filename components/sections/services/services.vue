<template>
  <div :class="{ 'position-relative': isEdit }" :id="section.id">
    <buttons-section v-if="isEdit" :section="section"></buttons-section>
    <div
      class="services custom-v-spacing-2 bg-secondary"
      :class="{
        mDark: section.settings.background === 'dark',
        'services--style1': view === 'view1',
        'services--style2': view === 'view2',
        'services--style3': view === 'view3',
      }"
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
        <component :is="view" :section="section" :isEdit="isEdit" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import View1 from "./ServicesView1";
import View2 from "./ServicesView2";
import View3 from "./ServicesView3";
export default {
  props: {
    section: Object,
  },
  components: {
    View1,
    View2,
    View3,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isEdit: "isEdit",
    }),
    view() {
      return this.section.settings.view;
    },
  },
  methods: {},
};
</script>
<style>
.services .theme--light.v-skeleton-loader .v-skeleton-loader__avatar,
.services .theme--light.v-skeleton-loader .v-skeleton-loader__button,
.services .theme--light.v-skeleton-loader .v-skeleton-loader__chip,
.services .theme--light.v-skeleton-loader .v-skeleton-loader__divider,
.services .theme--light.v-skeleton-loader .v-skeleton-loader__heading,
.services .theme--light.v-skeleton-loader .v-skeleton-loader__image,
.services .theme--light.v-skeleton-loader .v-skeleton-loader__text {
  background-color: var(--separator-color);
}
</style>
