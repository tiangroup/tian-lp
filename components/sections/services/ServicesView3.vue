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
              <div
                class="tbps__label"
                v-if="isEdit && (!section.items || !section.items.length)"
              >
                <v-skeleton-loader
                  boilerplate
                  type="sentences, paragraph@2, sentences, text"
                ></v-skeleton-loader>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="services__panels">
      <div class="tbps__panels">
        <client-only>
          <slick
            :ref="slickRef"
            :options="updatedSlickOptions"
            @init="handleInit"
            :key="slickKey"
          >
            <div
              v-for="(item, itemIndex) in section.items.filter((i) => i.id)"
              :key="item.id"
              :id="item.id"
              class="tbps__panel h-100"
              :class="{
                'position-relative': isEdit,
                'tbps__panel--active': isActiveItem(itemIndex),
              }"
              @click="gotoClickedSlide(itemIndex)"
            >
              <buttons-item
                v-if="isEdit"
                :itemId="item.id"
                :sectionId="section.id"
              />
              <div class="services__item h-100">
                <div class="cell-12 mb-25px">
                  <div class="cells">
                    <div class="cell cell-12 cell-sm-3 order-sm-2">
                      <image-item
                        divClass="services__image"
                        :img="item.img"
                        :itemId="item.id"
                        :sectionId="section.id"
                        imageStyle="sq_lg"
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
                    <div
                      class="cells justify-content-between align-items-center"
                    >
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
                            @click="$emit('call-order-dialog', item)"
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

            <div
              class="tbps__panel h-100"
              v-if="isEdit && (!section.items || !section.items.length)"
            >
              <div class="services__item h-100">
                <div class="item__add-button">
                  <buttons-item-add :sectionId="section.id" />
                </div>

                <div class="cell-12 mb-25px">
                  <div class="cells">
                    <div class="cell cell-12 cell-sm-3 order-sm-2">
                      <div class="services__image no-image"></div>
                    </div>
                    <div class="cell cell-12 cell-sm-9 order-sm-1">
                      <div class="services__body body-copy">
                        <v-skeleton-loader
                          dark
                          boilerplate
                          type="heading, paragraph@2"
                          min-height="200"
                        ></v-skeleton-loader>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cell-12 mt-a">
                  <div class="services__cta">
                    <v-spacer></v-spacer>
                    <v-skeleton-loader
                      dark
                      boilerplate
                      type="chip"
                    ></v-skeleton-loader>
                  </div>
                </div>
              </div>
            </div>
          </slick>
          <template slot="placeholder">
            <div class="display-flex align-items-stretch">
              <div
                v-for="(item, itemIndex) in section.items.filter((i) => i.id)"
                :key="item.id"
                class="tbps__panel"
                :class="{
                  'tbps__panel--active': isActiveItem(itemIndex),
                }"
              >
                <div class="services__item h-100">
                  <div class="cell-12 mb-25px">
                    <div class="cells">
                      <div class="cell cell-12 cell-sm-3 order-sm-2"></div>
                      <div class="cell cell-12 cell-sm-9 order-sm-1">
                        <div class="services__body body-copy">
                          <div class="services__title">
                            {{ item.title }}
                          </div>
                          <div
                            class="services__description"
                            v-html="item.description"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="cell-12 mt-a">
                    <div class="services__cta">
                      <div
                        class="cells justify-content-between align-items-center"
                      >
                        <div class="cell cell-auto">
                          <div class="services__price">
                            {{ item.price }}
                          </div>
                        </div>
                        <div class="cell cell-auto">
                          <div class="services__action">
                            <button class="button button-primary">
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
          </template>
        </client-only>
      </div>
    </div>
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
      itemToShow: 0,
      slickOptions: {
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        infinite: false,
        prevArrow:
          '<button type="button" class="slick-arrow slick-prev"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L2 13.9706L15.966 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
        nextArrow:
          '<button type="button" class="slick-arrow slick-next"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L15 13.9706L1.03398 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
      },
    };
  },
  computed: {
    itemsCount() {
      return this.section.items.length;
    },
    currentSection() {
      return document.getElementById(this.section.id);
    },
    updatedSlickOptions() {
      return Object.assign(this.slickOptions, {
        draggable: !this.isEdit,
      });
    },
    slickRef() {
      return "slick" + this.section.id;
    },
    itemsCount() {
      return this.section.items.length;
    },
    slickKey() {
      let key = "" + this.isEdit;
      if (this.itemsCount) {
        for (var i = 0; i < this.itemsCount; i++) {
          key += this.section.items[i].id;
        }
      }
      //console.log("services-slick key " + key);
      return key;
    },
    computedRealSlides() {
      return document
        .getElementById(this.section.id)
        .querySelectorAll(".slick-slide:not(.slick-cloned)");
    },
  },
  methods: {
    changeActiveItem: function (index) {
      this.itemToShow = index;
      if (this.currentSection.querySelector(".reveal__input").checked) {
        this.currentSection.querySelector(".reveal__input").checked = false;
      }
      this.$refs[this.slickRef].goTo(index);
    },
    isActiveItem(itemIndex) {
      return itemIndex === this.itemToShow ? true : false;
    },
    handleInit(event, slick) {
      if (this.itemToShow) {
        slick.goTo(this.itemToShow, true);
      }
    },
    gotoClickedSlide: function (itemIndex) {
      if (!this.isActiveItem(itemIndex)) {
        this.changeActiveItem(itemIndex);
      }
    },
  },
};
</script>
<style scoped>
>>> .v-skeleton-loader__heading {
  margin-bottom: 1rem;
}
</style>
