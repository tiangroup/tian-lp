<template>
  <div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section" />
    <div
      class="tarifs custom-v-spacing custom-h-spacing bg-primary"
      :class="{ mDark: section.settings.background === 'dark' }"
    >
      <div class="landing__container">
        <h2 v-if="isEdit">
          <editor :text="section.title || ''" :sectionId="section.id" field="title" />
        </h2>
        <h2 v-else>{{ section.title }}</h2>
        <div
          class="tarifs__list cells align-items-stretch justify-content-center"
          v-if="section.items"
        >
          <div
            class="tarifs__item-wrap cell cell-12 cell-sm-6 cell-lg-4 cell-xl-3"
            :class="{'position-relative': isEdit}"
            v-for="item in section.items.filter(i => i.id)"
            :key="item.id"
            :style="styleDiv"
          >
            <buttons-item v-if="isEdit" :itemId="item.id" :sectionId="section.id">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    dark
                    x-small
                    color="green"
                    v-bind="attrs"
                    v-on="on"
                    @click="setSelected({
                      itemId: item.id,
                      field: 'selected',
                      value: !item.selected
                    })"
                  >
                    <v-icon v-if="item.selected">mdi-star</v-icon>
                    <v-icon v-else>mdi-star-outline</v-icon>
                  </v-btn>
                </template>
                <span>Значок "Лучший выбор"</span>
              </v-tooltip>
            </buttons-item>
            <div class="tarifs__item" :class="{'tarifs__item--selected': item.selected}">
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
                <editor
                  :text="item.description || ''"
                  data-placeholder="Описание тарифа"
                  editContent="html"
                  :sectionId="section.id"
                  field="description"
                  :itemId="item.id"
                  v-if="isEdit"
                />
                <div v-else v-html="item.description" class="body-copy"></div>
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
                <!-- <button class="button button-secondary" @click.stop="orderPlan(item)">Заказать</button> -->
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
                        <div class="good-summary__price">{{ item.price}}</div>
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
                </form-popup>
              </div>
            </div>
          </div>
          <div
            class="tarifs__item-wrap cell cell-12 cell-sm-6 cell-lg-4 cell-xl-3"
            v-if="isEdit && (!section.items || !section.items.length)"
          >
            <buttons-item-add :sectionId="section.id" />
          </div>
        </div>

        <v-dialog v-model="dialog" max-width="33rem">
          <div class="der-popup">
            <div class="der-popup__close">
              <button class="button button-icon button-close" @click="dialog = false">
                <span class="sr-only">Закрыть</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L9 9M17 17L9 9M9 9L1 17M9 9L17 1"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
            <div class="der-popup__body">
              <div class="popup-order">
                <form>
                  <div class="form__body">
                    <div class="form__title">Сделать заказ</div>
                    <p>...</p>
                    <div class="good-summary">
                      <div class="good-summary__row">
                        <div class="good-summary__body">
                          <div class="good-summary__title">{{ product.title }}</div>
                          <div class="good-summary__price">{{ product.price}}</div>
                          <input type="text" hidden :value="product.id" />
                        </div>
                      </div>
                      <div class="good-summary__status">
                        <svg
                          width="23"
                          height="23"
                          viewBox="0 0 23 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20.122 10.5168H20.1249C20.6529 10.5168 21.0823 10.9442 21.0832 11.4723C21.0909 14.032 20.1009 16.4422 18.2954 18.2573C16.4909 20.0724 14.0874 21.0757 11.5277 21.0834H11.4999C8.94976 21.0834 6.55105 20.0944 4.74267 18.2956C2.92759 16.4911 1.92421 14.0876 1.91655 11.5279C1.90888 8.96721 2.89884 6.55796 4.70434 4.74287C6.50888 2.92779 8.91238 1.92441 11.4721 1.91675C12.234 1.92825 13.0102 2.00491 13.7539 2.18316C14.2675 2.30775 14.5848 2.82525 14.4602 3.33987C14.3365 3.85354 13.8162 4.16979 13.3044 4.04712C12.7093 3.90337 12.0778 3.843 11.4778 3.83341C9.42988 3.83916 7.50651 4.64225 6.06326 6.09412C4.61905 7.546 3.82746 9.47416 3.83321 11.5221C3.83896 13.5701 4.64205 15.4925 6.09392 16.9367C7.54101 18.3752 9.45959 19.1667 11.4999 19.1667H11.5219C13.5699 19.161 15.4933 18.3579 16.9365 16.906C18.3807 15.4532 19.1723 13.526 19.1665 11.478C19.1656 10.949 19.593 10.5178 20.122 10.5168ZM7.94738 10.8224C8.32209 10.4477 8.92775 10.4477 9.30246 10.8224L11.453 12.9729L17.4876 6.07675C17.8364 5.68096 18.4411 5.63879 18.8398 5.98762C19.2375 6.3355 19.2778 6.94116 18.9289 7.33983L12.2206 15.0065C12.0462 15.2058 11.797 15.3237 11.5315 15.3333H11.4999C11.246 15.3333 11.0025 15.2327 10.8224 15.0525L7.94738 12.1775C7.57267 11.8028 7.57267 11.1971 7.94738 10.8224Z"
                            fill="white"
                          />
                          <mask
                            id="mask0"
                            mask-type="alpha"
                            maskUnits="userSpaceOnUse"
                            x="1"
                            y="1"
                            width="21"
                            height="21"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M20.122 10.5168H20.1249C20.6529 10.5168 21.0823 10.9442 21.0832 11.4723C21.0909 14.032 20.1009 16.4422 18.2954 18.2573C16.4909 20.0724 14.0874 21.0757 11.5277 21.0834H11.4999C8.94976 21.0834 6.55105 20.0944 4.74267 18.2956C2.92759 16.4911 1.92421 14.0876 1.91655 11.5279C1.90888 8.96721 2.89884 6.55796 4.70434 4.74287C6.50888 2.92779 8.91238 1.92441 11.4721 1.91675C12.234 1.92825 13.0102 2.00491 13.7539 2.18316C14.2675 2.30775 14.5848 2.82525 14.4602 3.33987C14.3365 3.85354 13.8162 4.16979 13.3044 4.04712C12.7093 3.90337 12.0778 3.843 11.4778 3.83341C9.42988 3.83916 7.50651 4.64225 6.06326 6.09412C4.61905 7.546 3.82746 9.47416 3.83321 11.5221C3.83896 13.5701 4.64205 15.4925 6.09392 16.9367C7.54101 18.3752 9.45959 19.1667 11.4999 19.1667H11.5219C13.5699 19.161 15.4933 18.3579 16.9365 16.906C18.3807 15.4532 19.1723 13.526 19.1665 11.478C19.1656 10.949 19.593 10.5178 20.122 10.5168ZM7.94738 10.8224C8.32209 10.4477 8.92775 10.4477 9.30246 10.8224L11.453 12.9729L17.4876 6.07675C17.8364 5.68096 18.4411 5.63879 18.8398 5.98762C19.2375 6.3355 19.2778 6.94116 18.9289 7.33983L12.2206 15.0065C12.0462 15.2058 11.797 15.3237 11.5315 15.3333H11.4999C11.246 15.3333 11.0025 15.2327 10.8224 15.0525L7.94738 12.1775C7.57267 11.8028 7.57267 11.1971 7.94738 10.8224Z"
                              fill="white"
                            />
                          </mask>
                          <g mask="url(#mask0)">
                            <rect width="23" height="23" fill="currentColor" />
                            <rect width="23" height="23" fill="currentColor" />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <p>...</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {
    section: Object,
  },
  data: () => ({
    dialog: false,
    product: {},
  }),
  computed: {
    ...mapGetters({
      isEdit: "isEdit",
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    },
  },
  methods: {
    ...mapMutations({
      setItemField: "pages/SET_ITEM_FIELD",
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
        value: payload.value,
      });
      this.$store.dispatch("pages/savePage");
    },
  },
};
</script>