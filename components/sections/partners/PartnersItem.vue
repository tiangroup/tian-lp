<template>
  <div
    class="partners__item-wrap cell"
    :class="{ 'position-relative': isEdit }"
  >
    <buttons-item v-if="isEdit" :itemId="item.id" :sectionId="sectionId">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            x-small
            color="green"
            v-bind="attrs"
            v-on="on"
            @click="$emit('change-link')"
          >
            <v-icon>mdi-link</v-icon>
          </v-btn>
        </template>
        <span>Указать ссылку на сайт</span>
      </v-tooltip>
    </buttons-item>
    <div class="partners__item">
      <a
        v-if="item.link && !isEdit"
        :href="item.link"
        class="partners__link"
        target="_blank"
      ></a>
      <image-item
        divClass="partners__image"
        :img="item.img"
        :itemId="item.id"
        :sectionId="sectionId"
        imageStyle="resize_sm"
      />
      <div class="partners__text" v-if="isEdit">
        <editor
          :text="item.title || ''"
          data-placeholder="Название компании"
          :sectionId="sectionId"
          field="title"
          :itemId="item.id"
        />
      </div>
      <div v-else class="partners__text">{{ item.title }}</div>
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
