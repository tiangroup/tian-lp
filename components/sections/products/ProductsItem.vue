<template>
  <div
    class="products__item-wrap cell"
    :class="{ 'position-relative': isEdit }"
  >
    <buttons-item
      v-if="isEdit"
      :itemId="item.id"
      :sectionId="section.id"
    ></buttons-item>
    <div class="products__item">
      <div
        class="products__details"
        :class="{ 'products__details--editable': isEdit }"
      >
        <button
          class="products__image"
          :class="{ 'no-image': !item.img_1 }"
          @click="dialogDetailedItem = true"
        >
          <nuxt-img
            v-if="item.img_1"
            :src="$site_img(item.img_1)"
            image-style="sq_lg_ext"
          />
        </button>
        <div class="products__title">
          <editor-text
            data-placeholder="Название товара"
            :text="item.title"
            :sectionId="section.id"
            field="title"
            :itemId="item.id"
            v-if="isEdit"
          />
          <div class="clickable" v-else @click="dialogDetailedItem = true">
            {{ item.title }}
          </div>
        </div>
        <div class="products__description">
          <editor-text
            data-placeholder="Краткое описание товара"
            :text="item.short_description"
            :sectionId="section.id"
            field="short_description"
            :itemId="item.id"
          />
        </div>
        <div class="products__prices">
          <div class="good__prices__current">
            <editor-text
              data-placeholder="000 руб."
              :text="item.price"
              :sectionId="section.id"
              field="price"
              :itemId="item.id"
            />
          </div>
          <div class="good__prices__old">
            <editor-text
              data-placeholder="000 руб."
              :text="item.old_price"
              :sectionId="section.id"
              field="old_price"
              :itemId="item.id"
            />
          </div>
        </div>
      </div>
      <div class="products__action">
        <button
          class="button button-secondary"
          @click="dialogOrderProduct = true"
        >
          Заказать
        </button>
      </div>
    </div>

    <form-dialog
      :section="section"
      field="order_form"
      v-model="dialogOrderProduct"
      :hiddenData="item.title"
    >
      <div class="good-summary">
        <div class="good-summary__row">
          <div class="good-summary__image" v-if="item.img_1">
            <nuxt-img :src="$site_img(item.img_1)" image-style="icon_sm" />
          </div>
          <div class="good-summary__body">
            <div class="good-summary__title">{{ item.title }}</div>
            <div class="good-summary__price">{{ item.price }}</div>
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

    <v-dialog
      v-model="dialogDetailedItem"
      max-width="40rem"
      v-if="isCenter"
      scrollable
    >
      <div class="der-popup">
        <div class="der-popup__body">
          <div class="der-popup__close">
            <button
              class="button button-icon button-close"
              @click="dialogDetailedItem = false"
            >
              <span class="sr-only">Закрыть</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L9 9M17 17L9 9M9 9L1 17M9 9L17 1"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <div class="popup-order">
            <products-item-detailed
              :item="item"
              :is-edit="isEdit"
              :section="section"
              @save-details="saveItemDetails"
              @call-order-form="handleOrderFormCall"
            ></products-item-detailed>
          </div>
        </div>
      </div>
    </v-dialog>
    <v-navigation-drawer
      app
      temporary
      width="40rem"
      :right="settings.popup == 'right'"
      v-model="dialogDetailedItem"
      v-if="!isCenter"
    >
      <div class="der-popup">
        <div class="der-popup__body">
          <div class="der-popup__close">
            <button
              class="button button-icon button-close"
              @click="dialogDetailedItem = false"
            >
              <span class="sr-only">Закрыть</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L9 9M17 17L9 9M9 9L1 17M9 9L17 1"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <div class="popup-order">
            <products-item-detailed
              :item="item"
              :is-edit="isEdit"
              :section="section"
              @save-details="saveItemDetails"
              @call-order-form="handleOrderFormCall"
            ></products-item-detailed>
          </div>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    item: Object,
    section: Object,
    isEdit: Boolean
  },
  data: () => ({
    dialogOrderProduct: false,
    dialogDetailedItem: false
  }),
  computed: {
    ...mapGetters({
      settings: "sites/settings"
    }),
    isCenter() {
      return this.settings.popup != "right" && this.settings.popup != "left";
    }
  },
  methods: {
    saveItemDetails() {
      this.$store.dispatch("pages/savePage");
      this.dialogDetailedItem = false;
    },
    handleOrderFormCall() {
      this.dialogDetailedItem = false;
      this.dialogOrderProduct = true;
    }
  }
};
</script>
<style scoped>
.partners__item-wrap a,
.partners__item-wrap a:hover,
.partners__item-wrap a:focus {
  color: inherit;
}
.v-navigation-drawer {
  z-index: 130;
}
</style>
