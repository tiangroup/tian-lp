<template>
  <div class="video__item-wrap cell">
    <div
      class="video__item"
      :class="{ 'position-relative': isEdit }"
      @click="$emit('gallery-call')"
    >
      <buttons-item :itemId="item.id" :sectionId="sectionId" v-if="isEdit" />
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
      <div class="video__title" v-if="item.title">
        <editor-text
          data-placeholder="Название видео"
          :text="item.title"
          :sectionId="sectionId"
          field="title"
          :itemId="item.id"
        />
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
  data: () => ({
    videoShown: false
  }),
  computed: {
    videoId() {
      if (!this.item.link) {
        return;
      }
      const youtubeRegex =
        /^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/;
      const youtubeId = this.item.link.match(youtubeRegex);
      return youtubeId[2];
    },
    videoCover() {
      if (!this.item.link) {
        return "";
      }
      return "https://img.youtube.com/vi/" + this.videoId + "/0.jpg";
    }
  },
  methods: {}
};
</script>