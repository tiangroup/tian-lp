<template>
  <div
    class="benefits custom-h-spacing bg-primary"
    :class="{ mDark: section.settings.background === 'dark' }"
  >
    <div class="landing__container">
      <h2>
        <editor-text
          :text="section.title"
          :sectionId="section.id"
          field="title"
        />
      </h2>

      <div class="benefits__intro">
        <editor-text
          :text="section.description"
          :sectionId="section.id"
          field="description"
          data-placeholder="Небольшой текст, который раскрывает основное преимущество компании"
        />
      </div>

      <div class="benefits__list cells benefits__list--style3">
        <div class="cell cell-12 cell-sm-6 cell-lg-4 cell-xl-3">
          <div
            class="benefits__item benefits__item--lg-right"
            v-for="item in items1.filter((i) => i.id)"
            :key="item.id"
            :style="styleDiv"
          >
            <buttons-item
              v-if="isEdit"
              :itemId="item.id"
              :sectionId="section.id"
            />
            <div class="benefits__icon">
              <svg
                width="9"
                height="8"
                viewBox="0 0 9 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.4668 4.20002L3.89346 6.53335L7.53346 0.93335"
                  stroke="currentColor"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div class="benefits__body">
              <div class="benefits__title">
                <editor-text
                  data-placeholder="Преимущество"
                  :text="item.title"
                  :sectionId="section.id"
                  field="title"
                  :itemId="item.id"
                />
              </div>

              <div class="benefits__description">
                <editor-html
                  data-placeholder="Краткое описание преимущества"
                  :text="item.description"
                  :sectionId="section.id"
                  field="description"
                  :itemId="item.id"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="cell cell-12 benefits__illustration-wrap cell-lg-4 cell-xl-6"
        >
          <image-item
            divClass="benefits__illustration"
            :img="section.img"
            :items="null"
            field="img"
            :sectionId="section.id"
            imageStyle="promo1"
          />
        </div>
        <div class="cell cell-12 cell-sm-6 cell-lg-4 cell-xl-3">
          <div
            class="benefits__item"
            v-for="item in items2.filter((i) => i.id)"
            :key="item.id"
            :style="styleDiv"
          >
            <buttons-item
              v-if="isEdit"
              :itemId="item.id"
              :sectionId="section.id"
            />
            <div class="benefits__icon">
              <svg
                width="9"
                height="8"
                viewBox="0 0 9 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.4668 4.20002L3.89346 6.53335L7.53346 0.93335"
                  stroke="currentColor"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div class="benefits__body">
              <div class="benefits__title">
                <editor-text
                  data-placeholder="Преимущество"
                  :text="item.title"
                  :sectionId="section.id"
                  field="title"
                  :itemId="item.id"
                />
              </div>

              <div class="benefits__description">
                <editor-html
                  data-placeholder="Краткое описание преимущества"
                  :text="item.description"
                  :sectionId="section.id"
                  field="description"
                  :itemId="item.id"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    section: Object,
    isEdit: Boolean
  },
  computed: {
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
    items1() {
      const len = Math.ceil(this.section.items.length / 2);
      return this.section.items.filter((item, index) => index < len);
    },
    items2() {
      const len = Math.ceil(this.section.items.length / 2);
      return this.section.items.filter((item, index) => index >= len);
    }
  }
};
</script>
