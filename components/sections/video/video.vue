<template>
  <div :class="{ 'position-relative': _isEdit }" :id="section.id">
    <buttons-section v-if="_isEdit" :section="section" />
    <div
      class="video custom-v-spacing-2 bg-secondary"
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
        <div class="video__intro">
          <editor
            :text="section.description || ''"
            :sectionId="section.id"
            field="description"
            v-if="isEdit"
            editContent="html"
          />
          <div v-else v-html="section.description"></div>
        </div>
        <div v-if="section.items">
          <client-only>
            <v-gallery
              v-if="!isEdit"
              :images="videos"
              :index="index"
              :options="{
                youTubeVideoIdProperty: 'youtube',
                youTubePlayerVars: undefined,
                youTubeClickToPlay: false
              }"
              @close="index = null"
              :id="'gallery' + section.id"
            ></v-gallery>
          </client-only>
          <div class="mx-ncell">
            <client-only>
              <slick
                :ref="slickRef"
                :options="updatedSlickOptions"
                class="video__list"
                @init="handleInit"
                :key="slickKey"
              >
                <video-item
                  v-for="(item, itemIndex) in section.items.filter(i => i.id)"
                  :key="item.id"
                  :item="item"
                  :sectionId="section.id"
                  :isEdit="isEdit"
                  @gallery-call="showGallery(itemIndex)"
                  @change-link="
                    itemVideoInput({
                      sectionId: section.id,
                      itemId: item.id,
                      field: 'link',
                      value: item.link
                    })
                  "
                ></video-item>
                <div
                  class="video__item-wrap cell"
                  v-if="isEdit && (!section.items || !section.items.length)"
                >
                  <div class="video__container no-image"></div>
                  <div class="video__title">
                    <v-skeleton-loader
                      boilerplate
                      type="sentences"
                      width="100%"
                    ></v-skeleton-loader>
                  </div>
                </div>
              </slick>
              <template slot="placeholder">
                <div class="cells fx-nw overflow-hidden">
                  <video-item
                    class="cell-12 cell-sm-6"
                    v-for="item in section.items.filter(i => i.id)"
                    :key="item.id"
                    :item="item"
                    :sectionId="section.id"
                    :isEdit="false"
                  ></video-item>
                </div>
              </template>
            </client-only>
            <v-dialog v-model="videoUrlDialog" max-width="33rem" v-if="isEdit">
              <v-card>
                <v-card-title class="mb-10">
                  Ссылка на Youtube-видео
                  <v-spacer></v-spacer>
                  <v-btn icon @click="videoUrlDialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    label="Ссылка"
                    outlined
                    v-model="userUrl"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    depressed
                    color="gray"
                    text
                    @click="videoUrlDialog = false"
                    >Отменить</v-btn
                  >
                  <v-btn
                    depressed
                    color="green"
                    dark
                    @click="setVideoUrl(userUrl)"
                    >Сохранить</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import VideoItem from "./VideoItem";
export default {
  props: {
    section: Object
  },
  components: {
    VideoItem
  },
  data: () => ({
    currentSlide: 0,
    currentVideo: {},
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
    },
    videoUrlDialog: false,
    userUrl: ""
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
    videos() {
      var videosArray = [];
      for (let n = 0; n < this.section.items.length; n++) {
        let vid = this.section.items[n];
        let videoItem = {
          title: vid.title,
          href: vid.link,
          type: "text/html",
          youtube: this.videoId(vid.link)
        };
        videosArray.push(videoItem);
      }
      return videosArray;
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
      //console.log("video-slick key " + key);
      return key;
    },
    itemsCount() {
      return this.section.items.length;
    },
    computedRealSlides() {
      return document
        .getElementById(this.section.id)
        .querySelectorAll(".slick-slide:not(.slick-cloned)").length;
    }
  },
  methods: {
    ...mapMutations({
      setItemField: "pages/SET_ITEM_FIELD"
    }),
    itemVideoInput(payload) {
      this.currentVideo = payload;
      this.userUrl = payload.value;
      this.videoUrlDialog = true;
    },
    setVideoUrl(userUrl) {
      this.setItemField({
        sectionId: this.currentVideo.sectionId,
        itemId: this.currentVideo.itemId,
        items: "items",
        field: this.currentVideo.field,
        value: userUrl
      });
      this.$store.dispatch("pages/savePage");
      this.videoUrlDialog = false;
    },
    showGallery(itemIndex) {
      if (!this.isEdit) {
        this.index = itemIndex;
      }
    },
    videoId(videoUrl) {
      if (videoUrl) {
        const youtubeRegex = /^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/;
        const youtubeId = videoUrl.match(youtubeRegex);
        return youtubeId[2];
      }
    },
    handleInit(event, slick) {
      if (this.currentSlide) {
        slick.goTo(this.currentSlide, true);
      }
      if (!this.isEdit) {
        document
          .getElementById(this.section.id)
          .addEventListener("click", this.showGalleryOnClones);
      }
    },
    showGalleryOnClones(e) {
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
  beforeUpdate: function() {
    if (this.$refs[this.slickRef]) {
      this.currentSlide = this.$refs[this.slickRef].currentSlide();
    }
  },
  beforeDestroy: function() {
    if (this.$refs[this.slickRef]) {
      if (document.getElementById(this.section.id)) {
        document
          .getElementById(this.section.id)
          .removeEventListener("click", this.showGalleryOnClones);
      }
    }
  }
};
</script>
<style scoped>
.video >>> .v-skeleton-loader__text {
  background-color: var(--bg-color);
}
</style>
