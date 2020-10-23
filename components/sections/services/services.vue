<template>
  <div :class="{ 'position-relative': _isEdit }" :id="section.id">
    <buttons-section v-if="_isEdit" :section="section"></buttons-section>
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
        <component
          :is="view"
          :section="section"
          :isEdit="isEdit"
          @call-order-dialog="showOrderDialog"
        />
      </div>
    </div>
    <form-dialog
      :section="section"
      field="form_order"
      buttonClass="button-primary"
      popupClass="popup-order"
      v-model="dialogOrderService"
    >
      <div class="good-summary">
        <div class="good-summary__row">
          <div class="good-summary__image" v-if="currentItem.img">
            <img :src="$site_img(currentItem.img, 'icon_sm')" />
          </div>
          <div class="good-summary__body">
            <div class="good-summary__title">
              {{ currentItem.title }}
            </div>
            <div class="good-summary__price">
              {{ currentItem.price }}
            </div>
          </div>
        </div>
        <div class="good-summary__status">
          <svg viewBox="0 0 24 24" height="23" width="23" fill="currentColor">
            <path
              d="M21 11.080v0.92c-0.001 2.485-1.009 4.733-2.64 6.362s-3.88 2.634-6.365 2.632-4.734-1.009-6.362-2.64-2.634-3.879-2.633-6.365 1.009-4.733 2.64-6.362 3.88-2.634 6.365-2.633c1.33 0.001 2.586 0.289 3.649 0.775 0.502 0.23 1.096 0.008 1.325-0.494s0.008-1.096-0.494-1.325c-1.327-0.606-2.866-0.955-4.479-0.956-3.037-0.002-5.789 1.229-7.78 3.217s-3.224 4.74-3.226 7.777 1.229 5.789 3.217 7.78 4.739 3.225 7.776 3.226 5.789-1.229 7.78-3.217 3.225-4.739 3.227-7.777v-0.92c0-0.552-0.448-1-1-1s-1 0.448-1 1zM21.293 3.293l-9.293 9.302-2.293-2.292c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414l3 3c0.391 0.391 1.024 0.39 1.415 0l10-10.010c0.39-0.391 0.39-1.024-0.001-1.414s-1.024-0.39-1.414 0.001z"
            />
          </svg>
        </div>
      </div>
    </form-dialog>
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
    return {
      currentItem: {},
      dialogOrderService: false,
    };
  },
  computed: {
    ...mapGetters({
      _isEdit: "isEdit",
      isSectionEdit: "isSectionEdit",
    }),
    isEdit() {
      return this._isEdit && this.isSectionEdit(this.section);
    },
    view() {
      return this.section.settings.view;
    },
  },
  methods: {
    showOrderDialog(item) {
      if (item) {
        this.currentItem = item;
        this.dialogOrderService = true;
      }
    },
  },
};
</script>
<style scoped>
.services >>> .v-skeleton-loader__chip,
.services >>> .v-skeleton-loader__heading,
.services >>> .v-skeleton-loader__text {
  background-color: var(--separator-color);
}
.services >>> .v-skeleton-loader__heading {
  margin-bottom: 2rem;
}
.services >>> .v-skeleton-loader__chip {
  display: inline-block;
  margin-right: 1rem;
}
</style>
