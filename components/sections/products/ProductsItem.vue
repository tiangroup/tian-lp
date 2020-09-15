<template>
  <div
    class="partners__item-wrap cell"
    :class="{ 'position-relative': isEdit }"
  >
    <buttons-item
      v-if="isEdit"
      :itemId="item.id"
      :sectionId="sectionId"
      @onAction="$emit('item-update')"
    ></buttons-item>
    <div class="products__item">
      <a
        href="#popup-details"
        class="products__details"
        :class="{ 'no-hover': isEdit }"
        @click="$emit('show-details')"
      >
        <div class="products__image no-image"></div>
        <div class="products__title">
          <editor
            data-placeholder="Название товара"
            :text="item.title || ''"
            :sectionId="sectionId"
            field="title"
            :itemId="item.id"
            v-if="isEdit"
          />
          <span v-else>{{ item.title }}</span>
        </div>
        <div class="products__description">
          <editor
            data-placeholder="Небольшое описание товара"
            :text="item.short_description || ''"
            :sectionId="sectionId"
            field="short_description"
            :itemId="item.id"
            v-if="isEdit"
          />
          <span v-else>{{ item.short_description }}</span>
        </div>
        <div class="products__prices">
          <div class="products__prices__current">
            <editor
              data-placeholder="10 000"
              :text="item.price || ''"
              :sectionId="sectionId"
              field="price"
              :itemId="item.id"
              v-if="isEdit"
            />
            <span v-else>{{ item.price }}</span>
          </div>
          <div class="products__prices__old">
            <editor
              data-placeholder="20 000"
              :text="item.old_price || ''"
              :sectionId="sectionId"
              field="old_price"
              :itemId="item.id"
              v-if="isEdit"
            />
            <span v-else>{{ item.old_price }}</span>
          </div>
        </div>
      </a>
      <div class="products__action">
        <button
          class="button button-secondary"
          @click="$emit('show-order-form')"
        >
          Заказать
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object,
    sectionId: String,
    isEdit: Boolean
  },
  data: () => ({}),
  methods: {}
};
</script>
<style>
.partners__item-wrap a,
.partners__item-wrap a:hover,
.partners__item-wrap a:focus {
  color: inherit;
}
</style>
