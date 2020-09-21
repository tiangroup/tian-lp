<template>
  <div class="custom-h-spacing contacts--style2">
    <div>
      <div class="services__list mx-ncell">
        <slick :ref="slickRef" :options="updatedSlickOptions" @init="handleInit" :key="slickKey">
          <div
            class="services__item-wrap cell"
            :class="{ 'position-relative': isEdit }"
            v-for="item in section.items.filter(i => i.id)"
            :key="item.id"
          >
            <buttons-item v-if="isEdit" :itemId="item.id" :sectionId="section.id" />
            <div class="services__item">
              <image-item
                divClass="services__image"
                :img="item.img"
                :itemId="item.id"
                :sectionId="section.id"
              />
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

                <div class="services__cta">
                  <div class="cells align-items-center">
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
                      <div class="cell cell-auto">
                        <div class="services__action">
                          <a href class="button button-primary">Заказать услугу</a>
                        </div>
                      </div>
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
            <buttons-item-add :sectionId="section.id" />
          </div>
        </slick>
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
      currentSlide: 0,
      slickOptions: {
        arrows: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        infinite: false,
        prevArrow:
          '<button type="button" class="slick-arrow slick-prev"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L2 13.9706L15.966 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
        nextArrow:
          '<button type="button" class="slick-arrow slick-next"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L15 13.9706L1.03398 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              arrows: false,
            },
          },
        ],
      },
    };
  },
  computed: {
    updatedSlickOptions() {
      return Object.assign(this.slickOptions, {
        infinite: !this.isEdit,
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
        console.log("services-slick key " + key);
      }
      return key;
    },
  },
  methods: {
    handleInit(event, slick) {
      slick.goTo(this.currentSlide, true);
      if (!this.isEdit) {
        const [slickTrack] = slick.$slideTrack;
        let slidesCloned = slickTrack.querySelectorAll(".slick-cloned");
        let slidesRealLength = slickTrack.querySelectorAll(
          ".slick-slide:not(.slick-cloned)"
        ).length;
        for (let m = 0; m < slidesCloned.length; m++) {
          let slideItem = slidesCloned[m];
          let slideDetailLink = slideItem.querySelector(
            ".department__address__link"
          );
          if (slideDetailLink) {
          }
        }
      }
    },
  },
  beforeUpdate: function () {
    this.currentSlide = this.$refs[this.slickRef].currentSlide();
  },
};
</script>
<style>
</style>
