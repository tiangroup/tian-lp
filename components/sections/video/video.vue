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
              youTubeVideoIdProperty: 'youtube',
              youTubePlayerVars: undefined,
              youTubeClickToPlay: false
            }"
            @close="index = null"
          ></v-gallery>
          <div class="mx-ncell">
            <slick ref="slick" :options="updatedSlickOptions" class="video__list" v-if="isSlick">
              <video-item
                v-for="(item, itemIndex) in section.items.filter(i => i.id)"
                :key="item.id"
                :item="item"
                :sectionId="section.id"
                :isEdit="isEdit"
                @gallery-call="showGallery(itemIndex)"
                @item-update="restartSlick()"
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
    index: null,
    videoUrlDialog: false,
    userUrl: "",
    isSlick: true,
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
    itemVideoInput(payload) {
      this.videoItem = payload;
      this.userUrl = payload.value;
      this.videoUrlDialog = true;
    },
    setVideoUrl(userUrl) {
      this.setItemField({
        sectionId: this.sectionId,
        itemId: this.item.id,
        items: "items",
        field: this.field,
        value: userUrl,
      });
      this.$store.dispatch("pages/savePage");
    },
    restartSlick() {
      this.isSlick = false;
      const _this = this;
      setTimeout(function () {
        _this.isSlick = true;
      }, 100);
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
