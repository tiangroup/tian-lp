<template>
  <div class="good scrollable__base">
    <div class="good__details scrollable__head">
      <div class="good__title">
        <editor-text
          data-placeholder="Название товара"
          :text="item.title"
          :sectionId="section.id"
          field="title"
          :itemId="item.id"
          :key="'detitmttl' + uniqueKey"
        />
      </div>
    </div>
    <div class="scrollable__block">
      <div class="good__details">
        <div class="good__images illustrations" v-if="isEdit || item.img_1">
          <div
            class="illustrations__item illustrations__item--main"
            @click="handleMainIllustrationClick"
          >
            <image-item
              divClass="illustrations__image"
              :field="getImageField(currentBigImageIndex)"
              :img="getImage(currentBigImageIndex)"
              :itemId="item.id"
              :sectionId="section.id"
              imageStyle="sq_lg_ext"
              imageLoader="resize_xl"
            />
          </div>
          <div class="illustrations__row" v-if="isEdit || item.img_2">
            <div
              class="illustrations__item"
              v-for="n in 4"
              :key="n"
              :id="'index' + n"
            >
              <div
                class="illustrations__switch"
                :class="{
                  'illustrations__switch--active': n === currentBigImageIndex
                }"
                @click="handleIllustrationClick(n)"
                v-if="item['img_' + n] || isEdit"
              >
                <image-item
                  divClass="illustrations__image"
                  :field="getImageField(n)"
                  :img="getImage(n)"
                  :itemId="item.id"
                  :sectionId="section.id"
                  :key="'imgS' + item['img_' + n] + n"
                  imageStyle="sq_lg_ext"
                  imageLoader="resize_xl"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="good__chars body-copy" v-if="isEdit">
          <editor-html
            data-placeholder="Габариты: 220 х 100 х 35 мм"
            :text="item.tech_chars"
            :sectionId="section.id"
            field="tech_chars"
            :itemId="item.id"
            :key="'detitmchars' + uniqueKey"
          />
        </div>
        <div
          class="good__chars body-copy"
          v-html="item.tech_chars"
          v-else-if="item.tech_chars"
        ></div>
        <div class="good__description" v-if="item.description || isEdit">
          <div class="good__description__title">
            <editor-text
              :text="section.description_label || 'Описание'"
              :sectionId="section.id"
              field="description_label"
            />
          </div>
          <div class="good__description__body">
            <editor-html
              data-placeholder="Полное описание товара"
              :text="item.description"
              :sectionId="section.id"
              field="description"
              :itemId="item.id"
              :key="'detitmdesc' + uniqueKey"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="good__cta scrollable__foot">
      <div class="cells justify-content-between align-items-center">
        <div class="cell cell-auto">
          <div class="good__prices">
            <div class="good__prices__current">
              <editor-text
                data-placeholder="000 руб."
                :text="item.price"
                :sectionId="section.id"
                field="price"
                :itemId="item.id"
                :key="'detitmprc' + uniqueKey"
              />
            </div>

            <div class="good__prices__old">
              <editor-text
                data-placeholder="000 руб."
                :text="item.old_price"
                :sectionId="section.id"
                field="old_price"
                :itemId="item.id"
                :key="'detitmoprc' + uniqueKey"
              />
            </div>
          </div>
        </div>
        <div class="cell cell-auto">
          <div class="good__action">
            <button
              class="button button-primary"
              @click="$emit('call-order-form')"
              v-if="!isEdit"
            >
              Заказать
            </button>
            <v-btn
              depressed
              color="green"
              dark
              @click="$emit('save-details')"
              v-else
              >Сохранить</v-btn
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object,
    isEdit: Boolean,
    section: Object
  },
  data: function () {
    return {
      currentBigImageIndex: 1,
      uniqueKey: 0
    };
  },
  computed: {},
  methods: {
    handleMainIllustrationClick() {
      if (!this.isEdit) {
        this.$emit("call-gallery", this.currentBigImageIndex - 1);
      }
    },
    handleIllustrationClick: function (index) {
      //if (!this.isEdit) {
      this.currentBigImageIndex = index;
      //}
    },
    getImage(index) {
      let imageField = this.getImageField(index);
      return this.item[imageField];
    },
    getImageField(index) {
      return "img_" + index;
    }
  },
  watch: {
    item: function () {
      this.currentBigImageIndex = 1;
      this.uniqueKey += 1;
    }
  }
};
</script>