<template>
  <div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section" />
    <div
      class="gallery custom-v-spacing bg-primary"
      :class="{ mDark: section.settings.background === 'dark' }"
    >
      <div class="landing__container">
        <h2 v-if="isEdit">
          <editor :text="section.title || ''" :sectionId="section.id" field="title" />
        </h2>
        <h2 v-else>{{ section.title }}</h2>
        <div class="gallery__list" v-if="section.items && isSlick">
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
          <div class="fullwidth">
            <slick :ref="slickRef" :options="updatedSlickOptions" @init="handleInit">
              <div
                class="gallery__item"
                :class="{'position-relative': isEdit}"
                v-for="(item, itemIndex) in section.items.filter(i => i.id)"
                :key="item.id"
              >
                <buttons-item
                  v-if="isEdit"
                  :itemId="item.id"
                  :sectionId="section.id"
                  @onAction="onItemsChange"
                  @onItemDelete="onItemDelete"
                />
                <div
                  class="gallery__link"
                  :class="{'pic-enlarge': !isEdit}"
                  @click="showGallery(itemIndex)"
                >
                  <image-item
                    divClass="gallery__image"
                    :img="item.img"
                    :itemId="item.id"
                    :sectionId="section.id"
                  />
                  <div class="gallery__text" v-if="isEdit">
                    <editor
                      data-placeholder="Краткое описание фотографии"
                      :text="item.title || ''"
                      :sectionId="section.id"
                      field="title"
                      :itemId="item.id"
                    />
                  </div>
                </div>
              </div>
              <div class="gallery__item" v-if="isEdit && (!section.items || !section.items.length)">
                <buttons-item-add :sectionId="section.id" />
              </div>
            </slick>
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
    section: Object,
  },
  data: () => ({
    index: null,
    isSlick: true,
    itemsQty: null,
    slickOptions: {
      arrows: true,
      dots: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "18.3333%",
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
            arrows: false,
            centerMode: false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            centerMode: false,
            centerPadding: 0,
          },
        },
      ],
    },
  }),
  computed: {
    ...mapGetters({
      isEdit: "isEdit",
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    updatedSlickOptions() {
      const slidesQty = this.isEdit ? 2 : 2;
      let slidesStart = 0;
      if (this.section.items.length > 3) {
        slidesStart = 1;
      }
      return Object.assign(this.slickOptions, {
        initialSlide: slidesStart,
        slidesToShow: slidesQty,
        //centerMode: !this.isEdit,
        infinite: !this.isEdit,
        draggable: !this.isEdit,
      });
    },
    images() {
      var imagesArray = [];
      for (let n = 0; n < this.section.items.length; n++) {
        var pic = this.section.items[n];
        var imagesItem = {
          title: pic.title,
          href: this.$images.src(pic.img),
          type: "image/jpeg",
        };
        imagesArray.push(imagesItem);
      }
      return imagesArray;
    },
    slickRef() {
      return "slick" + this.section.id;
    },
  },
  methods: {
    onItemsChange(event) {
      this.itemsQty = this.section.items.length;
      this.restartSlick();
    },
    async restartSlick() {
      let currSlideIndex = this.$refs[this.slickRef].currentSlide();
      this.isSlick = false;
      const _this = this;
      let enableSlick = new Promise((resolve) => {
        setTimeout(() => {
          resolve((_this.isSlick = true));
        }, 200);
      });
      await enableSlick;
      this.$refs[this.slickRef].goTo(currSlideIndex, true);
    },
    async onItemDelete(payload) {
      const item = this.section.items.find((i) => i.id == payload.itemId);
      const formData = new FormData();
      formData.append("image", item.img);
      await this.$axios.post("/api/upload/image-remove", formData);
    },
    showGallery(itemIndex) {
      if (this.isEdit) {
        return;
      }
      this.index = itemIndex;
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
          slideItem.addEventListener("click", function () {
            _this.showGallery(slideId);
          });
        }
      }
    },
  },
  mounted: function () {
    this.itemsQty = this.section.items.length;
  },
  watch: {
    isEdit: function () {
      this.restartSlick();
    },
    section: function () {
      if (
        this.isEdit &&
        this.itemsQty === 0 &&
        this.section.items.length === 1
      ) {
        this.restartSlick();
      }
    },
  },
};
</script>