<template>
  <div class="good">
    <div class="good__details">
      <div class="good__title">
        <editor
          data-placeholder="Название товара"
          :text="item.title || ''"
          :sectionId="section.id"
          field="title"
          :itemId="item.id"
          v-if="isEdit"
          :key="'ttl' + item.id"
        />
        <span v-else> {{ item.title }}</span>
      </div>
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
                'illustrations__switch--active': n === currentBigImageIndex,
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
              />
            </div>
          </div>
        </div>
      </div>
      <div class="good__chars body-copy" v-if="isEdit">
        <editor
          data-placeholder="Габариты: 220 х 100 х 35 мм"
          :text="item.tech_chars || ''"
          :sectionId="section.id"
          field="tech_chars"
          :itemId="item.id"
          editContent="html"
          :key="'ch' + item.id"
        />
      </div>
      <div
        class="good__chars body-copy"
        v-html="item.tech_chars"
        v-else-if="item.tech_chars"
      ></div>
      <div class="good__description" v-if="item.description || isEdit">
        <div class="good__description__title">
          <editor
            :text="section.description_label || 'Описание'"
            :sectionId="section.id"
            field="description_label"
            v-if="isEdit"
          />
          <span v-else>{{ section.description_label || "Описание" }}</span>
        </div>
        <div class="good__description__body" v-if="isEdit">
          <editor
            data-placeholder="Полное описание товара"
            :text="item.description || ''"
            :sectionId="section.id"
            field="description"
            :itemId="item.id"
            editContent="html"
            :key="'d' + item.id"
          />
        </div>
        <div
          class="good__description__body body-copy"
          v-html="item.description"
          v-else
        ></div>
      </div>
    </div>
    <div class="good__cta">
      <div class="cells justify-content-between align-items-center">
        <div class="cell cell-auto">
          <div class="good__prices">
            <div class="good__prices__current" v-if="isEdit">
              <editor
                data-placeholder="000 руб."
                :text="item.price || ''"
                :sectionId="section.id"
                field="price"
                :itemId="item.id"
                :key="'price' + item.id"
              />
            </div>
            <div class="good__prices__current" v-else>
              {{ item.price }}
            </div>

            <div class="good__prices__old" v-if="isEdit">
              <editor
                data-placeholder="000 руб."
                :text="item.old_price || ''"
                :sectionId="section.id"
                field="old_price"
                :itemId="item.id"
                :key="'oldprice' + item.id"
              />
            </div>
            <div class="good__prices__old" v-else>
              {{ item.old_price }}
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
              Купить
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

    <client-only>
      <v-gallery
        :images="currentItemImages"
        :index="index"
        @close="index = null"
        v-if="!isEdit"
        :id="'gallery' + item.id"
        :options="{
          closeOnSlideClick: true,
        }"
      ></v-gallery>
    </client-only>
  </div>
</template>
<script>
export default {
  props: {
    item: Object,
    isEdit: Boolean,
    section: Object,
  },
  data: function () {
    return {
      currentBigImageIndex: 1,
      index: null,
    };
  },
  computed: {
    currentItemImages() {
      var imagesArray = [];
      for (var i = 1; i < 5; i++) {
        let imgKey = "img_" + i;
        if (this.item[imgKey]) {
          var imagesItem = {
            title: this.item.title,
            href: this.$site_img(this.item[imgKey]) + "?style=resize_xl",
            type: "image/jpeg",
          };
          imagesArray.push(imagesItem);
        }
      }
      return imagesArray;
    },
  },
  methods: {
    handleMainIllustrationClick() {
      if (!this.isEdit) {
        this.index = this.currentBigImageIndex - 1;
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
    },
  },
};
</script>