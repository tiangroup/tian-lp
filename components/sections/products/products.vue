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
                :section="section"
                :isEdit="isEdit"
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
                :section="section"
                :isEdit="isEdit"
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
                  :section="section"
                  :isEdit="false"
                ></products-item>
              </div>
            </template>
          </client-only>
        </div>
      </div>
    </div>
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
            slidesToShow: 2,
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
      isSectionEdit: "isSectionEdit"
    }),
    isEdit() {
      return this._isEdit && this.isSectionEdit(this.section);
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
      } else {
        this.itemsToShow += 4;
      }
      document.activeElement.blur();
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
</style>
