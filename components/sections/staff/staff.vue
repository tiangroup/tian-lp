<template>
  <div :style="styleDiv" :id="section.id">
    <buttons-section v-if="isEdit" :section="section" />
    <div
      class="staff custom-v-spacing custom-h-spacing bg-primary"
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
        <slick
          ref="slick"
          :options="slickOptions"
          class="staff__list"
          v-if="section.items && isSlick"
        >
          <div
            class="staff__item-wrap cell"
            v-for="item in section.items.filter(i => i.id)"
            :key="item.id"
            :style="styleDiv"
          >
            <buttons-item
              v-if="isEdit"
              :itemId="item.id"
              :sectionId="section.id"
              @onAction="onItemsChange"
            />
            <div class="staff__item">
              <div
                class="staff__image"
                :class="{ 'no-image': !item.img, clickable: isEdit }"
                :title="isEdit ? 'Двойной клик - изменить картинку' : ''"
                @dblclick="
                  itemImageSelect({
                    itemId: item.id,
                    field: 'img',
                    value: item.img
                  })
                "
              >
                <img v-if="item.img" :src="$site_img(item.img)" />
              </div>
              <div class="staff__info">
                <div class="staff__name" v-if="isEdit">
                  <editor
                    :text="item.name || ''"
                    :sectionId="section.id"
                    field="name"
                    :itemId="item.id"
                  />
                </div>
                <div v-else class="staff__name">{{ item.name }}</div>
                <div class="staff__position" v-if="isEdit">
                  <editor
                    :text="item.position || ''"
                    :sectionId="section.id"
                    field="position"
                    :itemId="item.id"
                  />
                </div>
                <div v-else class="staff__position">{{ item.position }}</div>
              </div>
              <div class="staff__contacts">
                <div class="staff__phone" v-if="isEdit">
                  <editor
                    :text="item.phone || ''"
                    :sectionId="section.id"
                    field="phone"
                    :itemId="item.id"
                  />
                </div>
                <div v-else class="staff__phone">{{ item.phone }}</div>
                <div class="staff__email">
                  <editor
                    :text="item.email || ''"
                    :sectionId="section.id"
                    field="email"
                    :itemId="item.id"
                    v-if="isEdit"
                  />
                  <a
                    v-else-if="isValidEmail(item.email)"
                    :href="`mailto:${item.email}`"
                    >{{ item.email }}</a
                  >
                  <span v-else>{{ item.email }}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="staff__item-wrap cell cell-12 cell-sm-6 cell-lg-4"
            v-if="isEdit && (!section.items || !section.items.length)"
          >
            <buttons-item-add :sectionId="section.id" />
          </div>
        </slick>
      </div>
      <image-upload
        v-if="isEdit"
        :dialog="dialogImageUpload"
        :itemImageEdit="itemImageEdit"
        @close="dialogImageUpload = false"
        @onUpload="onUploadImage"
      />
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
    dialogImageUpload: false,
    itemImageEdit: {},
    slickOptions: {
      arrows: true,
      dots: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      adaptiveHeight: false,
      draggable: false,
      prevArrow:
        '<button type="button" class="slick-arrow slick-prev"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L2 13.9706L15.966 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
      nextArrow:
        '<button type="button" class="slick-arrow slick-next"><svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L15 13.9706L1.03398 27" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',
      responsive: [
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
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        }
      ]
    },
    isSlick: true
  }),
  computed: {
    ...mapGetters({
      isEdit: "isEdit"
    }),
    styleDiv() {
      return this.isEdit ? { position: "relative" } : null;
    }
  },
  methods: {
    ...mapMutations({
      setItemField: "pages/SET_ITEM_FIELD"
    }),
    itemImageSelect(item) {
      this.itemImageEdit = item;
      this.dialogImageUpload = true;
    },
    onUploadImage(payload) {
      this.dialogImageUpload = false;
      this.setItemField({
        sectionId: this.section.id,
        itemId: payload.itemId,
        items: "items",
        field: payload.field,
        value: payload.value
      });
      this.$store.dispatch("pages/savePage");
    },
    onItemsChange(event) {
      console.log(event);
      this.isSlick = false;
      const _this = this;
      setTimeout(function() {
        _this.isSlick = true;
      }, 100);
    },
    isValidEmail(emailString) {
      var re = /\S+@\S+\.\S+/;
      return re.test(emailString);
    }
  }
};
</script>
