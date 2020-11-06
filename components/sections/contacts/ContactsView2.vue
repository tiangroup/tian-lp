<template>
  <div class="custom-h-spacing contacts--style2">
    <div class="landing__container">
      <div class="contacts__body">
        <h2>
          <editor-text
            :text="section.title"
            :sectionId="section.id"
            field="title"
          />
        </h2>
        <div class="contacts__list mx-ncell">
          <client-only>
            <slick
              :ref="slickRef"
              :options="updatedSlickOptions"
              :key="slickKey"
              @init="handleInit"
            >
              <div
                class="cell"
                :class="{ 'position-relative': isEdit }"
                v-for="item in section.items.filter((i) => i.id)"
                :key="item.id"
              >
                <buttons-item
                  v-if="isEdit"
                  :itemId="item.id"
                  :sectionId="section.id"
                />
                <div class="contacts__item department">
                  <div class="department__title" v-if="item.title || isEdit">
                    <editor-text
                      data-placeholder="Филиал"
                      :text="item.title"
                      :sectionId="section.id"
                      field="title"
                      :itemId="item.id"
                    />
                  </div>
                  <div
                    class="department__address"
                    v-if="item.address || isEdit"
                  >
                    <div class="department__address__text">
                      <editor-text
                        data-placeholder="Введите адрес"
                        :text="item.address"
                        :sectionId="section.id"
                        field="address"
                        :itemId="item.id"
                      />
                      <editor-text
                        data-placeholder="55.159897, 61.402554"
                        :text="item.coords"
                        :sectionId="section.id"
                        field="coords"
                        :itemId="item.id"
                        v-if="isEdit"
                      />
                    </div>
                    <a
                      :data-coords="item.coords"
                      href=""
                      class="department__address__link"
                      @click.prevent="showItemOnMap(getItemCoords(item.coords))"
                      v-if="view === 'view2'"
                      >Показать на карте</a
                    >
                  </div>
                  <div class="department__emails" v-if="item.email || isEdit">
                    <div class="department__email">
                      <editor-html
                        data-placeholder="Введите email"
                        :text="item.email"
                        :sectionId="section.id"
                        field="email"
                        :itemId="item.id"
                      />
                    </div>
                  </div>
                  <div class="department__phones" v-if="item.email || isEdit">
                    <div class="department__phone">
                      <div class="department__phone__link">
                        <editor-html
                          data-placeholder="+7 900 111-22-33"
                          :text="item.phone"
                          :sectionId="section.id"
                          field="phone"
                          :itemId="item.id"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="cell"
                :class="{ 'position-relative': isEdit }"
                v-if="isEdit && (!section.items || !section.items.length)"
              >
                <div class="item__add-button">
                  <buttons-item-add :sectionId="section.id" />
                </div>

                <div class="contacts__item department">
                  <v-skeleton-loader
                    boilerplate
                    type="heading, paragraph"
                  ></v-skeleton-loader>
                </div>
              </div>
            </slick>
            <template slot="placeholder">
              <div class="cells fx-nw overflow-hidden">
                <div
                  class="cell cell-12 cell-sm-6"
                  v-for="item in section.items.filter((i) => i.id)"
                  :key="item.id"
                >
                  <div class="contacts__item department">
                    <div class="department__title" v-if="item.title">
                      {{ item.title }}
                    </div>
                    <div class="department__address" v-if="item.address">
                      <div class="department__address__text">
                        {{ item.address }}
                      </div>
                      <a
                        href=""
                        class="department__address__link"
                        v-if="view === 'view2'"
                        >Показать на карте</a
                      >
                    </div>
                    <div class="department__emails" v-if="item.email">
                      <div class="department__email" v-html="item.email"></div>
                    </div>
                    <div class="department__phones" v-if="item.email">
                      <div class="department__phone">
                        <div
                          class="department__phone__link"
                          v-html="item.phone"
                        ></div>
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
    <contacts-map
      :items="section.items"
      v-if="view === 'view2'"
      @map-ready="defineMyMap"
      :map-key="section.map_key"
    ></contacts-map>
  </div>
</template>

<script>
import ContactsMap from "./ContactsMap";
export default {
  props: {
    section: Object,
    isEdit: Boolean,
    view: {
      type: String,
      default: "view2"
    }
  },
  components: {
    ContactsMap
  },
  data() {
    return {
      currentSlide: 0,
      myMap: {},
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
            breakpoint: 1280,
            settings: {
              arrows: false
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
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
      //console.log("contacts-slick key " + key);
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
      if (!this.isEdit && this.view === "view2") {
        document
          .getElementById(this.section.id)
          .addEventListener("click", this.handleClonedSlides);
      }
    },
    handleClonedSlides(e) {
      e.preventDefault();
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

        if (e.target.classList.contains("department__address__link")) {
          let currCoords = this.computedRealSlides[slideId]
            .querySelector(".department__address__link")
            .click();
        }
      }
    },
    showItemOnMap: function (coords) {
      if (this.myMap) {
        this.$vuetify.goTo(".contacts__map", { duration: 500 });
        this.myMap.setCenter(coords);
        this.myMap.setZoom(16, {
          checkZoomRange: true
        });
      }
    },
    defineMyMap(inst) {
      this.myMap = inst;
    },
    getItemCoords(str) {
      return str.replace(/\s+/g, "").split(",");
    }
  },
  beforeUpdate: function () {
    if (this.$refs[this.slickRef]) {
      this.currentSlide = this.$refs[this.slickRef].currentSlide();
    }
  },
  beforeDestroy: function () {
    if (this.$refs[this.slickRef]) {
      if (document.getElementById(this.section.id) && !this.isEdit) {
        document
          .getElementById(this.section.id)
          .removeEventListener("click", this.handleClonedSlides);
      }
    }
  }
};
</script>
<style scoped>
.department__phone__link a {
  color: var(--text-color);
}
</style>
