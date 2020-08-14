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
              @onItemDelete="onItemDelete"
            />
            <div class="partners__item">
              <a v-if="item.link && !isEdit" :href="item.link" class="partners__link"></a>
              <image-item
                divClass="partners__image"
                :img="item.img"
                :itemId="item.id"
                :sectionId="section.id"
              />
              <div class="partners__text" v-if="isEdit">
                <editor
                  :text="item.title || ''"
                  data-placeholder="Название компании"
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
        <div
          class="partners__list mx-n15 mx-md-n1rem"
          v-if="section.items && isSlick && section.settings.view === 'slider'"
        >
          <slick ref="slick" :options="updatedSlickOptions">
            <div
              class="partners__item-wrap"
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
                @onItemDelete="onItemDelete"
              />
              <div class="partners__item">
                <a v-if="item.link && !isEdit" :href="item.link" class="partners__link"></a>
                <image-item
                  divClass="partners__image"
                  :img="item.img"
                  :itemId="item.id"
                  :sectionId="section.id"
                />
                <div class="partners__text">
                  <editor
                    :text="item.title || ''"
                    :sectionId="section.id"
                    field="title"
                    :itemId="item.id"
                    v-if="isEdit"
                    data-placeholder="Название компании"
                  />
                  <span v-else>{{ item.title }}</span>
                </div>
              </div>
            </div>
            <div
              class="partners__item-wrap cell"
              v-if="isEdit && (!section.items || !section.items.length)"
            >
              <buttons-item-add :sectionId="section.id" />
            </div>
          </slick>
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
  data: () => ({
    isSlick: true,
    slickOptions: {
      arrows: true,
      dots: true,
      infinite: false,
      draggable: false,
      slidesToShow: 6,
      slidesToScroll: 1,
      prevArrow:
        '<button type="button" class="slick-arrow slick-prev"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L2 13.9706L15.966 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
      nextArrow:
        '<button type="button" class="slick-arrow slick-next"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L15 13.9706L1.03398 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
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
  },
  methods: {
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
    async onItemDelete(payload) {
      const item = this.section.items.find((i) => i.id == payload.itemId);
      const formData = new FormData();
      formData.append("image", item.img);
      await this.$axios.post("/api/upload/image-remove", formData);
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