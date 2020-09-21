<template>
  <div class="products__item-wrap cell" :class="{ 'position-relative': isEdit }">
    <buttons-item
      v-if="isEdit"
      :itemId="item.id"
      :sectionId="sectionId"
      @onAction="$emit('item-update')"
    ></buttons-item>
    <div class="products__item">
      <div class="products__details no-hover" v-if="isEdit">
        <div class="products__image no-image"></div>
        <div class="products__title">
          <editor
            data-placeholder="Название товара"
            :text="item.title || ''"
            :sectionId="sectionId"
            field="title"
            :itemId="item.id"
          />
        </div>
        <div
          class="products__description"
          @click="$emit('update-description')"
        >{{ item.short_description || "Отредактируйте описание товара" }}</div>
        <div class="products__prices">
          <div class="products__prices__current">
            <editor
              data-placeholder="10 000"
              :text="item.price || ''"
              :sectionId="sectionId"
              field="price"
              :itemId="item.id"
            />
          </div>
          <div class="products__prices__old">
            <editor
              data-placeholder="20 000"
              :text="item.old_price || ''"
              :sectionId="sectionId"
              field="old_price"
              :itemId="item.id"
            />
          </div>
        </div>
      </div>
      <a href="#popup-details" class="products__details" @click="$emit('show-details')" v-else>
        <div class="products__image no-image"></div>
        <div class="products__title">{{ item.title }}</div>
        <div class="products__description">{{ item.short_description }}</div>
        <div class="products__prices">
          <div class="products__prices__current">{{ item.price }}</div>
          <div class="products__prices__old">{{ item.old_price }}</div>
        </div>
      </a>
      <div class="products__action">
        <button class="button button-secondary" @click="$emit('show-order-form')">Заказать</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object,
    sectionId: String,
    isEdit: Boolean,
  },
  data: () => ({}),
  methods: {},
};
</script>
<style>
.partners__item-wrap a,
.partners__item-wrap a:hover,
.partners__item-wrap a:focus {
  color: inherit;
}
</style>
