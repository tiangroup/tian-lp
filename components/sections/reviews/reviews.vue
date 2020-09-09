<template>
  <div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section"></buttons-section>

    <div
      class="reviews custom-v-spacing-2 custom-h-spacing bg-secondary"
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
        <div
          class="reviews__list mx-ncell"
          :class="computedSectionClass"
          v-if="section.items"
        >
          <div :class="{ fullwidth: view === 'view2' }">
            <slick
              ref="slick"
              :options="updatedSlickOptions"
              v-if="isSlick"
              @init="handleInit"
            >
              <reviews-item
                v-for="(item, itemIndex) in section.items.filter(i => i.id)"
                @item-update="onItemsChange"
                @change-desc="
                  updateReviewDesc({
                    id: item.id,
                    text: item.text
                  })
                "
                @change-date="
                  updateReviewDate({
                    id: item.id,
                    date: item.date
                  })
                "
                @show-review="showReview(item)"
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
                <buttons-item-add :sectionId="section.id" />
              </div>
            </slick>
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
              <editor
                data-placeholder="Введите текст отзыва"
                :text="currentReview.text || ''"
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

        <v-dialog v-model="dialogShowReview" max-width="30rem">
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
        </v-dialog>
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
    itemsQty: 0,
    isSlick: true,
    modalReviewDate: false,
    slickOptions: {
      arrows: true,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: false,
      centerPadding: 0,
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
            arrows: false,
            centerMode: false,
            centerPadding: 0
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            centerMode: false,
            centerPadding: 0
          }
        }
      ]
    }
  }),
  computed: {
    ...mapGetters({
      isEdit: "isEdit"
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    view() {
      return this.section.settings.view;
    },
    updatedSlickOptions() {
      const slidesQty = this.view === "view1" ? 2 : 1;
      var slickCenterMode;
      var slickCenterPadding;
      if (this.view === "view2") {
        slickCenterMode = true;
        slickCenterPadding = "18.333%";
      } else {
        slickCenterPadding = 0;
        slickCenterMode = false;
      }
      return Object.assign(this.slickOptions, {
        slidesToShow: slidesQty,
        centerMode: slickCenterMode,
        centerPadding: slickCenterPadding,
        infinite: !this.isEdit,
        draggable: !this.isEdit
      });
    },
    reviewImages() {
      var imagesArray = [];
      for (let n = 0; n < this.section.items.length; n++) {
        var pic = this.section.items[n];
        var imagesItem = {
          title: "Отзыв " + pic.name,
          href: this.$images.src(pic.img),
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
    }
  },
  methods: {
    ...mapMutations({
      setItemField: "pages/SET_ITEM_FIELD"
    }),
    onItemsChange(event) {
      this.restartSlick();
      this.itemsQty = this.section.items.length;
    },
    restartSlick() {
      this.isSlick = false;
      const _this = this;
      setTimeout(function() {
        _this.isSlick = true;
      }, 200);
    },
    updateReviewDate(item) {
      if (this.isEdit) {
        this.currentReview.id = item.id;
        this.currentReview.date = item.date;
        this.dialogReviewDate = true;
      }
    },
    saveReviewDate(date) {
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
    showGallery(itemIndex) {
      if (!this.isEdit) {
        this.index = itemIndex;
      }
    },
    handleInit(event, slick) {
      if (!this.isEdit) {
        const _this = this;
        const [slickTrack] = slick.$slideTrack;
        let slidesCloned = slickTrack.querySelectorAll(".slick-cloned");
        let slidesRealLength = slickTrack.querySelectorAll(
          ".slick-slide:not(.slick-cloned)"
        ).length;
        for (let m = 0; m < slidesCloned.length; m++) {
          let slideItem = slidesCloned[m];
          let slideIndex = Number(slideItem.getAttribute("data-slick-index"));
          let slideId = null;
          if (slideIndex > 0) {
            slideId = slideIndex % slidesRealLength;
          } else {
            slideId = slidesRealLength + slideIndex;
          }
          let slideImg = slideItem.querySelector(".reviews__image-wrap");
          if (slideImg) {
            slideImg.addEventListener("click", function() {
              _this.showGallery(slideId);
            });
          }
          let slideDetailLink = slideItem.querySelector(".reviews__readmore");
          if (slideDetailLink) {
            slideDetailLink.addEventListener("click", function() {
              _this.showReview(_this.section.items[slideId]);
            });
          }
        }
      }
    }
  },
  mounted() {
    this.itemsQty = this.section.items.length || 0;
  },
  watch: {
    isEdit: function() {
      this.restartSlick();
    },
    view: function() {
      this.restartSlick();
    },
    section: function() {
      if (
        this.isEdit &&
        this.itemsQty === 0 &&
        this.section.items.length === 1
      ) {
        this.restartSlick();
      }
    }
  }
};
</script>
