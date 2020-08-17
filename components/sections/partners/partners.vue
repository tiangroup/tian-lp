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
          <partners-item
            class="partners__item-wrap cell cell-6 cell-sm-4 cell-md-3 cell-xl-2"
            v-for="item in section.items.filter(i => i.id)"
            :key="item.id"
            :item="item"
            :sectionId="section.id"
            :isEdit="isEdit"
            @item-update="onItemsChange"
            @change-link="updatePartnerLink({
              itemId: item.id,
              sectionId: section.id,
              field: 'link',
              value:item.link
            })"
          ></partners-item>
          <div
            class="partners__item-wrap cell cell-6 cell-sm-4 cell-md-3 cell-xl-2"
            v-if="isEdit && (!section.items || !section.items.length)"
          >
            <buttons-item-add :sectionId="section.id" />
          </div>
        </div>
        <div
          class="partners__list"
          v-if="section.items && isSlick && section.settings.view === 'slider'"
        >
          <slick ref="slick" :options="updatedSlickOptions">
            <partners-item
              class="partners__item-wrap"
              v-for="item in section.items.filter(i => i.id)"
              :key="item.id"
              :item="item"
              :sectionId="section.id"
              :isEdit="isEdit"
              @item-update="onItemsChange"
              @change-link="updatePartnerLink({
              itemId: item.id,
              sectionId: section.id,
              field: 'link',
              value:item.link
            })"
            ></partners-item>
            <div
              class="partners__item-wrap"
              v-if="isEdit && (!section.items || !section.items.length)"
            >
              <buttons-item-add :sectionId="section.id" />
            </div>
          </slick>
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
              <v-text-field label="Ссылка" outlined v-model="userUrl"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed color="gray" text @click="partnerLinkDialog = false">Отменить</v-btn>
              <v-btn depressed color="green" dark @click="setPartnerField(userUrl)">Сохранить</v-btn>
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
    userUrl: "",
    partnerLinkDialog: false,
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
    ...mapMutations({
      setItemField: "pages/SET_ITEM_FIELD",
    }),
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