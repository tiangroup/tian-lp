<template>
  <div :class="{ 'position-relative': _isEdit }" :id="section.id">
    <buttons-section v-if="_isEdit" :section="section"></buttons-section>

    <div
      class="reviews custom-v-spacing-2 custom-h-spacing bg-secondary"
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
        <client-only>
          <v-gallery
            :images="reviewImages"
            :index="index"
            @close="index = null"
            v-if="!isEdit && section.items && view === 'view2'"
            :id="'gallery' + section.id"
            :options="{
              closeOnSlideClick: true
            }"
          ></v-gallery>
        </client-only>
        <div
          class="reviews__list mx-ncell"
          :class="computedSectionClass"
          v-if="section.items"
        >
          <div :class="{ fullwidth: view === 'view2' }">
            <client-only>
              <slick
                :ref="slickRef"
                :options="updatedSlickOptions"
                @init="handleInit"
                :key="slickKey"
              >
                <reviews-item
                  v-for="(item, itemIndex) in section.items.filter((i) => i.id)"
                  @change-desc="updateReviewDesc"
                  @change-date="updateReviewDate"
                  @show-review="showReview"
                  @show-gallery="showGallery(itemIndex)"
                  :key="item.id"
                  :item="item"
                  :sectionId="section.id"
                  :isEdit="isEdit"
                  :view="view"
                ></reviews-item>
                <div
                  class="reviews__item-wrap cell"
                  v-if="isEdit && (!section.items || !section.items.length)"
                >
                  <div class="reviews__item">
                    <div class="item__add-button">
                      <buttons-item-add :sectionId="section.id" />
                    </div>
                    <div class="reviews__image-wrap" v-if="view === 'view2'">
                      <div class="reviews__image no-image"></div>
                    </div>
                    <div class="reviews__body">
                      <v-skeleton-loader
                        boilerplate
                        type="article"
                      ></v-skeleton-loader>
                    </div>
                  </div>
                </div>
              </slick>
              <template slot="placeholder">
                <div class="cells fx-nw overflow-hidden">
                  <reviews-item
                    class="cell-12"
                    :class="{ 'cell-lg-6': view === 'view1' }"
                    v-for="item in section.items.filter((i) => i.id)"
                    :key="item.id"
                    :item="item"
                    :sectionId="section.id"
                    :isEdit="false"
                    :view="view"
                  ></reviews-item>
                </div>
              </template>
            </client-only>
          </div>
        </div>
        <v-dialog v-model="dialogReviewDesc" max-width="30rem" v-if="isEdit">
          <v-card>
            <v-card-title class="mb-10">
              Отредактируйте текст отзыва
              <v-spacer></v-spacer>
              <v-btn icon @click="dialogReviewDesc = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <editor-text
                data-placeholder="Введите текст отзыва"
                :text="currentReview.text"
                :sectionId="section.id"
                field="text"
                :itemId="currentReview.id"
                :key="currentReview.id"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                depressed
                text
                color="gray"
                @click="dialogReviewDesc = false"
                >Отменить</v-btn
              >
              <v-btn depressed color="green" dark @click="saveReviewDesc"
                >Сохранить</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogReviewDate" width="290px">
          <v-date-picker v-model="currentReview.date" scrollable>
            <v-spacer></v-spacer>
            <v-btn depressed text color="gray" @click="dialogReviewDate = false"
              >Отменить</v-btn
            >
            <v-btn
              depressed
              text
              color="primary"
              @click="saveReviewDate(currentReview.date)"
              >Сохранить</v-btn
            >
          </v-date-picker>
        </v-dialog>

        <v-dialog
          v-model="dialogShowReview"
          max-width="30rem"
          v-if="isCenter"
          scrollable
        >
          <div class="der-popup">
            <div class="der-popup__close">
              <button
                class="button button-icon button-close"
                @click="dialogShowReview = false"
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
            <div class="der-popup__body">
              <div class="popup-reviews">
                <div class="reviews__body--full scrollable__base">
                  <div class="reviews__person scrollable__head">
                    <div class="reviews__person__name">
                      {{ currentReview.name }}
                    </div>
                    <div class="reviews__person__position">
                      {{ currentReview.position }}
                    </div>
                  </div>
                  <div class="scrollable__block">
                    <div class="reviews__text">{{ currentReview.text }}</div>
                    <div class="reviews__info">
                      <div class="reviews__date">{{ currentReview.date }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <v-card>
            <v-card-title> lalalal </v-card-title>
            <v-card-text class="der-popup__body">
              <div class="popup-reviews">
                <div class="reviews__body--full">
                  <div class="reviews__person">
                    <div class="reviews__person__name">
                      {{ currentReview.name }}
                    </div>
                    <div class="reviews__person__position">
                      {{ currentReview.position }}
                    </div>
                  </div>
                  <div class="">
                    <div class="reviews__text">{{ currentReview.text }}</div>
                    <div class="reviews__info">
                      <div class="reviews__date">{{ currentReview.date }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card> -->
        </v-dialog>
        <v-navigation-drawer
          app
          temporary
          width="30rem"
          :right="settings.popup == 'right'"
          v-model="dialogShowReview"
          v-if="!isCenter"
        >
          <div class="der-popup">
            <div class="der-popup__close">
              <button
                class="button button-icon button-close"
                @click="dialogShowReview = false"
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
            <div class="der-popup__body">
              <div class="popup-reviews">
                <div class="reviews__body--full">
                  <div class="reviews__person">
                    <div class="reviews__person__name">
                      {{ currentReview.name }}
                    </div>
                    <div class="reviews__person__position">
                      {{ currentReview.position }}
                    </div>
                  </div>
                  <div class="reviews__text">{{ currentReview.text }}</div>
                  <div class="reviews__info">
                    <div class="reviews__date">{{ currentReview.date }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-navigation-drawer>
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
  data: () => ({
    currentReview: {
      id: null,
      name: "",
      position: "",
      date: ""
    },
    dialogShowReview: false,
    dialogReviewDate: false,
    dialogReviewDesc: false,
    index: null,
    modalReviewDate: false,
    slickOptions: {
      arrows: true,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      infinite: false,
      prevArrow:
        '<button type="button" class="slick-arrow slick-prev"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L2 13.9706L15.966 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
      nextArrow:
        '<button type="button" class="slick-arrow slick-next"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L15 13.9706L1.03398 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
      responsive: [
        {
          breakpoint: 1280,
          settings: {
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
    view() {
      return this.section.settings.view;
    },
    isCenter() {
      return this.settings.popup != "right" && this.settings.popup != "left";
    },
    updatedSlickOptions() {
      const slidesQty = this.view === "view1" ? 2 : 1;
      return Object.assign(this.slickOptions, {
        slidesToShow: slidesQty,
        infinite: !this.isEdit,
        draggable: !this.isEdit
      });
    },
    reviewImages() {
      var imagesArray = [];
      for (let n = 0; n < this.itemsCount; n++) {
        var pic = this.section.items[n];
        var imagesItem = {
          title: "Отзыв " + pic.name,
          href: this.$site_img(this.pic.img, "resize_xl"),
          type: "image/jpeg"
        };
        imagesArray.push(imagesItem);
      }
      return imagesArray;
    },
    computedSectionClass() {
      return this.view === "view1"
        ? "reviews__list--style1"
        : "reviews__list--style2";
    },
    slickRef() {
      return "slick" + this.section.id;
    },
    slickKey() {
      let key = "" + this.isEdit + this.view;
      if (this.itemsCount) {
        for (var i = 0; i < this.itemsCount; i++) {
          key += this.section.items[i].id;
        }
      }
      //console.log("reviews-slick key " + key);
      return key;
    },
    itemsCount() {
      return this.section.items.length;
    },
    computedRealSlides() {
      return document
        .getElementById(this.section.id)
        .querySelectorAll(".slick-slide:not(.slick-cloned)");
    }
  },
  methods: {
    ...mapMutations({
      setItemField: "pages/SET_ITEM_FIELD"
    }),
    updateReviewDate(item) {
      if (this.isEdit) {
        this.currentReview.id = item.id;
        this.currentReview.date = item.date;
        this.dialogReviewDate = true;
      }
    },
    saveReviewDate: function (date) {
      this.saveReviewField("date", date);
      this.dialogReviewDate = false;
    },
    updateReviewDesc(item) {
      if (this.isEdit) {
        this.currentReview.id = item.id;
        this.currentReview.text = item.text;
        this.dialogReviewDesc = true;
      }
    },
    saveReviewDesc() {
      this.dialogReviewDesc = false;
      this.$store.dispatch("pages/savePage");
    },
    saveReviewField(field, value) {
      this.setItemField({
        sectionId: this.section.id,
        itemId: this.currentReview.id,
        items: "items",
        field: field,
        value: value
      });
      this.$store.dispatch("pages/savePage");
    },
    showReview(item) {
      this.currentReview.id = item.id;
      this.currentReview.name = item.name;
      this.currentReview.position = item.position;
      this.currentReview.text = item.text;
      this.dialogShowReview = true;
    },
    showGallery: function (itemIndex) {
      if (!this.isEdit) {
        this.index = itemIndex;
      }
    },
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

        if (e.target.closest(".reviews__image-wrap")) {
          this.computedRealSlides[slideId]
            .querySelector(".reviews__image-wrap")
            .click();
        }

        if (e.target.classList.contains("reviews__readmore")) {
          this.computedRealSlides[slideId]
            .querySelector(".reviews__readmore")
            .click();
        }
      }
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
.reviews >>> .v-skeleton-loader__heading,
.reviews >>> .v-skeleton-loader__text {
  background-color: var(--separator-color);
}
.v-navigation-drawer {
  z-index: 130;
}
</style>
