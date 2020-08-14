<template>
  <div class="video__item-wrap cell">
    <div class="video__item" :class="{'position-relative': isEdit}">
      <buttons-item
        :itemId="item.id"
        :sectionId="sectionId"
        @onAction="$emit('iupdate')"
        v-if="isEdit"
      />
      <div
        v-if="isEdit"
        class="video__cover video__cover--editable"
        title="Клик - изменить ссылку на видео"
        @click="$emit('change-link')"
      >
        <img v-if="item.link" :src="videoCover" />
      </div>
      <div v-else class="video__cover">
        <img v-if="item.link" :src="videoCover" />
      </div>
      <div class="video__title">
        <editor
          data-placeholder="Название видео"
          :text="item.title || ''"
          :sectionId="sectionId"
          field="title"
          :itemId="item.id"
          v-if="isEdit"
        />
        <span v-else>{{ videoCover}}</span>
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
  data: () => ({
    videoShown: false,
  }),
  computed: {
    videoId() {
      const youtubeRegex = /^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/;
      const youtubeId = this.item.link.match(youtubeRegex);
      return youtubeId[2];
    },
    videoCover() {
      return (
        "https://img.youtube.com/vi/" + this.videoId + "/maxresdefault.jpg"
      );
    },
  },
  methods: {},
};
</script>