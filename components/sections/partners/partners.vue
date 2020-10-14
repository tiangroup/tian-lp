<template>
  <div :class="{ 'position-relative': isEdit }" :id="section.id">
    <buttons-section v-if="isEdit" :section="section" />
    <div
      class="partners custom-v-spacing bg-primary"
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
        <div
          class="partners__list cells justify-content-center"
          v-if="section.items && section.settings.view === 'list'"
        >
          <partners-item
            :class="computedItemClass"
            v-for="item in section.items.filter((i) => i.id)"
            :key="item.id"
            :item="item"
            :sectionId="section.id"
            :isEdit="isEdit"
            @change-link="
              updatePartnerLink({
                itemId: item.id,
                sectionId: section.id,
                field: 'link',
                value: item.link,
              })
            "
          ></partners-item>
          <div
            class="partners__item-wrap cell"
            :class="computedItemClass"
            v-if="isEdit && (!section.items || !section.items.length)"
          >
            <div class="partners__item">
              <div class="item__add-button">
                <buttons-item-add :sectionId="section.id" />
              </div>
              <div class="partners__image no-image"></div>
              <div class="partners__text">
                <v-skeleton-loader
                  boilerplate
                  type="sentences"
                ></v-skeleton-loader>
              </div>
            </div>
          </div>
        </div>
        <div class="partners__list mx-ncell" v-if="view === 'slider'">
          <client-only>
            <slick
              :ref="slickRef"
              :options="updatedSlickOptions"
              :key="slickKey"
              @init="handleInit"
            >
              <partners-item
                v-for="item in section.items.filter((i) => i.id)"
                :key="item.id"
                :item="item"
                :sectionId="section.id"
                :isEdit="isEdit"
                @change-link="
                  updatePartnerLink({
                    itemId: item.id,
                    sectionId: section.id,
                    field: 'link',
                    value: item.link,
                  })
                "
              ></partners-item>
              <div
                class="partners__item-wrap cell"
                v-if="isEdit && (!section.items || !section.items.length)"
              >
                <div class="partners__item">
                  <div class="item__add-button">
                    <buttons-item-add :sectionId="section.id" />
                  </div>
                  <div class="partners__image no-image"></div>
                  <div class="partners__text">
                    <v-skeleton-loader
                      boilerplate
                      type="sentences"
                    ></v-skeleton-loader>
                  </div>
                </div>
              </div>
            </slick>
            <template slot="placeholder">
              <div class="cells fx-nw overflow-hidden">
                <partners-item
                  class="cell-6 cell-sm-4 cell-md-3 cell-xl-2"
                  v-for="item in section.items.filter((i) => i.id)"
                  :key="item.id"
                  :item="item"
                  :sectionId="section.id"
                  :isEdit="false"
                  :view="view"
                ></partners-item>
              </div>
            </template>
          </client-only>
        </div>

        <v-dialog v-model="partnerLinkDialog" max-width="33rem" v-if="isEdit">
          <v-card>
            <v-card-title class="mb-10">
              Ссылка на сайт
              <v-spacer></v-spacer>
              <v-btn icon @click="partnerLinkDialog = false">
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
                @click="partnerLinkDialog = false"
                >Отменить</v-btn
              >
              <v-btn
                depressed
                color="green"
                dark
                @click="setPartnerField(userUrl)"
                >Сохранить</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import PartnersItem from "./PartnersItem";
export default {
  props: {
    section: Object,
  },
  components: {
    PartnersItem,
  },
  data: () => ({
    currentItem: {},
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
    partnerLinkDialog: false,
    userUrl: "",
  }),
  computed: {
    ...mapGetters({
      isEdit: "isEdit",
    }),
    updatedSlickOptions() {
      let slickSlidesToShow = this.isEdit ? 4 : 6;
      return Object.assign(this.slickOptions, {
        slidesToShow: slickSlidesToShow,
        infinite: !this.isEdit,
        draggable: !this.isEdit,
      });
    },
    view() {
      return this.section.settings.view;
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
      //console.log("partners-slick key " + key);
      return key;
    },
    itemsCount() {
      return this.section.items.length;
    },
    computedRealSlides() {
      return document
        .getElementById(this.section.id)
        .querySelectorAll(".slick-slide:not(.slick-cloned)").length;
    },
    computedItemClass() {
      let classes = this.isEdit
        ? "cell-12 cell-sm-6 cell-lg-4 cell-xl-3"
        : "cell-6 cell-sm-4 cell-md-3 cell-xl-2";
      return classes;
    },
  },
  methods: {
    ...mapMutations({
      setItemField: "pages/SET_ITEM_FIELD",
    }),
    updatePartnerLink(payload) {
      this.currentItem = payload;
      this.userUrl = payload.value;
      this.partnerLinkDialog = true;
    },
    setPartnerField(value) {
      this.setItemField({
        sectionId: this.section.id,
        itemId: this.currentItem.itemId,
        items: "items",
        field: this.currentItem.field,
        value: value,
      });
      this.$store.dispatch("pages/savePage");
      this.partnerLinkDialog = false;
    },
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
.partners >>> .v-skeleton-loader__text {
  background-color: var(--separator-color);
}
</style>
