<template>
  <div
    class="products__item-wrap cell"
    :class="{ 'position-relative': isEdit }"
  >
    <buttons-item
      v-if="isEdit"
      :itemId="item.id"
      :sectionId="sectionId"
    ></buttons-item>
    <div class="products__item">
      <div class="products__details" @click="$emit('show-details')">
        <div class="products__image" :class="{ 'no-image': !item.img_1 }">
          <img :src="$images.src(item.img_1)" v-if="item.img_1" />
        </div>
        <div class="products__title">
          {{ item.title }}
        </div>
        <div class="products__description">
          {{ item.short_description }}
        </div>
        <div class="products__prices">
          <div class="products__prices__current">
            {{ item.price }}
          </div>
          <div class="products__prices__old">
            {{ item.old_price }}
          </div>
        </div>
      </div>
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
    isEdit: Boolean,
  },
  data: () => ({}),
  methods: {},
};
</script>
<style scoped>
.partners__item-wrap a,
.partners__item-wrap a:hover,
.partners__item-wrap a:focus {
  color: inherit;
}
</style>
