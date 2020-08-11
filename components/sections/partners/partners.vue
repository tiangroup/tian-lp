<template>
  <div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section" />
    <div
      class="partners custom-v-spacing bg-primary"
      :class="{ mDark: section.settings.background === 'dark' }"
    >
      <div class="landing__container">
        <h2 v-if="isEdit">
          <editor :text="section.title || ''" :sectionId="section.id" field="title" />
        </h2>
        <h2 v-else>{{ section.title }}</h2>
        <div
          class="partners__list cells justify-content-center"
          v-if="section.items && section.settings.view === 'list'"
        >
          <div
            class="partners__item-wrap cell cell-6 cell-sm-4 cell-md-3 cell-xl-2"
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
            <div class="partners__item">
              <a v-if="item.link && !isEdit" :href="item.link" class="partners__link"></a>
              <div
                class="partners__image"
                :class="{ 'no-image': !item.img, 'clickable': isEdit }"
                :title="isEdit ? 'Двойной клик - изменить картинку' : ''"
                @dblclick="
                  itemImageSelect({
                    itemId: item.id,
                    field: 'img',
                    value: item.img
                  })
                "
              >
                <img v-if="item.img" :src="$site_img(item.img)" />
              </div>
              <div class="partners__text" v-if="isEdit">
                <editor
                  :text="item.title || ''"
                  :options="{placeholder: {text: 'Type your text'}}"
                  :sectionId="section.id"
                  field="title"
                  :itemId="item.id"
                />
              </div>
              <div v-else class="partners__text">{{ item.title }}</div>
            </div>
          </div>
          <div
            class="partners__item-wrap cell cell-6 cell-sm-4 cell-md-3 cell-xl-2"
            v-if="isEdit && (!section.items || !section.items.length)"
          >
            <buttons-item-add :sectionId="section.id" />
          </div>
        </div>
        <slick 
          ref="slick" 
          :options="updatedSlickOptions" 
          class="partners__list"
          v-if="section.items && isSlick && section.settings.view === 'slider'"
        >
          <div
            class="partners__item-wrap"
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
            <div class="partners__item">
              <a v-if="item.link && !isEdit" :href="item.link" class="partners__link"></a>
              <div
                class="partners__image"
                :class="{ 'no-image': !item.img, 'clickable': isEdit }"
                :title="isEdit ? 'Двойной клик - изменить картинку' : ''"
                @dblclick="
                  itemImageSelect({
                    itemId: item.id,
                    field: 'img',
                    value: item.img
                  })
                "
              >
                <img v-if="item.img" :src="$site_img(item.img)" />
              </div>
              <div class="partners__text">
                <editor
                  :text="item.title || ''"
                  :sectionId="section.id"
                  field="title"
                  :itemId="item.id"
                  v-if="isEdit"
                />
                <span v-else>{{ item.title }}</span>
              </div>
            </div>
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
    dialogImageUpload: false,
    itemImageEdit: {},
    isSlick: true,
    slickOptions: {
      arrows: true,
      dots: true,
      infinite: false,
      draggable: false,
      slidesToShow: 6,
      slidesToScroll: 1,
      prevArrow: '<button type="button" class="slick-arrow slick-prev"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L2 13.9706L15.966 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
      nextArrow: '<button type="button" class="slick-arrow slick-next"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L15 13.9706L1.03398 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false
          }
        }
      ]
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
      return Object.assign(this.slickOptions, {infinite: !this.isEdit});
    }
  },
  methods: {
    ...mapMutations({
      setItemField: "pages/SET_ITEM_FIELD",
    }),
    itemImageSelect(item) {
      this.itemImageEdit = item;
      this.dialogImageUpload = true;
    },
    onUploadImage(payload) {
      this.dialogImageUpload = false;
      this.setItemField({
        sectionId: this.section.id,
        itemId: payload.itemId,
        items: "items",
        field: payload.field,
        value: payload.value,
      });
      this.$store.dispatch("pages/savePage");
    },
    onItemsChange(event) {
      this.restartSlick();
    },
    restartSlick() {
      this.isSlick = false;
      const _this = this;
      setTimeout(function(){
        _this.isSlick = true;
      }, 100);
    }
  },
  watch: {
    isEdit: function() {
      this.updatedSlickOptions.infinite = !this.isEdit;
      this.updatedSlickOptions.draggable = !this.isEdit;
      this.restartSlick();
    }
  }
};
</script>
<style>
  @import 'node_modules/slick-carousel/slick/slick.css'
</style>