<template>
  <div class="reviews__item-wrap cell" :class="{ 'position-relative': isEdit }">
    <buttons-item
      v-if="isEdit"
      :itemId="item.id"
      :sectionId="sectionId"
      @onAction="$emit('item-update')"
    />
    <div class="reviews__item">
      <div
        class="reviews__image-wrap"
        :class="{ 'pic-enlarge': !isEdit }"
        @click="$emit('show-gallery')"
        v-if="view === 'view2'"
      >
        <image-item
          divClass="reviews__image"
          :img="item.img"
          :itemId="item.id"
          :sectionId="sectionId"
        />
      </div>
      <div class="reviews__body">
        <div class="reviews__person">
          <div class="reviews__person__name">
            <editor
              data-placeholder="Имя Фамилия"
              :text="item.name || ''"
              :sectionId="sectionId"
              field="name"
              :itemId="item.id"
              v-if="isEdit"
            />
            <span v-else>{{ item.name }}</span>
          </div>
          <div class="reviews__person__position">
            <editor
              data-placeholder="Должность"
              :text="item.position || ''"
              :sectionId="sectionId"
              field="position"
              :itemId="item.id"
              v-if="isEdit"
            />
            <span v-else>{{ item.position }}</span>
          </div>
        </div>

        <div class="reviews__text" @click="$emit('change-desc')" v-if="isEdit">
          {{ truncateText(item.text, 44) || "Введите текст отзыва" }}
        </div>
        <div class="reviews__text" v-else>
          {{ truncateText(item.text, 44) }}
        </div>

        <div class="reviews__info" v-if="isEdit">
          <v-text-field
            :value="formatDate(computedReviewDate)"
            label="Дата отзыва"
            readonly
            @click="$emit('change-date')"
          ></v-text-field>
        </div>
        <div class="reviews__info align-items-center" v-else>
          <button
            class="reviews__readmore"
            v-if="isCropped"
            @click="$emit('show-review')"
          >
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
      return currentWords.slice(0, words + 1).join(" ");
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
