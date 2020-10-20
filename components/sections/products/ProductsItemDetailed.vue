<template>
  <div class="good">
    <div class="good__details">
      <div class="good__title">
        <editor
          data-placeholder="Название товара"
          :text="item.title || ''"
          :sectionId="sectionId"
          field="title"
          :itemId="item.id"
          v-if="isEdit"
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
            :sectionId="sectionId"
            :key="'imgB' + item.id"
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
                :sectionId="sectionId"
                :key="'img' + item.id + n"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="good__chars body-copy" v-if="isEdit">
        <editor
          data-placeholder="Габариты: 220 х 100 х 35 мм"
          :text="item.tech_chars || ''"
          :sectionId="sectionId"
          field="tech_chars"
          :itemId="item.id"
          editContent="html"
          :key="'ch' + item.id"
        />
      </div>
      <div class="good__chars body-copy" v-html="item.tech_chars" v-else></div>
      <div class="good__description" v-if="isEdit">
        <div class="good__description__title">Краткое описание</div>

        <editor
          data-placeholder="Краткое описание товара"
          :text="item.short_description || ''"
          :sectionId="sectionId"
          field="short_description"
          :itemId="item.id"
          :key="'sh' + item.id"
        />
      </div>
      <div class="good__description" v-if="item.description || isEdit">
        <div class="good__description__title">Описание</div>
        <div class="good__description__body" v-if="isEdit">
          <editor
            data-placeholder="Полное описание товара"
            :text="item.description || ''"
            :sectionId="sectionId"
            field="description"
            :itemId="item.id"
            editContent="html"
            :key="'d' + item.id"
          />
        </div>
        <div
          class="good__description__body body-copy"
          v-html="item.description"
        ></div>
      </div>
    </div>
    <div class="good__cta">
      <div class="cells justify-content-between align-items-center">
        <div class="cell cell-auto">
          <div class="good__prices">
            <div class="good__prices__current" v-if="isEdit">
              <editor
                data-placeholder="10 000"
                :text="item.price || ''"
                :sectionId="sectionId"
                field="price"
                :itemId="item.id"
              />
            </div>
            <div class="good__prices__current" v-else>
              {{ item.price }}
            </div>

            <div class="good__prices__old" v-if="isEdit">
              <editor
                data-placeholder="20 000"
                :text="item.old_price || ''"
                :sectionId="sectionId"
                field="old_price"
                :itemId="item.id"
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
              @click="$emit('save-item')"
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
    sectionId: String,
  },
  data: function () {
    return {
      currentBigImageIndex: 1,
    };
  },
  methods: {
    handleMainIllustrationClick() {
      if (!this.isEdit) {
        this.$emit("call-gallery", this.currentBigImageIndex - 1);
      }
    },
    handleIllustrationClick(index) {
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
  watch: {
    isEdit: function (val, oldVal) {
      if (val === true) {
        this.currentBigImageIndex = 1;
      }
    },
  },
};
</script>