<template>
  <div :class="{ 'position-relative': isEdit }" :id="section.id">
    <buttons-section v-if="isEdit" :section="section" />
    <div
      class="staff custom-v-spacing custom-h-spacing bg-primary"
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
        <div class="staff__list mx-ncell">
          <client-only>
            <slick
              :ref="slickRef"
              :options="updatedSlickOptions"
              :key="slickKey"
              @init="handleInit"
            >
              <staff-item
                :item="item"
                :isEdit="isEdit"
                :sectionId="section.id"
                v-for="item in section.items.filter((i) => i.id)"
                :key="item.id"
              ></staff-item>
              <div
                class="staff__item-wrap cell"
                v-if="isEdit && (!section.items || !section.items.length)"
              >
                <div class="staff__item">
                  <div class="item__add-button">
                    <buttons-item-add :sectionId="section.id" />
                  </div>
                  <div class="staff__image no-image"></div>
                  <div class="staff__info">
                    <v-skeleton-loader
                      boilerplate
                      type="article"
                    ></v-skeleton-loader>
                  </div>
                </div>
              </div>
            </slick>
            <template slot="placeholder">
              <div class="cells fx-nw overflow-hidden align-items-stretch">
                <staff-item
                  class="cell-12 cell-sm-6 cell-lg-4"
                  :item="item"
                  :isEdit="false"
                  :sectionId="section.id"
                  v-for="item in section.items.filter((i) => i.id)"
                  :key="item.id"
                ></staff-item>
              </div>
            </template>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StaffItem from "./StaffItem";
export default {
  props: {
    section: Object,
  },
  components: {
    StaffItem,
  },
  data: () => ({
    currentSlide: 0,
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
  }),
  computed: {
    ...mapGetters({
      isEdit: "isEdit",
    }),
    updatedSlickOptions() {
      return Object.assign(this.slickOptions, {
        infinite: !this.isEdit,
        draggable: !this.isEdit,
      });
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
      //console.log("staff-slick key " + key);
      return key;
    },
    itemsCount() {
      return this.section.items.length;
    },
  },
  methods: {
    handleInit(event, slick) {
      if (this.currentSlide) {
        slick.goTo(this.currentSlide, true);
      }
    },
  },
  beforeUpdate: function () {
    if (this.$refs[this.slickRef]) {
      this.currentSlide = this.$refs[this.slickRef].currentSlide();
    }
  },
};
</script>
<style scoped>
.staff a {
  color: var(--theme-color);
}
.staff >>> .v-skeleton-loader__avatar,
.staff >>> .v-skeleton-loader__button,
.staff >>> .v-skeleton-loader__chip,
.staff >>> .v-skeleton-loader__divider,
.staff >>> .v-skeleton-loader__heading,
.staff >>> .v-skeleton-loader__image,
.staff >>> .v-skeleton-loader__text {
  background-color: var(--separator-color);
}
</style>
