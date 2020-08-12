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
        <v-gallery
          :images="images"
          :index="index"
          @close="index = null"
          v-if="!isEdit"
          :options="{youTubeVideoIdProperty: 'youtube', youTubePlayerVars: undefined, youTubeClickToPlay: true}"
          :id="'video-gallery-' + section.id"
        ></v-gallery>
        <slick
          ref="slick"
          :options="updatedSlickOptions"
          class="video__list"
          v-if="section.items && isSlick"
        >
          <div
            class="video__item-wrap cell"
            :class="{'position-relative': isEdit}"
            v-for="(item, itemIndex) in section.items.filter(i => i.id)"
            :key="item.id"
          >
            <buttons-item
              v-if="isEdit"
              :itemId="item.id"
              :sectionId="section.id"
              @onAction="onItemsChange"
            />
            <component
              class="video__item"
              :is="elem"
              :href="item.link"
              @click="callGallery(itemIndex)"
            >
              <div
                class="video__cover"
                :class="{ 'video__cover--editable': isEdit }"
                :title="isEdit ? 'Клик - изменить ссылку на видео' : ''"
                @click.stop="
                  itemVideoInput({
                    itemId: item.id,
                    field: 'link',
                    value: item.link
                  })
                "
              >
                <img v-if="item.link" :src="videoCover(item.link)" />
              </div>
              <div class="video__title">
                <editor
                  data-placeholder="Название видео"
                  :text="item.title || ''"
                  :sectionId="section.id"
                  field="title"
                  :itemId="item.id"
                  v-if="isEdit"
                />
                <span v-else>{{ item.title }}</span>
              </div>
            </component>
          </div>
          <div
            class="video__item-wrap cell"
            v-if="isEdit && (!section.items || !section.items.length)"
          >
            <buttons-item-add :sectionId="section.id" />
          </div>
        </slick>
        <v-dialog v-model="videoUrlDialog" max-width="33rem">
          <v-card>
            <v-card-title>Ссылка на Youtube-видео</v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="videoUrlDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
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
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
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
    elem() {
      return this.isEdit ? "div" : "a";
    },
    images() {
      let itemImages = [];
      for (var i = 0; i < this.section.items.length; i++) {
        let item = this.section.items[i];
        let itemImage = {
          title: item.title,
          href: item.link,
          type: "text/html",
          poster: "https://img.youtube.com/vi/PiDB4L-m6FQ/maxresdefault.jpg",
        };
        itemImages.push(itemImage);
      }
      return itemImages;
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
    videoCover(url) {
      const youtubeRegex = /^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/;
      const youtubeId = url.match(youtubeRegex);
      const coverUrl =
        "https://img.youtube.com/vi/" + youtubeId[2] + "/maxresdefault.jpg";
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
    callGallery(itemIndex) {
      if (this.isEdit) {
        return;
      }
      index = itemIndex;
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
