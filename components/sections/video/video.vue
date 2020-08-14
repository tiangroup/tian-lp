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
          <div class="mx-ncell" v-if="isEdit">
            <slick ref="slick" :options="updatedSlickOptions" class="video__list" v-if="isSlick">
              <div
                class="video__item-wrap cell position-relative"
                v-for="item in section.items.filter(i => i.id)"
                :key="item.id"
              >
                <buttons-item :itemId="item.id" :sectionId="section.id" @onAction="onItemsChange" />
                <div class="video__item">
                  <div
                    class="video__cover video__cover--editable"
                    title="Клик - изменить ссылку на видео"
                    @click.stop="
                  itemVideoInput({
                    itemId: item.id,
                    field: 'link',
                    value: item.link
                  })
                "
                  >
                    <img v-if="item.link" :src="videoCover(getVideoId(item.link))" />
                  </div>
                  <div class="video__title">
                    <editor
                      data-placeholder="Название видео"
                      :text="item.title || ''"
                      :sectionId="section.id"
                      field="title"
                      :itemId="item.id"
                    />
                  </div>
                </div>
              </div>
              <div class="video__item-wrap cell" v-if="!section.items || !section.items.length">
                <buttons-item-add :sectionId="section.id" />
              </div>
            </slick>

            <v-dialog v-model="videoUrlDialog" max-width="33rem">
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
                  <v-btn depressed color="gray" @click="videoUrlDialog = false">Отменить</v-btn>
                  <v-btn depressed color="green" @click="setVideoUrl(userUrl)">Сохранить</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <div class="mx-ncell" v-else>
            <slick ref="slick" :options="updatedSlickOptions" class="video__list" v-if="isSlick">
              <video-item
                v-for="item in section.items.filter(i => i.id)"
                :key="item.id"
                :item="item"
                :sectionId="section.id"
              ></video-item>
            </slick>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {
    section: Object,
  },
  components: {
    //VideoItem: () => import("./VideoItem"),
  },
  data: () => ({
    videoShown: false,
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
    videoUrlDialog: false,
    userUrl: "",
    videoItem: {},
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
    onItemsChange(event) {
      this.restartSlick();
    },
    restartSlick() {
      this.isSlick = false;
      const _this = this;
      setTimeout(function () {
        _this.isSlick = true;
      }, 100);
    },
    getVideoId(url) {
      const youtubeRegex = /^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/;
      const youtubeId = url.match(youtubeRegex);
      return youtubeId[2];
    },
    videoCover(videoId) {
      const coverUrl =
        "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg";
      return coverUrl;
    },
    setVideoUrl(userUrl) {
      this.setItemField({
        sectionId: this.section.id,
        itemId: this.videoItem.itemId,
        items: "items",
        field: this.videoItem.field,
        value: userUrl,
      });
      this.$store.dispatch("pages/savePage");
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
