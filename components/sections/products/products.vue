<template>
  <div :class="{ 'position-relative': _isEdit }" :id="section.id">
    <buttons-section v-if="_isEdit" :section="section" />
    <div
      class="products custom-v-spacing-2 custom-h-spacing bg-secondary"
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
        <div v-if="section.settings.view === 'view1'">
          <div class="products__list cells" v-if="section.items && isEdit">
            <products-item
              class="cell-12 cell-sm-6 cell-lg-4 cell-xl-3"
              v-for="item in section.items.filter((i) => i.id)"
              :key="item.id"
              :item="item"
              :sectionId="section.id"
              :isEdit="isEdit"
              @show-order-form="showOrderForm(item)"
              @show-details="showProductDetails(item)"
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
                      type="article"
                    ></v-skeleton-loader>
                  </div>
                </div>
                <div class="products__action">
                  <v-skeleton-loader
                    boilerplate
                    type="card-heading"
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
                class="cell-12 cell-sm-6 cell-lg-4 cell-xl-3"
                :id="item.id"
                v-for="item in section.items.filter(showLimited)"
                :key="item.id"
                :item="item"
                :sectionId="section.id"
                :isEdit="isEdit"
                @show-details="showProductDetails(item)"
                @show-order-form="showOrderForm(item)"
              ></products-item>
            </transition-group>
            <div
              class="cells align-items-center justify-content-center justify-content-sm-between"
            >
              <div class="cell cell-auto products__count">
                Товаров {{ itemsShown }} из {{ itemsCount }}
              </div>
              <div
                class="cell cell-auto products__loadmore"
                v-if="itemsCount > 4"
              >
                <button
                  class="button button-primary button-more"
                  :class="{ 'button-more--opened': itemsShown >= itemsCount }"
                  @click="showMoreItems"
                >
                  <div class="button__body">{{ loadmoreText }}</div>
                </button>
              </div>
              <div
                class="cell cell-auto display-none display-sm-block grow-sm-1"
              ></div>
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
                :sectionId="section.id"
                :isEdit="isEdit"
                @show-details="showProductDetails(item)"
                @show-order-form="showOrderForm(item)"
                @update-description="updateItemDescription(item)"
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
                        type="article"
                      ></v-skeleton-loader>
                    </div>
                  </div>
                  <div class="products__action">
                    <v-skeleton-loader
                      boilerplate
                      type="card-heading"
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
                  :sectionId="section.id"
                  :isEdit="false"
                ></products-item>
              </div>
            </template>
          </client-only>
        </div>

        <form-dialog
          :section="section"
          field="order_form"
          v-model="dialogOrderProduct"
        >
          <div class="good-summary">
            <div class="good-summary__row">
              <div class="good-summary__image" v-if="currentItem.img">
                <img :src="$images.src(currentItem.img_0)" />
              </div>
              <div class="good-summary__body">
                <div class="good-summary__title">{{ currentItem.title }}</div>
                <div class="good-summary__price">{{ currentItem.price }}</div>
              </div>
            </div>
            <div class="good-summary__status">
              <svg
                viewBox="0 0 24 24"
                height="23"
                width="23"
                fill="currentColor"
              >
                <path
                  d="M21 11.080v0.92c-0.001 2.485-1.009 4.733-2.64 6.362s-3.88 2.634-6.365 2.632-4.734-1.009-6.362-2.64-2.634-3.879-2.633-6.365 1.009-4.733 2.64-6.362 3.88-2.634 6.365-2.633c1.33 0.001 2.586 0.289 3.649 0.775 0.502 0.23 1.096 0.008 1.325-0.494s0.008-1.096-0.494-1.325c-1.327-0.606-2.866-0.955-4.479-0.956-3.037-0.002-5.789 1.229-7.78 3.217s-3.224 4.74-3.226 7.777 1.229 5.789 3.217 7.78 4.739 3.225 7.776 3.226 5.789-1.229 7.78-3.217 3.225-4.739 3.227-7.777v-0.92c0-0.552-0.448-1-1-1s-1 0.448-1 1zM21.293 3.293l-9.293 9.302-2.293-2.292c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414l3 3c0.391 0.391 1.024 0.39 1.415 0l10-10.010c0.39-0.391 0.39-1.024-0.001-1.414s-1.024-0.39-1.414 0.001z"
                />
              </svg>
            </div>
          </div>
        </form-dialog>

        <v-dialog v-model="dialogDetailedItem" max-width="40rem">
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
                  :item="currentItem"
                  :is-edit="isEdit"
                  :section-id="section.id"
                  @save-item="saveItemDetails"
                ></products-item-detailed>
              </div>
            </div>
          </div>
        </v-dialog>

        <client-only>
          <v-gallery
            :images="currentItemImages"
            :index="index"
            @close="index = null"
            v-if="!isEdit"
            :id="'gallery' + section.id"
            :options="{
              closeOnSlideClick: true,
            }"
          ></v-gallery>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import ProductsItem from "./ProductsItem";
export default {
  props: {
    section: Object,
  },
  components: {
    ProductsItem,
  },
  data: () => ({
    currentItem: {},
    currentSlide: 0,
    dialogDetailedItem: false,
    dialogOrderProduct: false,
    index: null,
    itemsToShow: 4,
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
            arrows: false,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    },
  }),
  computed: {
    ...mapGetters({
      _isEdit: "isEdit",
      isSectionEdit: "isSectionEdit",
    }),
    isEdit() {
      return this._isEdit && this.isSectionEdit(this.section);
    },
    updatedSlickOptions() {
      return Object.assign(this.slickOptions, {
        infinite: !this.isEdit,
        draggable: !this.isEdit,
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
    currentItemImages() {
      var imagesArray = [];
      for (var i = 0; i < 4; i++) {
        let imgKey = "img_" + i;
        if (this.currentItem[imgKey]) {
          var imagesItem = {
            title: this.currentItem.title + ". Изображение " + (i + 1),
            href: this.$images.src(this.currentItem[imgKey]),
            type: "image/jpeg",
          };
          imagesArray.push(imagesItem);
        }
      }
      return imagesArray;
    },
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
    showProductDetails(item) {
      console.log("click");
      this.currentItem = item;
      this.dialogDetailedItem = true;
    },
    showOrderForm(item) {
      this.currentItem = item;
      this.dialogOrderProduct = true;
    },
    initOrderForm(item) {
      this.dialogDetailedItem = false;
      this.showOrderForm(item);
    },
    showLimited(item, itemIndex) {
      if (item.id && itemIndex < this.itemsToShow) {
        return true;
      }
    },
    showMoreItems() {
      if (this.itemsShown >= this.itemsCount) {
        this.itemsToShow -= 4;
        let lastElem = document.getElementById(
          this.section.items[this.itemsToShow - 1].id
        );
        //this.$vuetify.goTo(lastElem, { duration: 500 });
      } else {
        this.itemsToShow += 4;
      }
    },
    saveItemDetails() {
      this.$store.dispatch("pages/savePage");
      this.dialogDetailedItem = false;
    },
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
  },
};
</script>
<style scoped>
.products-appear-enter-active,
.products-appear-leave-active {
  transition: max-height 1s;
  max-height: 40rem;
  overflow: hidden;
}
.products-appear-leave-to {
  margin-bottom: 0;
}
.products-appear-enter,
.products-appear-leave-to {
  max-height: 0;
}
.products >>> .v-skeleton-loader__avatar,
.products >>> .v-skeleton-loader__button,
.products >>> .v-skeleton-loader__chip,
.products >>> .v-skeleton-loader__divider,
.products >>> .v-skeleton-loader__heading,
.products >>> .v-skeleton-loader__image,
.products >>> .v-skeleton-loader__text {
  background-color: var(--separator-color);
}
.products a {
  color: inherit;
}
</style>
