<template>
  <div
    class="products__item-wrap cell"
    :class="{ 'position-relative': isEdit }"
  >
    <buttons-item
      v-if="isEdit"
      :itemId="item.id"
      :sectionId="section.id"
    ></buttons-item>
    <div class="products__item">
      <div
        class="products__details"
        :class="{ 'products__details--editable': isEdit }"
      >
        <button
          class="products__image"
          :class="{ 'no-image': !item.img_1 }"
          @click="$emit('call-details-dialog', item)"
        >
          <nuxt-img
            v-if="item.img_1"
            :src="$site_img(item.img_1)"
            image-style="sq_lg_ext"
          />
        </button>
        <div class="products__title">
          <editor-text
            data-placeholder="Название товара"
            :text="item.title"
            :sectionId="section.id"
            field="title"
            :itemId="item.id"
            v-if="isEdit"
          />
          <div
            class="clickable"
            v-else
            @click="$emit('call-details-dialog', item)"
          >
            {{ item.title }}
          </div>
        </div>
        <div class="products__description">
          <editor-text
            data-placeholder="Краткое описание товара"
            :text="item.short_description"
            :sectionId="section.id"
            field="short_description"
            :itemId="item.id"
          />
        </div>
        <div class="products__prices">
          <div class="good__prices__current">
            <editor-text
              data-placeholder="000 руб."
              :text="item.price"
              :sectionId="section.id"
              field="price"
              :itemId="item.id"
            />
          </div>
          <div class="good__prices__old">
            <editor-text
              data-placeholder="000 руб."
              :text="item.old_price"
              :sectionId="section.id"
              field="old_price"
              :itemId="item.id"
            />
          </div>
        </div>
      </div>
      <div class="products__action">
        <button
          class="button button-secondary"
          @click="$emit('call-order-dialog', item)"
        >
          Заказать
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    item: Object,
    section: Object,
    isEdit: Boolean
  },
  data: () => ({}),

  methods: {}
};
</script>
<style scoped>
.partners__item-wrap a,
.partners__item-wrap a:hover,
.partners__item-wrap a:focus {
  color: inherit;
}
.v-navigation-drawer {
  z-index: 130;
}
</style>
