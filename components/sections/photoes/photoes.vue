<template>
  <div :class="{ 'position-relative': _isEdit }" :id="section.id">
    <buttons-section v-if="_isEdit" :section="section" />
    <div
      class="gallery custom-v-spacing bg-primary"
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
        <div class="gallery__list" v-if="section.items">
          <client-only>
            <v-gallery
              :images="images"
              :index="index"
              @close="index = null"
              v-if="!isEdit"
              :id="'gallery' + section.id"
              :options="{
                closeOnSlideClick: true
              }"
            ></v-gallery>
          </client-only>
          <div class="fullwidth">
            <client-only>
              <slick
                :ref="slickRef"
                :options="updatedSlickOptions"
                @init="handleInit"
                :key="slickKey"
              >
                <div
                  class="gallery__item"
                  :class="{ 'position-relative': isEdit }"
                  v-for="(item, itemIndex) in section.items.filter((i) => i.id)"
                  :key="item.id"
                >
                  <buttons-item
                    v-if="isEdit"
                    :itemId="item.id"
                    :sectionId="section.id"
                  />
                  <div
                    class="gallery__link"
                    :class="{ 'pic-enlarge': !isEdit }"
                    @click="showGallery(itemIndex)"
                  >
                    <image-item
                      divClass="gallery__image"
                      :img="item.img"
                      :itemId="item.id"
                      :sectionId="section.id"
                      imageStyle="rect_lg"
                    />
                    <div class="gallery__text" v-if="isEdit">
                      <editor-text
                        data-placeholder="Краткое описание фотографии"
                        :text="item.title || ''"
                        :sectionId="section.id"
                        field="title"
                        :itemId="item.id"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="gallery__item"
                  v-if="isEdit && (!section.items || !section.items.length)"
                >
                  <div class="gallery__link">
                    <div class="gallery__image no-image"></div>
                    <div class="item__add-button">
                      <buttons-item-add :sectionId="section.id" />
                    </div>
                  </div>
                </div>
              </slick>
              <template slot="placeholder">
                <div class="cells fx-nw overflow-hidden">
                  <div
                    class="gallery__link cell-12 cell-sm-6 cell-lg-3"
                    v-for="item in section.items.filter((i) => i.id)"
                    :key="item.id"
                    :item="item"
                    :sectionId="section.id"
                    :isEdit="false"
                  >
                    <img :src="$site_img(item.img, 'rect_lg')" />
                  </div>
                </div>
              </template>
            </client-only>
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
  data: () => ({
    index: null,
    slickOptions: {
      arrows: true,
      dots: true,
      slidesToShow: 2,
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
      isSectionEdit: "isSectionEdit"
    }),
    isEdit() {
      return this._isEdit && this.isSectionEdit(this.section);
    },
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    updatedSlickOptions() {
      let slidesStart = 0;
      let slickCenter = false;
      if (this.itemsCount > 2) {
        slidesStart = 1;
        slickCenter = true;
      }
      let slidesQty = this.isEdit && this.itemsCount < 3 ? 3 : 2;
      return Object.assign(this.slickOptions, {
        // initialSlide: slidesStart,
        // slidesToShow: slidesQty,
        // centerMode: slickCenter,
        infinite: !this.isEdit,
        draggable: !this.isEdit
      });
    },
    images() {
      var imagesArray = [];
      for (let n = 0; n < this.itemsCount; n++) {
        var pic = this.section.items[n];
        var imagesItem = {
          title: pic.title,
          href: this.$site_img(pic.img),
          type: "image/jpeg"
        };
        imagesArray.push(imagesItem);
      }
      return imagesArray;
    },
    itemsCount() {
      return this.section.items.length;
    },
    slickRef() {
      return "slick" + this.section.id;
    },
    slickKey() {
      let key = "" + this.isEdit;
      if (this.itemsCount) {
        for (var i = 0; i < this.itemsCount; i++) {
          key += this.section.items[i].id;
        }
      }
      //console.log("photoes-slick key " + key);
      return key;
    },
    computedRealSlides() {
      return document
        .getElementById(this.section.id)
        .querySelectorAll(".slick-slide:not(.slick-cloned)").length;
    }
  },
  methods: {
    showGallery: function (itemIndex) {
      if (this.isEdit) {
        return;
      }
      this.index = itemIndex;
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
          slideId = slideIndex % this.computedRealSlides;
        } else if (slideIndex < 0) {
          slideId = this.computedRealSlides + slideIndex;
        }
        this.showGallery(slideId);
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
