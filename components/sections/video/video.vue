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
        <slick
          ref="slick"
          :options="updatedSlickOptions"
          class="video__list"
          v-if="section.items && isSlick"
        >
          <div
            class="video__item-wrap cell"
            :class="{'position-relative': isEdit}"
            v-for="item in section.items.filter(i => i.id)"
            :key="item.id"
            :style="styleDiv"
          >
            <buttons-item
              v-if="isEdit"
              :itemId="item.id"
              :sectionId="section.id"
              @onAction="onItemsChange"
            />
            <component class="staff__item" :is=elem :href="item.link">
              <div
                class="video__cover"
                :class="{ clickable: isEdit }"
                :title="isEdit ? 'Клик - изменить ссылку на видео' : ''"
                @click="
                  itemVideoSelect({
                    itemId: item.id,
                    field: 'link',
                    value: item.link
                  })
                "
              >
                <img v-if="item.link" :src="videoCover(item.link)" />
              </div>
              <div class="staff__info">
                <div class="staff__name" v-if="isEdit">
                  <editor
                    data-placeholder="Имя Фамилия"
                    :text="item.name || ''"
                    :sectionId="section.id"
                    field="name"
                    :itemId="item.id"
                  />
                </div>
                <div v-else class="staff__name">{{ item.name }}</div>
                <div class="staff__position" v-if="isEdit">
                  <editor
                    data-placeholder="должность"
                    :text="item.position || ''"
                    :sectionId="section.id"
                    field="position"
                    :itemId="item.id"
                  />
                </div>
                <div v-else class="staff__position">{{ item.position }}</div>
              </div>
              <div class="staff__contacts">
                <div class="staff__phone" v-if="isEdit">
                  <editor
                    data-placeholder="+7 351 111-22-33"
                    :text="item.phone || ''"
                    editContent="html"
                    :sectionId="section.id"
                    field="phone"
                    :itemId="item.id"
                  />
                </div>
                <div v-else class="staff__phone" v-html="item.phone"></div>
              </div>
            </div>
          </div>
          <div
            class="staff__item-wrap cell cell-12 cell-sm-6 cell-lg-4"
            v-if="isEdit && (!section.items || !section.items.length)"
          >
            <buttons-item-add :sectionId="section.id" />
          </div>
        </slick>
      </div>
      <image-upload
        v-if="isEdit"
        :dialog="dialogImageUpload"
        :itemImageEdit="itemImageEdit"
        @close="dialogImageUpload = false"
        @onUpload="onUploadImage"
      />
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
    isSlick: true,
    slickOptions: {
      arrows: true,
      dots: true,
      slidesToShow: 3,
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
    isSlick: true,
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
    }
  },
  methods: {
    ...mapMutations({
      setItemField: "pages/SET_ITEM_FIELD",
    }),
    itemVideoSelect(item) {
      this.itemImageEdit = item;
      this.dialogImageUpload = true;
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
      const coverUrl = "https://img.youtube.com/vi/" + youtubeId[2] + "/maxresdefault.jpg";
      return coverUrl;
    }
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
