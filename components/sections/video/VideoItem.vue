<template>
  <div class="video__item-wrap cell">
    <div class="video__item" @click.once="updateVideoShown()">
      <div class="video__cover" v-if="!videoShown">
        <img v-if="item.link" :src="videoCover" />
      </div>
      <div class="video__title" v-if="!videoShown">{{ item.title }}</div>
      <div class="video__container" v-if="videoShown">
        <iframe
          width="560"
          height="315"
          :src="item.link"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object,
    sectionId: String,
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
  methods: {
    updateVideoShown() {
      this.videoShown = true;
    },
  },
};
</script>