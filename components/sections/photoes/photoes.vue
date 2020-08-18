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
            <slick ref="slick" :options="updatedSlickOptions">
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
                      field="name"
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
    slickOptions: {
      arrows: true,
      dots: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "18.3333%",
      initialSlide: 1,
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
            initialSlide: 0,
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
            initialSlide: 0,
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
      return Object.assign(this.slickOptions, {
        infinite: !this.isEdit,
        draggable: !this.isEdit,
      });
    },
    images() {
      var imagesArray = [];
      for (let n = 0; n < this.section.items.length; n++) {
        let pic = this.section.items[n];
        let imagesItem = {
          title: pic.title,
          href: "https://img.youtube.com/vi/EuDzvfmuPhQ/maxresdefault.jpg",
          type: "image/jpeg",
        };
        imagesArray.push(imagesItem);
      }
      return imagesArray;
    },
  },
  methods: {
    onItemsChange(event) {
      console.log(event);
      this.restartSlick();
    },
    restartSlick() {
      this.isSlick = false;
      const _this = this;
      setTimeout(function () {
        _this.isSlick = true;
      }, 100);
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
  },
  watch: {
    isEdit: function () {
      this.updatedSlickOptions.infinite = !this.isEdit;
      this.updatedSlickOptions.draggable = !this.isEdit;
      this.restartSlick();
    },
  },
};
</script>