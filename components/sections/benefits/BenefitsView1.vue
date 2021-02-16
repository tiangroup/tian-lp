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
          data-placeholder="Небольшой текст, который раскрывает основное преимущество компании"
          :text="section.description"
          :sectionId="section.id"
          field="description"
        />
      </div>
      <div class="benefits__list cells benefits__list--style1">
        <div
          class="cell cell-12 cell-sm-6 cell-lg-3"
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
            <image-item
              divClass="benefits__image"
              :img="item.img"
              :itemId="item.id"
              :sectionId="section.id"
              imageStyle="rect_lg"
            />

            <div class="benefits__body">
              <div class="benefits__title">
                <editor-text
                  data-placeholder="Название преимущества"
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
          class="cell cell-12 cell-sm-6 cell-lg-3"
          v-if="isEdit && (!section.items || !section.items.length)"
        >
          <div class="item__add-button">
            <buttons-item-add :sectionId="section.id" />
          </div>
          <div class="benefits__image no-image"></div>
          <v-skeleton-loader boilerplate type="article"></v-skeleton-loader>
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
