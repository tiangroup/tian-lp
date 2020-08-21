<template>
  <div class="benefits__list mx-ncell benefits__list--style1" v-if="section.items && isSlick">
    <slick ref="slick" :options="updatedSlickOptions">
      <reviews-item
        v-for="item in section.items.filter(i => i.id)"
        @item-update="onItemsChange"
        @onItemDelete="onDeleteItem"
        @change-desc="updateReviewDesc(item)"
        @change-date="updateReviewDate(item)"
        :key="item.id"
        :item="item"
        :sectionId="section.id"
        :isEdit="isEdit"
      ></reviews-item>
      <div
        class="reviews__item-wrap cell"
        v-if="isEdit && (!section.items || !section.items.length)"
      >
        <buttons-item-add :sectionId="section.id" />
      </div>
    </slick>
    <v-dialog v-model="dialogReviewDesc" max-width="33rem" v-if="isEdit">
      <v-card>
        <v-card-title class="mb-10">
          Текст отзыва
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogReviewDesc = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-textarea
          outlined
          name="input-review-text"
          label="Введите текст отзыва"
          v-model="inputReviewDesc"
        ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="gray" text @click="dialogReviewDesc = false">Отменить</v-btn>
          <v-btn depressed color="green" dark @click="saveReviewDesc(inputReviewDesc)">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogReviewDate" persistent width="290px">
      <v-date-picker v-model="reviewDate" scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="dialogReviewDate = false">Cancel</v-btn>
        <v-btn text color="primary" @click="saveReviewDate(reviewDate)">OK</v-btn>
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import ReviewsItem from "./ReviewsItem";
export default {
  props: {
    section: Object,
    isEdit: Boolean,
  },
  components: {
    ReviewsItem,
  },
  data: () => ({
    dialogReviewDate: false,
    dialogReviewDesc: false,
    currentReview: {},
    inputReviewDesc: "",
    reviewDate: "",
    modalReviewDate: false,
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
            arrows: false,
            centerMode: false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            centerMode: false,
            centerPadding: 0,
          },
        },
      ],
    },
  }),
  components: {
    Editor: () => import("@/components/admin/Editor"),
    ButtonsItem: () => import("@/components/admin/ButtonsItem"),
  },
  computed: {
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    updatedSlickOptions() {
      const slidesQty = this.isEdit ? 3 : 2;
      return Object.assign(this.slickOptions, {
        slidesToShow: slidesQty,
        infinite: !this.isEdit,
        draggable: !this.isEdit,
      });
    },
  },
  methods: {
    ...mapMutations({
      setItemField: "pages/SET_ITEM_FIELD",
    }),
    onDeleteItem(payload) {
      this.$emit("onItemDelete", payload);
    },
    onItemsChange(event) {
      console.log(event);
      this.restartSlick();
    },
    restartSlick() {
      this.isSlick = false;
      const _this = this;
      setTimeout(function () {
        _this.isSlick = true;
      }, 200);
    },
    updateReviewDate(item) {
      if (this.isEdit) {
        this.currentReview = item;
        this.dialogReviewDate = true;
      }
    },
    saveReviewDate(item) {
      this.saveReviewField("date", this.reviewDate);
      this.dialogReviewDate = false;
    },
    updateReviewDesc(item) {
      if (this.isEdit) {
        this.currentReview = item;
        this.inputReviewDesc = item.text;
        this.dialogReviewDesc = true;
      }
    },
    saveReviewDesc(userInput) {
      this.saveReviewField("text", userInput);
      this.dialogReviewDesc = false;
    },
    saveReviewField(field, value) {
      this.setItemField({
        sectionId: this.section.id,
        itemId: this.currentReview.id,
        items: "items",
        field: field,
        value: value,
      });
      this.$store.dispatch("pages/savePage");
    },
  },
  watch: {
    isEdit: function () {
      this.restartSlick();
    },
  },
};
</script>
