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
      <div
        class="products__details"
        :class="{ 'products__details--editable': isEdit }"
      >
        <button
          class="products__image"
          :class="{ 'no-image': !item.img_1 }"
          @click="$emit('show-details')"
        >
          <img :src="$site_img(item.img_1, 'sq_lg')" v-if="item.img_1" />
        </button>
        <div class="products__title">
          <editor
            data-placeholder="Название товара"
            :text="item.title || ''"
            :sectionId="sectionId"
            field="title"
            :itemId="item.id"
            v-if="isEdit"
          />
          <div class="clickable" v-else @click="$emit('show-details')">
            {{ item.title }}
          </div>
        </div>
        <div class="products__description" v-if="isEdit">
          <editor
            data-placeholder="Краткое описание товара"
            :text="item.short_description || ''"
            :sectionId="sectionId"
            field="short_description"
            :itemId="item.id"
          />
        </div>
        <div class="products__description" v-else>
          {{ item.short_description }}
        </div>
        <div class="products__prices">
          <div class="good__prices__current" v-if="isEdit">
            <editor
              data-placeholder="000 руб."
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
              data-placeholder="000 руб."
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
