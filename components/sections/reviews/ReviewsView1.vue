<template>
  <div class="benefits__list mx-ncell benefits__list--style1" v-if="section.items && isSlick">
    <slick ref="slick" :options="updatedSlickOptions">
      <div
        class="reviews__item-wrap"
        :class="{'position-relative': isEdit}"
        v-for="(item, itemIndex) in section.items.filter(i => i.id)"
        :key="item.id"
      >
        <buttons-item
          v-if="isEdit"
          :itemId="item.id"
          :sectionId="section.id"
          @onAction="onItemsChange"
          @onItemDelete="onDeleteItem"
        />
        <div class="reviews__item">
          <div class="reviews__body">
            <div class="reviews__person">
              <div class="reviews__person__name">
                <editor
                  data-placeholder="Имя Фамилия"
                  :text="item.name || ''"
                  :sectionId="section.id"
                  field="name"
                  :itemId="item.id"
                  v-if="isEdit"
                />
                <span v-else>{{ item.name }}</span>
              </div>
              <div class="reviews__person__position">
                <editor
                  data-placeholder="Должность"
                  :text="item.position || ''"
                  :sectionId="section.id"
                  field="position"
                  :itemId="item.id"
                  v-if="isEdit"
                />
                <span v-else>{{ item.position }}</span>
              </div>
            </div>

            <div v-if="isEdit" class="reviews__text">
              <editor
                data-placeholder="Текст отзыва"
                :text="item.description || ''"
                :sectionId="section.id"
                field="description"
                :itemId="item.id"
              />
            </div>
            <div v-else class="reviews__text">{{ item.description }}</div>
            <div class="reviews__info align-items-center">
              <a href class="reviews__readmore">
                Читать полностью
                <svg
                  width="5"
                  height="8"
                  viewBox="0 0 5 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 1L4 4L1 7" stroke="currentColor" />
                </svg>
              </a>
              <div v-if="isEdit">
                <v-dialog
                  ref="dialogReviewDate"
                  v-model="modalReviewDate"
                  :return-value.sync="reviewDate"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="reviewDate"
                      label="Выберите дату"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="reviewDate" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modalReviewDate = false">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="setReviewDate({
                        index: itemIndex,
                      itemId: item.id,
                      field: 'date',
                      value: reviewDate
                    })"
                    >OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </div>
              <div v-else class="reviews__date">{{ item.date }}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="cell cell-12 cell-sm-6 cell-lg-3"
        v-if="isEdit && (!section.items || !section.items.length)"
      >
        <buttons-item-add :sectionId="section.id" />
      </div>
    </slick>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {
    section: Object,
    isEdit: Boolean,
  },
  data: () => ({
    reviewDate: new Date().toISOString().substr(0, 10),
    modalReviewDate: false,
    isSlick: true,
    slickOptions: {
      arrows: true,
      dots: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: false,
      centerPadding: "18.3333%",
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
      const slidesStart = this.isEdit ? 0 : 1;
      return Object.assign(this.slickOptions, {
        initialSlide: slidesStart,
        slidesToShow: slidesQty,
        centerMode: !this.isEdit,
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
    setReviewDate(payload) {
      this.$refs.dialogReviewDate[payload.index].save(this.reviewDate);
      this.setItemField({
        sectionId: this.section.id,
        itemId: payload.itemId,
        items: "items",
        field: payload.field,
        value: payload.value,
      });
      this.$store.dispatch("pages/savePage");
      this.dialogReviewDate = false;
    },
  },
  watch: {
    isEdit: function () {
      this.restartSlick();
    },
  },
};
</script>
