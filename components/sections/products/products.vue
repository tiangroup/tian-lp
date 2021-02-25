<template>
  <div :class="{ 'position-relative': _isEdit }" :id="section.id">
    <buttons-section v-if="_isEdit" :section="section" />
    <div
      class="products custom-v-spacing-2 custom-h-spacing bg-secondary"
      :class="{ mDark: section.settings.background === 'dark' }"
    >
      <div class="landing__container">
        <h2>
          <editor-text
            :text="section.title"
            :sectionId="section.id"
            field="title"
          />
        </h2>
        <div v-if="section.settings.view === 'view1'">
          <div class="products__list cells" v-if="section.items && isEdit">
            <products-item
              class="cell-12 cell-sm-6 cell-lg-4 cell-xl-3"
              v-for="item in section.items.filter((i) => i.id)"
              :key="item.id"
              :item="item"
              :section="section"
              :isEdit="isEdit"
              @call-details-dialog="handleDetailsCall"
              @call-order-dialog="handleOrderCall"
            ></products-item>
            <div
              class="products__item-wrap cell cell-12 cell-sm-6 cell-lg-4 cell-xl-3"
              v-if="!section.items || !itemsCount"
            >
              <div class="products__item">
                <div class="item__add-button">
                  <buttons-item-add :sectionId="section.id" />
                </div>
                <div class="products__details no-hover">
                  <div class="products__image no-image"></div>
                  <div class="products__title">
                    <v-skeleton-loader
                      boilerplate
                      type="paragraph"
                    ></v-skeleton-loader>
                  </div>
                </div>
                <div class="products__action">
                  <v-skeleton-loader
                    boilerplate
                    type="button"
                  ></v-skeleton-loader>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="section.items">
            <transition-group
              tag="div"
              name="products-appear"
              class="products__list cells"
            >
              <products-item
                class="cell-12 cell-sm-6 cell-xl-3"
                :id="item.id"
                v-for="item in section.items.filter(showLimited)"
                :key="item.id"
                :item="item"
                :section="section"
                :isEdit="isEdit"
                @call-details-dialog="handleDetailsCall"
                @call-order-dialog="handleOrderCall"
              ></products-item>
            </transition-group>
            <div
              class="cells align-items-center justify-content-center justify-content-sm-between"
            >
              <div class="cell products__count">
                Товаров {{ itemsShown }} из {{ itemsCount }}
              </div>
              <div
                class="cell cell-auto products__loadmore"
                v-if="itemsCount > 4"
              >
                <button
                  class="button button-primary button-more"
                  :class="{
                    'button-more--opened display-none': itemsShown >= itemsCount
                  }"
                  @click="showMoreItems"
                >
                  <div class="button__body">{{ loadmoreText }}</div>
                </button>
              </div>
              <div class="cell display-none display-sm-block grow-sm-1"></div>
            </div>
          </div>
        </div>
        <div class="products__list mx-ncell" v-if="view === 'view2'">
          <client-only>
            <slick
              :ref="slickRef"
              :options="updatedSlickOptions"
              @init="handleInit"
              :key="slickKey"
            >
              <products-item
                v-for="item in section.items.filter((i) => i.id)"
                :key="item.id"
                :item="item"
                :section="section"
                :isEdit="isEdit"
                @call-details-dialog="handleDetailsCall"
                @call-order-dialog="handleOrderCall"
              ></products-item>
              <div
                class="products__item-wrap cell"
                v-if="!section.items || !itemsCount"
              >
                <div class="products__item">
                  <div class="item__add-button">
                    <buttons-item-add :sectionId="section.id" />
                  </div>
                  <div class="products__details no-hover">
                    <div class="products__image no-image"></div>
                    <div class="products__title">
                      <v-skeleton-loader
                        boilerplate
                        type="paragraph"
                      ></v-skeleton-loader>
                    </div>
                  </div>
                  <div class="products__action">
                    <v-skeleton-loader
                      boilerplate
                      type="button"
                    ></v-skeleton-loader>
                  </div>
                </div>
              </div>
            </slick>
            <template slot="placeholder">
              <div class="cells fx-nw overflow-hidden">
                <products-item
                  class="cell-12 cell-sm-6 cell-lg-4 cell-xl-3"
                  v-for="item in section.items.filter((i) => i.id)"
                  :key="item.id"
                  :item="item"
                  :section="section"
                  :isEdit="false"
                ></products-item>
              </div>
            </template>
          </client-only>
        </div>
      </div>
    </div>

    <form-dialog
      v-if="currentItem"
      :section="section"
      field="order_form"
      v-model="dialogOrderProduct"
      :hiddenData="currentItem.title"
      :dark-theme="isThemeDark"
    >
      <div class="good-summary">
        <div class="good-summary__row">
          <div class="good-summary__image" v-if="currentItem.img_1">
            <img :src="$site_img(currentItem.img_1, 'sq_lg_ext')" />
          </div>
          <div class="good-summary__body">
            <div class="good-summary__title">{{ currentItem.title }}</div>
            <div class="good-summary__price">{{ currentItem.price }}</div>
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
      v-if="isCenter && currentItem"
      scrollable
      :retain-focus="!isEdit"
    >
      <div
        class="der-popup"
        :class="{ mDark: section.settings.background === 'dark' }"
      >
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
              :item="currentItem"
              :is-edit="isEdit"
              :section="section"
              @save-details="saveItemDetails"
              @call-order-form="handleOrderFormCall"
              @call-gallery="handleGalleryCall"
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
      v-if="!isCenter && currentItem"
      :stateless="keepOpen"
    >
      <div
        class="der-popup"
        :class="{ mDark: section.settings.background === 'dark' }"
      >
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
              :item="currentItem"
              :is-edit="isEdit"
              :section="section"
              @save-details="saveItemDetails"
              @call-order-form="handleOrderFormCall"
              @call-gallery="handleGalleryCall"
            ></products-item-detailed>
          </div>
        </div>
      </div>
    </v-navigation-drawer>

    <client-only>
      <v-gallery
        :images="currentItemImages"
        :index="index"
        @close="closeGallery"
        v-if="currentItem"
        :id="'gallery' + currentItem.id"
        :options="{
          closeOnSlideClick: true
        }"
      ></v-gallery>
    </client-only>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import ProductsItem from "./ProductsItem";
export default {
  props: {
    section: Object
  },
  components: {
    ProductsItem
  },
  data: () => ({
    currentItemId: "",
    currentItemImg: "",
    currentSlide: 0,
    dialogDetailedItem: false,
    dialogOrderProduct: false,
    index: null,
    itemsToShow: 4,
    keepOpen: false,
    slickOptions: {
      arrows: true,
      dots: true,
      infinite: false,
      draggable: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow:
        '<button type="button" class="slick-arrow slick-prev"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L2 13.9706L15.966 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
      nextArrow:
        '<button type="button" class="slick-arrow slick-next"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L15 13.9706L1.03398 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        }
      ]
    }
  }),
  computed: {
    ...mapGetters({
      _isEdit: "isEdit",
      isSectionEdit: "isSectionEdit",
      settings: "sites/settings"
    }),
    isEdit() {
      return this._isEdit && this.isSectionEdit(this.section);
    },
    isCenter() {
      return this.settings.popup != "right" && this.settings.popup != "left";
    },
    updatedSlickOptions() {
      return Object.assign(this.slickOptions, {
        infinite: !this.isEdit,
        draggable: !this.isEdit
      });
    },
    view() {
      return this.section.settings.view;
    },
    slickRef() {
      return "slick" + this.section.id;
    },
    itemsShown() {
      if (this.itemsToShow >= this.itemsCount) {
        return this.itemsCount;
      } else {
        return this.itemsToShow;
      }
    },
    itemsCount() {
      return this.section.items.length;
    },
    loadmoreText() {
      if (this.itemsShown >= this.itemsCount) {
        return "Свернуть";
      } else {
        return "Загрузить еще";
      }
    },
    slickKey() {
      let key = "" + this.isEdit;
      if (this.itemsCount) {
        for (var i = 0; i < this.itemsCount; i++) {
          key += this.section.items[i].id;
        }
      }
      //console.log("products-slick key " + key);
      return key;
    },
    computedRealSlides() {
      return document
        .getElementById(this.section.id)
        .querySelectorAll(".slick-slide:not(.slick-cloned)");
    },
    currentItem() {
      const chosenItm = this.section.items.find(
        (itm) => itm.id === this.currentItemId
      );
      // if (chosenItm) {
      //   console.log(chosenItm.title);
      // }
      return chosenItm ? chosenItm : this.section.items[0];
    },
    isThemeDark() {
      return this.section.settings.background === "dark";
    },
    currentItemImages() {
      var imagesArray = [];
      if (this.currentItem) {
        for (var i = 1; i < 5; i++) {
          let imgKey = "img_" + i;
          if (this.currentItem[imgKey]) {
            var imagesItem = {
              title: this.currentItem.title || "",
              href: this.$site_img(this.currentItem[imgKey], "resize_xl"),
              type: "image/jpeg"
            };
            imagesArray.push(imagesItem);
          }
        }
      }
      return imagesArray;
    }
  },
  methods: {
    handleInit(event, slick) {
      if (this.currentSlide) {
        slick.goTo(this.currentSlide, true);
      }
      if (!this.isEdit) {
        document
          .getElementById(this.section.id)
          .addEventListener("click", this.handleClonedSlides);
      }
    },
    handleClonedSlides(e) {
      if (e.target.closest(".slick-cloned")) {
        let slideIndex = Number(
          e.target.closest(".slick-cloned").getAttribute("data-slick-index")
        );
        let slideId = 0;
        if (slideIndex > 0) {
          slideId = slideIndex % this.computedRealSlides.length;
        } else if (slideIndex < 0) {
          slideId = this.computedRealSlides.length + slideIndex;
        }

        if (e.target.closest(".products__details")) {
          this.computedRealSlides[slideId]
            .querySelector(".products__details")
            .click();
        }

        if (e.target.closest(".products__action")) {
          this.computedRealSlides[slideId].querySelector(".button").click();
        }
      }
    },
    showLimited(item, itemIndex) {
      if (item && item.id && itemIndex < this.itemsToShow) {
        return true;
      }
    },
    showMoreItems() {
      if (this.itemsShown >= this.itemsCount) {
        this.itemsToShow = 4;
      } else {
        this.itemsToShow += 4;
      }
      document.activeElement.blur();
    },
    saveItemDetails() {
      this.$store.dispatch("pages/savePage");
      this.dialogDetailedItem = false;
    },
    handleOrderFormCall() {
      this.dialogDetailedItem = false;
      this.currentItemImg = this.currentItem.img_1;
      this.dialogOrderProduct = true;
    },
    handleDetailsCall: function (item) {
      this.currentItemId = item.id;
      this.dialogDetailedItem = true;
    },
    handleOrderCall: function (item) {
      this.currentItemId = item.id;
      this.currentItemImg = item.img_1;
      this.dialogOrderProduct = true;
    },
    handleGalleryCall(index) {
      if (!this.isEdit) {
        this.keepOpen = true;
        this.index = index;
      }
    },
    closeGallery() {
      this.index = null;
      this.keepOpen = true;
      setTimeout(() => (this.keepOpen = false), 300);
    }
  },
  mounted: function () {
    if (this.$vuetify.breakpoint.width > 1279) {
      this.itemsToShow = 8;
    }
  },
  beforeUpdate: function () {
    if (this.$refs[this.slickRef]) {
      this.currentSlide = this.$refs[this.slickRef].currentSlide();
    }
  },
  beforeDestroy: function () {
    if (this.$refs[this.slickRef]) {
      if (document.getElementById(this.section.id) && !this.isEdit) {
        document
          .getElementById(this.section.id)
          .removeEventListener("click", this.handleClonedSlides);
      }
    }
  }
};
</script>
<style scoped>
.products-appear-enter-active {
  transition: transform 0.4s, opacity 0.4s;
  transform: translateY(0);
}
.products-appear-leave-to {
  margin-bottom: 0;
}
.products-appear-enter {
  transform: translateY(200px);
  opacity: 0;
}
.products >>> .v-skeleton-loader__button,
.products >>> .v-skeleton-loader__chip,
.products >>> .v-skeleton-loader__heading,
.products >>> .v-skeleton-loader__text {
  background-color: var(--separator-color);
}
.products >>> a {
  color: inherit;
}
.v-navigation-drawer {
  z-index: 120;
  background-color: transparent;
}
</style>
