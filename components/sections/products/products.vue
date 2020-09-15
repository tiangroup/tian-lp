<template>
  <div :class="{ 'position-relative': isEdit }" :id="section.id">
    <buttons-section v-if="isEdit" :section="section" />
    <div
      class="products custom-v-spacing-2 custom-h-spacing bg-secondary"
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
          class="products__list cells"
          v-if="section.items && section.settings.view === 'view1'"
        >
          <products-item
            class="cell-12 cell-sm-6 cell-lg-4 cell-xl-3"
            v-for="item in section.items.filter(i => i.id)"
            :key="item.id"
            :item="item"
            :sectionId="section.id"
            :isEdit="isEdit"
            @item-update="onItemsChange"
            @show-details="showProductDetails(item)"
            @show-order-form="showOrderForm(item)"
          ></products-item>
          <div
            class="products__item-wrap cell cell-12 cell-sm-6 cell-lg-4 cell-xl-3"
            v-if="isEdit && (!section.items || !section.items.length)"
          >
            <buttons-item-add :sectionId="section.id" />
          </div>
        </div>
        <div class="products__list mx-ncell" v-if="view === 'view2'">
          <slick :ref="slickRef" :options="updatedSlickOptions" v-if="isSlick">
            <products-item
              v-for="item in section.items.filter(i => i.id)"
              :key="item.id"
              :item="item"
              :sectionId="section.id"
              :isEdit="isEdit"
              @item-update="onItemsChange"
            ></products-item>
            <div
              class="products__item-wrap cell"
              v-if="isEdit && (!section.items || !section.items.length)"
            >
              <buttons-item-add :sectionId="section.id" />
            </div>
          </slick>
        </div>

        <v-dialog v-model="dialogDetailedItem" max-width="33rem">
          <v-card> </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import ProductsItem from "./ProductsItem";
export default {
  props: {
    section: Object
  },
  components: {
    ProductsItem
  },
  data: () => ({
    currentItem: {},
    itemsQty: null,
    isSlick: true,
    slickOptions: {
      arrows: true,
      dots: true,
      infinite: false,
      draggable: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow:
        '<button type="button" class="slick-arrow slick-prev"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L2 13.9706L15.966 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
      nextArrow:
        '<button type="button" class="slick-arrow slick-next"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L15 13.9706L1.03398 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false
          }
        }
      ]
    },
    dialogDetailedItem: false
  }),
  computed: {
    ...mapGetters({
      isEdit: "isEdit"
    }),
    updatedSlickOptions() {
      return Object.assign(this.slickOptions, {
        infinite: !this.isEdit,
        draggable: !this.isEdit
      });
    },
    view() {
      return this.section.settings.view;
    },
    slickRef() {
      return "slick" + this.section.id;
    }
  },
  methods: {
    ...mapMutations({
      setItemField: "pages/SET_ITEM_FIELD"
    }),
    onItemsChange(event) {
      this.restartSlick();
      this.itemsQty = this.section.items.length;
    },
    async restartSlick() {
      let currSlideIndex = this.$refs[this.slickRef].currentSlide();
      this.isSlick = false;
      let enableSlick = new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 200);
      });
      this.isSlick = await enableSlick;
      this.$refs[this.slickRef].goTo(currSlideIndex, true);
    }
  },
  mounted: function() {
    this.itemsQty = this.section.items.length;
  },
  watch: {
    isEdit: function() {
      this.restartSlick();
    },
    section: function() {
      if (
        this.isEdit &&
        this.itemsQty === 0 &&
        this.section.items.length === 1
      ) {
        this.restartSlick();
      }
    }
  }
};
</script>
