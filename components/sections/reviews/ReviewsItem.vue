<template>
  <div class="reviews__item-wrap cell" :class="{ 'position-relative': isEdit }">
    <buttons-item v-if="isEdit" :itemId="item.id" :sectionId="sectionId" />
    <div class="reviews__item h-100">
      <div
        class="reviews__image-wrap"
        :class="{ 'pic-enlarge': !isEdit }"
        v-if="view === 'view2'"
      >
        <image-item
          divClass="reviews__image"
          :img="item.img"
          :itemId="item.id"
          :sectionId="sectionId"
          imageStyle="resize_v_md"
          imageLoader="resize_v_md,resize_xl"
        />
      </div>
      <div class="reviews__body">
        <div class="reviews__person">
          <div class="reviews__person__name">
            <editor-text
              data-placeholder="Имя Фамилия"
              :text="item.name"
              :sectionId="sectionId"
              field="name"
              :itemId="item.id"
            />
          </div>
          <div class="reviews__person__position">
            <editor-text
              data-placeholder="Должность"
              :text="item.position"
              :sectionId="sectionId"
              field="position"
              :itemId="item.id"
            />
          </div>
        </div>

        <div class="reviews__text" v-if="isEdit">
          {{ truncateText(item.text, wordsNum) || "Введите текст отзыва" }}
        </div>
        <div class="reviews__text" v-else>
          {{ truncateText(item.text, wordsNum) }}
        </div>

        <div class="reviews__info" v-if="isEdit">
          <v-text-field
            :value="formatDate(computedReviewDate)"
            label="Дата отзыва"
            readonly
          ></v-text-field>
        </div>
        <div class="reviews__info align-items-center" v-else>
          <button class="reviews__readmore" v-if="isCropped">
            Читать полностью
            <svg
              width="5"
              height="8"
              viewBox="0 0 5 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L4 4L1 7" stroke="currentColor" />
            </svg>
          </button>
          <div class="reviews__date" v-if="item.date">
            {{ formatDate(item.date) }}
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
    sectionId: String,
    isEdit: Boolean,
    view: String
  },
  data: () => ({
    isCropped: false
  }),
  computed: {
    computedReviewDate() {
      return this.item.date
        ? this.item.date
        : new Date().toISOString().substr(0, 10);
    },
    wordsNum() {
      return this.view === "view1" ? 25 : 60;
    }
  },
  methods: {
    truncateText(textToTruncate, words) {
      if (!textToTruncate) {
        return "";
      }
      var currentWords = textToTruncate.split(" ");
      var currentWordsQty = currentWords.length;
      if (currentWordsQty <= words) {
        return textToTruncate;
      }
      this.isCropped = true;
      return currentWords.slice(0, words + 1).join(" ") + "...";
    },
    formatDate(dateToFormat) {
      const [year, month, day] = dateToFormat.split("-");
      return `${day}.${month}.${year}`;
    }
  }
};
</script>
<style scoped>
.v-text-field {
  max-width: 10rem;
}
</style>
