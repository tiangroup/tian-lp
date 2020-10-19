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
      <div class="good__images illustrations">
        <div class="illustrations__item illustrations__item--main">
          <image-item
            divClass="illustrations__image"
            :img="item['img_' + currentBigImageIndex]"
            :itemId="item.id"
            :sectionId="sectionId"
          />
        </div>
        <div class="illustrations__row">
          <div class="illustrations__item" v-for="n in 3" :key="n">
            <div v-if="isEdit" class="illustrations__switch">
              <image-item
                divClass="illustrations__image"
                :img="item.img_0"
                :itemId="item.id"
                :sectionId="sectionId"
              />
            </div>
            <div
              v-else
              class="illustrations__switch"
              :class="{
                'illustrations__switch--active': n === currentBigImageIndex,
              }"
            >
              <image-item
                divClass="illustrations__image"
                :img="item['img_' + n]"
                :itemId="item.id"
                :sectionId="sectionId"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="good__chars" v-if="isEdit">
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
      <div class="good__chars" v-html="item.tech_chars" v-else></div>
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
        <div class="good__description__body" v-html="item.description"></div>
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
      currentBigImageIndex: null,
    };
  },
};
</script>