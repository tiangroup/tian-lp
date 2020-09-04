<template>
  <div
    class="benefits custom-h-spacing bg-primary"
    :class="{ mDark: section.settings.background === 'dark' }"
  >
    <div class="landing__container">
      <h2 v-if="isEdit">
        <editor
          :text="section.title || ''"
          :sectionId="section.id"
          field="title"
        />
      </h2>
      <h2 v-else>{{ section.title }}</h2>
      <div class="benefits__intro" v-if="isEdit">
        <editor
          data-placeholder="Небольшой текст, который раскрывает основное преимущество компании"
          :text="section.description || ''"
          :sectionId="section.id"
          field="description"
        />
      </div>
      <div class="benefits__intro" v-else>{{ section.description }}</div>
      <div class="benefits__list cells benefits__list--style2">
        <div
          class="cell cell-6 cell-lg-3"
          v-for="item in section.items.filter(i => i.id)"
          :key="item.id"
          :style="styleDiv"
        >
          <buttons-item
            v-if="isEdit"
            :itemId="item.id"
            :sectionId="section.id"
          />
          <div class="benefits__item">
            <div class="benefits__body">
              <div v-if="isEdit" class="benefits__title">
                <editor
                  data-placeholder="1 000"
                  :text="item.numeral || ''"
                  :sectionId="section.id"
                  field="numeral"
                  :itemId="item.id"
                />
              </div>
              <div v-else class="benefits__title">{{ item.numeral }}</div>

              <div v-if="isEdit" class="benefits__description">
                <editor
                  data-placeholder="Преимуществ у компании"
                  :text="item.title2 || ''"
                  :sectionId="section.id"
                  field="title2"
                  :itemId="item.id"
                />
              </div>
              <div v-else class="benefits__description">{{ item.title2 }}</div>
            </div>
          </div>
        </div>
        <div
          class="cell cell-6 cell-lg-3"
          v-if="isEdit && (!section.items || !section.items.length)"
        >
          <buttons-item-add :sectionId="section.id" />
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
    }
  }
};
</script>
