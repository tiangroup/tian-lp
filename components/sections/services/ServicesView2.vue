<template>
  <div>
    <div class="services__list mx-ncell">
      <client-only>
        <slick
          :ref="slickRef"
          :options="updatedSlickOptions"
          @init="handleInit"
          :key="slickKey"
        >
          <div
            class="services__item-wrap cell"
            :class="{ 'position-relative': isEdit }"
            v-for="item in section.items.filter((i) => i.id)"
            :key="item.id"
          >
            <buttons-item
              v-if="isEdit"
              :itemId="item.id"
              :sectionId="section.id"
            />
            <div class="services__item">
              <div class="services__body body-copy">
                <image-item
                  divClass="services__image"
                  :img="item.img"
                  :itemId="item.id"
                  :sectionId="section.id"
                  imageStyle="sq_lg"
                />
                <div class="services__title">
                  <editor-text
                    data-placeholder="Название услуги"
                    :text="item.title"
                    :sectionId="section.id"
                    field="title"
                    :itemId="item.id"
                  />
                </div>
                <div class="services__description">
                  <editor-html
                    data-placeholder="Описание услуги"
                    :text="item.description"
                    :sectionId="section.id"
                    field="description"
                    :itemId="item.id"
                  />
                </div>
              </div>

              <div class="services__cta">
                <div class="cells justify-content-between align-items-center">
                  <div class="cell cell-auto">
                    <div class="services__price">
                      <editor-text
                        data-placeholder="от 000 руб."
                        :text="item.price"
                        :sectionId="section.id"
                        field="price"
                        :itemId="item.id"
                      />
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

          <div
            class="services__item-wrap cell"
            v-if="isEdit && (!section.items || !section.items.length)"
          >
            <div class="services__item">
              <div class="item__add-button">
                <buttons-item-add :sectionId="section.id" />
              </div>

              <div class="services__body body-copy">
                <div class="services__image no-image"></div>
                <div class="services__description">
                  <v-skeleton-loader
                    boilerplate
                    type="heading, paragraph@2"
                  ></v-skeleton-loader>
                </div>
              </div>
              <div class="services__cta">
                <v-skeleton-loader
                  boilerplate
                  type="chip@2"
                ></v-skeleton-loader>
              </div>
            </div>
          </div>
        </slick>

        <template slot="placeholder">
          <div class="cells fx-nw overflow-hidden">
            <div
              class="services__item-wrap cell cell-12 cell-lg-6"
              v-for="item in section.items.filter((i) => i.id)"
              :key="item.id"
            >
              <div class="services__item">
                <div class="services__body body-copy">
                  <div class="services__image">
                    <img :src="$site_img(item.img, 'sq_lg')" v-if="item.img" />
                  </div>
                  <div class="services__title">{{ item.title }}</div>
                  <div
                    class="services__description"
                    v-html="item.description"
                  ></div>
                </div>

                <div class="services__cta">
                  <div class="cells align-items-center">
                    <div class="cell cell-auto">
                      <div class="services__price">{{ item.price }}</div>
                    </div>
                    <div class="cell cell-auto">
                      <div class="services__action">
                        <a href class="button button-primary">Заказать</a>
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
</template>

<script>
export default {
  props: {
    section: Object,
    isEdit: Boolean,
    view: {
      type: String,
      default: "view2"
    }
  },
  components: {},
  data() {
    return {
      currentItem: {},
      currentSlide: 0,
      dialogOrderService: false,
      slickOptions: {
        arrows: true,
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        draggable: false,
        infinite: false,
        prevArrow:
          '<button type="button" class="slick-arrow slick-prev"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L2 13.9706L15.966 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
        nextArrow:
          '<button type="button" class="slick-arrow slick-next"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L15 13.9706L1.03398 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              arrows: false
            }
          }
        ]
      }
    };
  },
  computed: {
    updatedSlickOptions() {
      return Object.assign(this.slickOptions, {
        infinite: !this.isEdit,
        draggable: !this.isEdit
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
    }
  },
  methods: {
    handleInit(event, slick) {
      if (this.currentSlide) {
        slick.goTo(this.currentSlide, true);
      }
      if (!this.isEdit) {
        document
          .getElementById(this.section.id)
          .addEventListener("click", this.handleClonedSlides);
      }
    },
    handleClonedSlides(e) {
      if (e.target.closest(".slick-cloned")) {
        let slideIndex = Number(
          e.target.closest(".slick-cloned").getAttribute("data-slick-index")
        );
        let slideId = 0;
        if (slideIndex > 0) {
          slideId = slideIndex % this.computedRealSlides.length;
        } else if (slideIndex < 0) {
          slideId = this.computedRealSlides.length + slideIndex;
        }
        if (e.target.closest(".services__action")) {
          this.computedRealSlides[slideId].querySelector(".button").click();
        }
      }
    }
  },
  beforeUpdate: function () {
    if (this.$refs[this.slickRef]) {
      this.currentSlide = this.$refs[this.slickRef].currentSlide();
    }
  },
  beforeDestroy: function () {
    if (this.$refs[this.slickRef]) {
      if (document.getElementById(this.section.id)) {
        document
          .getElementById(this.section.id)
          .removeEventListener("click", this.handleClonedSlides);
      }
    }
  }
};
</script>
