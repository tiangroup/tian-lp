<template>
  <div class="services__tbps tbps">
    <div class="services__reveal">
      <div class="reveal">
        <input
          class="reveal__input"
          type="checkbox"
          :id="'sr' + this.section.id"
        />
        <label class="reveal__toggle" :for="'sr' + this.section.id">
          Выберите из списка
        </label>
        <div class="reveal__content">
          <div class="services__reveal__content">
            <div class="tbps__labels">
              <div
                class="tbps__label"
                v-for="(item, itemIndex) in section.items.filter((i) => i.id)"
                :key="'nav-' + item.id"
              >
                <a
                  :href="'#' + item.id"
                  class="tbps__label__link"
                  :class="{
                    'tbps__label__link--active': isActiveItem(itemIndex),
                  }"
                  @click.prevent="changeActiveItem(itemIndex)"
                  >{{ item.title || "Новая услуга" }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="services__panels">
      <div
        class="tbps__panels display-flex align-items-stretch justify-content-start"
      >
        <div
          v-for="(item, itemIndex) in section.items.filter((i) => i.id)"
          :key="item.id"
          :id="item.id"
          class="tbps__panel"
          :class="{
            'position-relative': isEdit,
            'tbps__panel--active': isActiveItem(itemIndex),
            'tbps__panel--in': isTransitioning,
          }"
        >
          <buttons-item
            v-if="isEdit"
            :itemId="item.id"
            :sectionId="section.id"
          />
          <div class="cell h-100">
            <div class="services__item">
              <div class="cell-12 mb-15px">
                <div class="cells">
                  <div class="cell cell-12 cell-sm-3 order-sm-2">
                    <image-item
                      divClass="services__image"
                      :img="item.img"
                      :itemId="item.id"
                      :sectionId="section.id"
                    />
                  </div>
                  <div class="cell cell-12 cell-sm-9 order-sm-1">
                    <div class="services__body body-copy">
                      <div class="services__title">
                        <editor
                          data-placeholder="Название услуги"
                          :text="item.title || ''"
                          :sectionId="section.id"
                          field="title"
                          :itemId="item.id"
                          v-if="isEdit"
                        />
                        <span v-else>{{ item.title }}</span>
                      </div>
                      <div class="services__description">
                        <editor
                          data-placeholder="Описание услуги"
                          :text="item.description || ''"
                          :sectionId="section.id"
                          field="description"
                          :itemId="item.id"
                          editContent="html"
                          v-if="isEdit"
                        />
                        <div v-else v-html="item.description"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cell-12 mt-a">
                <div class="services__cta">
                  <div class="cells justify-content-between align-items-center">
                    <div class="cell cell-auto">
                      <div class="services__price">
                        <editor
                          data-placeholder="от 5 000 руб."
                          :text="item.price || ''"
                          :sectionId="section.id"
                          field="price"
                          :itemId="item.id"
                          v-if="isEdit"
                        />
                        <span v-else>{{ item.price }}</span>
                      </div>
                    </div>
                    <div class="cell cell-auto">
                      <div class="services__action">
                        <button
                          class="button button-primary"
                          @click="showOrderDialog(item)"
                        >
                          Заказать
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form-dialog
      :section="section"
      field="form_order"
      v-model="dialogOrderService"
    >
      <div class="good-summary">
        <div class="good-summary__row">
          <div class="good-summary__image" v-if="currentItem.img">
            <img :src="$images.src(currentItem.img)" />
          </div>
          <div class="good-summary__body">
            <div class="good-summary__title">{{ currentItem.title }}</div>
            <div class="good-summary__price">{{ currentItem.price }}</div>
          </div>
        </div>
        <div class="good-summary__status">
          <svg viewBox="0 0 24 24" height="23" width="23" fill="currentColor">
            <path
              d="M21 11.080v0.92c-0.001 2.485-1.009 4.733-2.64 6.362s-3.88 2.634-6.365 2.632-4.734-1.009-6.362-2.64-2.634-3.879-2.633-6.365 1.009-4.733 2.64-6.362 3.88-2.634 6.365-2.633c1.33 0.001 2.586 0.289 3.649 0.775 0.502 0.23 1.096 0.008 1.325-0.494s0.008-1.096-0.494-1.325c-1.327-0.606-2.866-0.955-4.479-0.956-3.037-0.002-5.789 1.229-7.78 3.217s-3.224 4.74-3.226 7.777 1.229 5.789 3.217 7.78 4.739 3.225 7.776 3.226 5.789-1.229 7.78-3.217 3.225-4.739 3.227-7.777v-0.92c0-0.552-0.448-1-1-1s-1 0.448-1 1zM21.293 3.293l-9.293 9.302-2.293-2.292c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414l3 3c0.391 0.391 1.024 0.39 1.415 0l10-10.010c0.39-0.391 0.39-1.024-0.001-1.414s-1.024-0.39-1.414 0.001z"
            />
          </svg>
        </div>
      </div>
    </form-dialog>
  </div>
</template>

<script>
export default {
  props: {
    section: Object,
    isEdit: Boolean,
    view: {
      type: String,
      default: "view2",
    },
  },
  components: {},
  data() {
    return {
      currentItem: {},
      dialogOrderService: false,
      isTransitioning: false,
      itemToShow: 0,
    };
  },
  computed: {
    itemsCount() {
      return this.section.items.length;
    },
    currentSection() {
      return document.getElementById(this.section.id);
    },
  },
  methods: {
    changeActiveItem(index) {
      this.itemToShow = index;
      if (this.currentSection.querySelector(".reveal__input").checked) {
        this.currentSection.querySelector(".reveal__input").checked = false;
      }
      console.log("start");
      this.isTransitioning = true;
      setTimeout(() => {
        this.isTransitioning = false;
        console.log("inside");
      }, 400);
      console.log("finished");
    },
    isActiveItem(itemIndex) {
      return itemIndex === this.itemToShow ? true : false;
    },
    showOrderDialog(item) {
      this.currentItem = item;
      this.dialogOrderService = true;
    },
  },
};
</script>
<style scoped>
.services .tbps__panel {
  flex-basis: 0;
  flex-grow: 0;
  flex-shrink: 0;
  overflow: hidden;
  transition: flex-basis 0.4s;
}
.services .tbps__panel--active,
.services .tbps__panel--active + .tbps__panel {
  flex-basis: 100%;
}
@media (min-width: 1280px) {
  .services .tbps__panel--active,
  .services .tbps__panel--active + .tbps__panel {
    flex-basis: 56rem;
  }
}
</style>