<template>
  <div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section" />
    <div
      class="video custom-v-spacing-2 bg-secondary"
      :class="{ mDark: section.settings.background === 'dark' }"
    >
      <div class="landing__container">
        <h2 v-if="isEdit">
          <editor :text="section.title || ''" :sectionId="section.id" field="title" />
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
          <v-gallery
            v-if="!isEdit"
            :images="videos"
            :index="index"
            :options="{
              closeOnSlideClick: true,
              youTubeVideoIdProperty: 'youtube',
              youTubePlayerVars: undefined,
              youTubeClickToPlay: false
            }"
            @close="index = null"
            :id="'gallery' + section.id"
          ></v-gallery>
          <div class="mx-ncell">
            <slick
              :ref="'slick' + section.id"
              :options="updatedSlickOptions"
              class="video__list"
              v-if="isSlick"
              @init="handleInit"
            >
              <video-item
                v-for="(item, itemIndex) in section.items.filter(i => i.id)"
                :key="item.id"
                :item="item"
                :sectionId="section.id"
                :isEdit="isEdit"
                @gallery-call="showGallery(itemIndex)"
                @item-update="onItemUpdate"
                @change-link="itemVideoInput({
                  sectionId:section.id,
                  itemId:item.id,
                  field:'link',
                  value:item.link
                })"
              ></video-item>
              <div
                class="video__item-wrap cell"
                v-if="isEdit && (!section.items || !section.items.length)"
              >
                <buttons-item-add :sectionId="section.id" />
              </div>
            </slick>

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
                  <v-text-field label="Ссылка" outlined v-model="userUrl"></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn depressed color="gray" text @click="videoUrlDialog = false">Отменить</v-btn>
                  <v-btn depressed color="green" dark @click="setVideoUrl(userUrl)">Сохранить</v-btn>
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
    section: Object,
  },
  components: {
    VideoItem,
  },
  data: () => ({
    currentVideo: {},
    index: null,
    isSlick: true,
    itemsQty: null,
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
            arrows: false,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    },
    videoUrlDialog: false,
    userUrl: "",
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
    videos() {
      var videosArray = [];
      for (let n = 0; n < this.section.items.length; n++) {
        let vid = this.section.items[n];
        let videoItem = {
          title: vid.title,
          href: vid.link,
          type: "text/html",
          youtube: this.videoId(vid.link),
        };
        videosArray.push(videoItem);
      }
      return videosArray;
    },
  },
  methods: {
    ...mapMutations({
      setItemField: "pages/SET_ITEM_FIELD",
    }),
    onItemUpdate() {
      if (this.section.items.length < 1) {
        this.restartSlick();
      } else {
        this.itemsQty = this.section.items.length;
      }
    },
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
        value: userUrl,
      });
      this.$store.dispatch("pages/savePage");
      this.videoUrlDialog = false;
    },
    restartSlick() {
      this.isSlick = false;
      const _this = this;
      setTimeout(function () {
        _this.isSlick = true;
      }, 200);
    },
    showGallery(itemIndex) {
      if (this.isEdit) {
        return;
      }
      this.index = itemIndex;
    },
    videoId(videoUrl) {
      if (!videoUrl) {
        return "";
      }
      const youtubeRegex = /^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/;
      const youtubeId = videoUrl.match(youtubeRegex);
      return youtubeId[2];
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
      this.itemsQty = this.section.items.length;
      this.restartSlick();
    },
  },
};
</script>
