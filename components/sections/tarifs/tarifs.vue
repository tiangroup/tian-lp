<template>
  <div :class="{ 'position-relative': _isEdit }" :id="section.id">
    <buttons-section v-if="_isEdit" :section="section" />
    <div
      class="tarifs custom-v-spacing custom-h-spacing bg-primary"
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
        <div
          class="tarifs__list cells align-items-stretch justify-content-center"
          v-if="section.items"
        >
          <div
            class="tarifs__item-wrap cell cell-12 cell-sm-6 cell-lg-4 cell-xl-3"
            :class="{ 'position-relative': isEdit }"
            v-for="item in section.items.filter(i => i.id)"
            :key="item.id"
            :style="styleDiv"
          >
            <buttons-item
              v-if="isEdit"
              :itemId="item.id"
              :sectionId="section.id"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    dark
                    x-small
                    color="green"
                    v-bind="attrs"
                    v-on="on"
                    @click="
                      setSelected({
                        itemId: item.id,
                        field: 'selected',
                        value: !item.selected
                      })
                    "
                  >
                    <v-icon v-if="item.selected">mdi-star</v-icon>
                    <v-icon v-else>mdi-star-outline</v-icon>
                  </v-btn>
                </template>
                <span>Значок "Лучший выбор"</span>
              </v-tooltip>
            </buttons-item>
            <div
              class="tarifs__item"
              :class="{ 'tarifs__item--selected': item.selected }"
            >
              <div class="tarifs__title">
                <editor
                  :text="item.title || ''"
                  data-placeholder="Название тарифа"
                  :sectionId="section.id"
                  field="title"
                  :itemId="item.id"
                  v-if="isEdit"
                />
                <span v-else>{{ item.title }}</span>
              </div>
              <div class="tarifs__punch">
                <editor
                  :text="item.target || ''"
                  data-placeholder="Для кого это предложение"
                  :sectionId="section.id"
                  field="target"
                  :itemId="item.id"
                  v-if="isEdit"
                />
                <span v-else>{{ item.target }}</span>
              </div>
              <div class="tarifs__description">
                <div class="body-copy">
                  <editor
                    :text="item.description || ''"
                    data-placeholder="Описание тарифа"
                    editContent="html"
                    :sectionId="section.id"
                    field="description"
                    :itemId="item.id"
                    v-if="isEdit"
                  />
                  <div v-else v-html="item.description"></div>
                </div>
              </div>
              <div class="tarifs__price">
                <editor
                  :text="item.price || ''"
                  data-placeholder="10 000 руб."
                  :sectionId="section.id"
                  field="price"
                  :itemId="item.id"
                  v-if="isEdit"
                />
                <span v-else>{{ item.price }}</span>
              </div>
              <div class="tarifs__action">
                <form-popup
                  :section="section"
                  field="form"
                  :hiddenData="item.title"
                  buttonClass="button-secondary"
                >
                  <div class="good-summary">
                    <div class="good-summary__row">
                      <div class="good-summary__body">
                        <div class="good-summary__title">{{ item.title }}</div>
                        <div class="good-summary__price">{{ item.price }}</div>
                      </div>
                    </div>
                    <div class="good-summary__status">
                      <svg
                        viewBox="0 0 24 24"
                        height="23"
                        width="23"
                        fill="currentColor"
                      >
                        <path
                          d="M21 11.080v0.92c-0.001 2.485-1.009 4.733-2.64 6.362s-3.88 2.634-6.365 2.632-4.734-1.009-6.362-2.64-2.634-3.879-2.633-6.365 1.009-4.733 2.64-6.362 3.88-2.634 6.365-2.633c1.33 0.001 2.586 0.289 3.649 0.775 0.502 0.23 1.096 0.008 1.325-0.494s0.008-1.096-0.494-1.325c-1.327-0.606-2.866-0.955-4.479-0.956-3.037-0.002-5.789 1.229-7.78 3.217s-3.224 4.74-3.226 7.777 1.229 5.789 3.217 7.78 4.739 3.225 7.776 3.226 5.789-1.229 7.78-3.217 3.225-4.739 3.227-7.777v-0.92c0-0.552-0.448-1-1-1s-1 0.448-1 1zM21.293 3.293l-9.293 9.302-2.293-2.292c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414l3 3c0.391 0.391 1.024 0.39 1.415 0l10-10.010c0.39-0.391 0.39-1.024-0.001-1.414s-1.024-0.39-1.414 0.001z"
                        />
                      </svg>
                    </div>
                  </div>
                </form-popup>
              </div>
            </div>
          </div>
          <div
            class="tarifs__item-wrap cell cell-12 cell-sm-6 cell-lg-4 cell-xl-3"
            v-if="isEdit && (!section.items || !section.items.length)"
          >
            <div class="item__add-button">
              <buttons-item-add :sectionId="section.id" />
            </div>
            <div class="tarifs__item">
              <div class="tarifs__title">
                <v-skeleton-loader
                  boilerplate
                  type="heading"
                  width="100%"
                ></v-skeleton-loader>
              </div>
              <div class="tarifs__description">
                <v-skeleton-loader
                  boilerplate
                  type="paragraph@3"
                ></v-skeleton-loader>
              </div>
              <div class="tarifs__action">
                <v-skeleton-loader
                  boilerplate
                  type="heading"
                ></v-skeleton-loader>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {
    section: Object
  },
  data: () => ({
    dialog: false,
    product: {}
  }),
  computed: {
    ...mapGetters({
      _isEdit: "isEdit",
      isSectionEdit: "isSectionEdit"
    }),
    isEdit() {
      return this._isEdit && this.isSectionEdit(this.section);
    },
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    }
  },
  methods: {
    ...mapMutations({
      setItemField: "pages/SET_ITEM_FIELD"
    }),
    orderPlan(item) {
      this.dialog = true;
      this.product = item;
    },
    setSelected(payload) {
      this.setItemField({
        sectionId: this.section.id,
        itemId: payload.itemId,
        items: "items",
        field: payload.field,
        value: payload.value
      });
      this.$store.dispatch("pages/savePage");
    }
  }
};
</script>
<style scoped>
.tarifs >>> .v-skeleton-loader__heading,
.tarifs >>> .v-skeleton-loader__text {
  background-color: var(--separator-color);
}
.tarifs__title >>> .v-skeleton-loader__heading {
  margin-left: auto;
  margin-right: auto;
}
</style>
