<template>
  <div :class="{ 'position-relative': isEdit }" :id="section.id">
    <buttons-section v-if="isEdit" :section="section" />
    <div
      class="products custom-v-spacing-2 custom-h-spacing bg-secondary"
      :class="{ mDark: section.settings.background === 'dark' }"
    >
      <div class="landing__container">
        <h2 v-if="isEdit">
          <editor :text="section.title || ''" :sectionId="section.id" field="title" />
        </h2>
        <h2 v-else>{{ section.title }}</h2>
        <div v-if="section.settings.view === 'view1'">
          <div class="products__list cells" v-if="section.items && isEdit">
            <products-item
              class="cell-12 cell-sm-6 cell-lg-4 cell-xl-3"
              v-for="item in section.items.filter(i => i.id)"
              :key="item.id"
              :item="item"
              :sectionId="section.id"
              :isEdit="isEdit"
              @show-order-form="showOrderForm(item)"
              @update-description="updateItemDescription(item)"
            ></products-item>
            <div
              class="products__item-wrap cell cell-12 cell-sm-6 cell-lg-4 cell-xl-3"
              v-if="!section.items || !itemsCount"
            >
              <div class="item__add-button">
                <buttons-item-add :sectionId="section.id" />
              </div>
              <v-skeleton-loader
                boilerplate
                type="image, list-item, list-item-three-line, card-heading"
              ></v-skeleton-loader>
            </div>
          </div>
          <div v-else-if="section.items">
            <transition-group tag="div" name="products-appear" class="products__list cells">
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
            <div class="cells align-items-center justify-content-center justify-content-sm-between">
              <div
                class="cell cell-auto products__count"
              >Товаров {{ itemsShown }} из {{ itemsCount }}</div>
              <div class="cell cell-auto products__loadmore">
                <button
                  class="button button-primary button-more"
                  :class="{'button-more--opened': (itemsShown >= itemsCount)}"
                  @click="showMoreItems"
                >
                  <div class="button__body">{{ loadmoreText }}</div>
                </button>
              </div>
              <div class="cell cell-auto display-none display-sm-block grow-sm-1"></div>
            </div>
          </div>
        </div>
        <div class="products__list mx-ncell" v-if="view === 'view2'">
          <no-ssr>
            <slick
              :ref="slickRef"
              :options="updatedSlickOptions"
              @init="handleInit"
              :key="slickKey"
            >
              <products-item
                v-for="item in section.items.filter(i => i.id)"
                :key="item.id"
                :item="item"
                :sectionId="section.id"
                :isEdit="isEdit"
                @show-details="showProductDetails(item)"
                @show-order-form="showOrderForm(item)"
                @update-description="updateItemDescription(item)"
              ></products-item>
              <div
                class="products__item-wrap cell cell-12 cell-sm-6 cell-lg-4 cell-xl-3"
                v-if="!section.items || !itemsCount"
              >
                <div class="item__add-button">
                  <buttons-item-add :sectionId="section.id" />
                </div>
                <v-skeleton-loader
                  boilerplate
                  type="image, list-item, list-item-three-line, card-heading"
                ></v-skeleton-loader>
              </div>
            </slick>
            <template slot="placeholder">
              <div class="cells fx-nw overflow-hidden">
                <products-item
                  class="cell-12 cell-sm-6 cell-lg-4 cell-xl-3"
                  v-for="item in section.items.filter(i => i.id)"
                  :key="item.id"
                  :item="item"
                  :sectionId="section.id"
                  :isEdit="false"
                ></products-item>
              </div>
            </template>
          </no-ssr>
        </div>

        <form-dialog :section="section" field="order_form" v-model="dialogOrderProduct">
          <div class="good-summary">
            <div class="good-summary__row">
              <div class="good-summary__image" v-if="currentItem.img">
                <img :src="$images.src(currentItem.img)" />
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

        <v-dialog v-model="dialogDetailedItem" max-width="40rem">
          <div class="der-popup">
            <div class="der-popup__body">
              <div class="der-popup__close">
                <button class="button button-icon button-close" @click="dialogDetailedItem = false">
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
                <div class="good">
                  <div class="good__details">
                    <div class="good__title">{{ currentItem.title }}</div>
                    <!-- <div class="good__images illustrations">
                <div class="illustrations__item illustrations__item--main">
                  <div class="illustrations__image">
                    <img src="../assets/content-images/products/p-1.jpg">
                  </div>
                </div>
                <div class="illustrations__row">
                  <div class="illustrations__item">
                    <a href="../assets/content-images/products/p-1.jpg" class="illustrations__switch illustrations__switch--active">
                      <div class="illustrations__image">
                        <img src="../assets/content-images/products/p-1-1.jpg">
                      </div>
                    </a>
                  </div>
                  <div class="illustrations__item">
                    <a href="../assets/content-images/products/p-1-2.jpg" class="illustrations__switch">
                      <div class="illustrations__image">
                        <img src="../assets/content-images/products/p-1-2-1.jpg">
                      </div>
                    </a>
                  </div>
                </div>
                    </div>-->
                    <div class="good__chars" v-html="currentItem.tech_chars"></div>
                    <div class="good__description" v-if="currentItem.description">
                      <div class="good__description__title">Описание</div>
                      <div class="good__description__body" v-html="currentItem.description"></div>
                    </div>
                  </div>
                  <div class="good__cta">
                    <div class="cells justify-content-between align-items-center">
                      <div class="cell cell-auto">
                        <div class="good__prices">
                          <div class="good__prices__current">{{ currentItem.price }}</div>
                          <div class="good__prices__old">{{ currentItem.old_price }}</div>
                        </div>
                      </div>
                      <div class="cell cell-auto">
                        <div class="good__action">
                          <a
                            href
                            class="button button-primary"
                            @click.prevent="initOrderForm(currentItem)"
                          >Купить</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-dialog>

        <v-dialog v-model="dialogUpdateDescription" max-width="40rem" v-if="isEdit">
          <v-card>
            <v-card-title class="mb-10">
              Отредактируйте описание товара
              <v-spacer></v-spacer>
              <v-btn icon @click="dialogUpdateDescription = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <div>
                <b>Краткое описание товара:</b>
                <small>(появится в блоке "Каталог")</small>:
              </div>
              <editor
                data-placeholder="Краткое описание товара"
                :text="currentItem.short_description || ''"
                :sectionId="section.id"
                field="short_description"
                :itemId="currentItem.id"
                :key="'sh' + currentItem.id"
              />
              <div class="mt-10">
                <b>Технические характеристики товара</b>
                <small>
                  (краткая инфорация о товаре, которая появится в карточке
                  товара)
                </small>:
              </div>
              <editor
                data-placeholder="Габариты: 220 х 100 х 35 мм"
                :text="currentItem.tech_chars || ''"
                :sectionId="section.id"
                field="tech_chars"
                :itemId="currentItem.id"
                editContent="html"
                :key="'ch' + currentItem.id"
              />
              <div class="mt-10">
                <b>Полное описание товара</b>
                <small>(появится в карточке товара)</small>:
              </div>
              <editor
                data-placeholder="Полное описание товара"
                :text="currentItem.description || ''"
                :sectionId="section.id"
                field="description"
                :itemId="currentItem.id"
                editContent="html"
                :key="'d' + currentItem.id"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed text color="gray" @click="dialogUpdateDescription = false">Отменить</v-btn>
              <v-btn depressed color="green" dark @click="saveDescription()">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
    dialogUpdateDescription: false,
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
      isEdit: "isEdit",
    }),
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
  },
  methods: {
    handleInit(event, slick) {
      slick.goTo(this.currentSlide, true);
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
      if (!this.isEdit) {
        this.currentItem = item;
        this.dialogDetailedItem = true;
      }
    },
    showOrderForm(item) {
      this.currentItem = item;
      this.dialogOrderProduct = true;
    },
    initOrderForm(item) {
      this.dialogDetailedItem = false;
      this.showOrderForm(item);
    },
    updateItemDescription(item) {
      if (this.isEdit) {
        this.currentItem = item;
        this.dialogUpdateDescription = true;
      }
    },
    saveDescription() {
      this.dialogUpdateDescription = false;
      this.$store.dispatch("pages/savePage");
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
  },
  beforeUpdate: function () {
    if (this.$refs[this.slickRef]) {
      this.currentSlide = this.$refs[this.slickRef].currentSlide;
    }
  },
  beforeDestroy: function () {
    if (this.$refs[this.slickRef]) {
      if (document.getElementById(this.section.id)) {
        document
          .getElementById(this.section.id)
          .removeEventListener("click", this.handleClonedSlides);
      }
    }
  },
};
</script>
<style>
.products-appear-enter-active,
.products-appear-leave-active {
  transition: transform 1s;
}
.products-appear-enter,
.products-appear-leave-to {
  transform: translateY(100px);
}
</style>