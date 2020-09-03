<template>
  <div
    class="header"
    :class="{
      mDark: section.settings.background === 'dark',
      'header--style1': view == 'view1',
      'header--style3': view == 'view3',
      'header--style5': view == 'view5',
      'header--style6': view == 'view6'
    }"
  >
    <div class="landing__container">
      <div class="header__wrap">
        <div class="logo header__logo">
          <a class="logo__link">
            <v-menu absolute offset-y v-if="isEdit">
              <template v-slot:activator="{ on, attrs }">
                <div
                  class="logo__image"
                  :class="{
                    'no-image': !section.logo_svg && !section.logo_img
                  }"
                  v-html="
                    section.logo_img
                      ? `<img src='${$site_img(section.logo_img)}'/>`
                      : section.logo_svg
                  "
                  v-bind="attrs"
                  v-on="on"
                ></div>
              </template>
              <v-list>
                <v-list-item
                  @click="
                    itemSvgSelect({
                      sectionId: section.id,
                      field: 'logo_svg',
                      value: section.logo_svg
                    })
                  "
                >
                  <v-list-item-title>Вставить svg картинку</v-list-item-title>
                </v-list-item>
                <v-list-item
                  @click="
                    itemImageSelect({
                      field: 'logo_img',
                      value: section.logo_img
                    })
                  "
                >
                  <v-list-item-title>Вставить картинку</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="section.logo_img" @click="deleteImageLogo">
                  <v-list-item-title>Удалить картинку</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <div
              v-else
              class="logo__image"
              :class="{ 'no-image': !section.logo_svg }"
              v-html="
                section.logo_img
                  ? `<img src='${$site_img(section.logo_img)}'/>`
                  : section.logo_svg
              "
            ></div>
            <div v-if="isEdit" class="logo__text">
              <editor
                data-placeholder="Название"
                :text="section.logo_text || ''"
                :sectionId="section.id"
                field="logo_text"
              />
            </div>
            <div v-else-if="section.logo_text" class="logo__text">{{ section.logo_text }}</div>
          </a>
          <div v-if="isEdit" class="logo__slogan">
            <editor
              data-placeholder="Введите слоган компании"
              :text="section.logo_slogan || ''"
              :sectionId="section.id"
              field="logo_slogan"
            />
          </div>
          <div v-else class="logo__slogan">{{ section.logo_slogan }}</div>
        </div>
        <div class="header__contacts">
          <div class="addresses header__addresses connect__item">
            <div class="connect__row">
              <div class="connect__icon">
                <svg
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.51855 6.5V5.5H6.48187V6V6.5H5.51855Z" stroke="currentColor" />
                  <path
                    d="M1.55675 8.72429C1.35405 8.39072 1.12937 7.72073 1.03953 6.84679C0.951568 5.99119 1.00319 5.03402 1.26707 4.15293C1.52927 3.27743 1.99072 2.50633 2.70692 1.95137C3.41745 1.40082 4.45966 1 5.99998 1C7.54031 1 8.58252 1.40082 9.29305 1.95138C10.0093 2.50634 10.4707 3.27745 10.7329 4.15295C10.9968 5.03404 11.0484 5.99121 10.9605 6.8468C10.8706 7.72074 10.6459 8.39072 10.4432 8.72426C9.99777 9.45729 9.18444 10.283 8.28452 11.0528C7.42138 11.7911 6.54621 12.4215 5.99997 12.7973C5.45373 12.4215 4.57854 11.7911 3.71541 11.0528C2.81549 10.283 2.00218 9.4573 1.55675 8.72429Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </div>
              <div class="connect__instances">
                <div class="connect__instance" v-if="isEdit">
                  <editor
                    data-placeholder="Введите адрес компании"
                    :text="section.address || ''"
                    :sectionId="section.id"
                    editContent="html"
                    field="address"
                  />
                </div>
                <div class="connect__instance" v-else v-html="section.address"></div>
              </div>
            </div>
          </div>
          <div class="phones header__phones connect__item">
            <div class="connect__row">
              <div class="connect__icon">
                <svg
                  width="11"
                  height="16"
                  viewBox="0 0 11 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 14V2C1 1.44772 1.44772 1 2 1H9C9.55228 1 10 1.44772 10 2V14C10 14.5523 9.55228 15 9 15H2C1.44772 15 1 14.5523 1 14Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path d="M4.5 11.5V9.5H6.5V11.5H4.5Z" stroke="currentColor" />
                </svg>
              </div>
              <div class="connect__instances">
                <div class="connect__instance" v-if="isEdit">
                  <editor
                    data-placeholder="+7 900 111-22-33"
                    :text="section.phone || ''"
                    :sectionId="section.id"
                    editContent="html"
                    field="phone"
                  />
                </div>
                <div class="connect__instance" v-else v-html="section.phone"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="header__action">
          <a href="#" class="button button-secondary">Заказать звонок</a>
        </div>
        <div class="header__menu__toggle">
          <a href="#main-nav" type="button" class="nav__toggle" id="main-nav-toggle">
            <span class="icon-bar" role="presentation"></span>
            <span class="icon-bar" role="presentation"></span>
            <span class="icon-bar" role="presentation"></span>
            <span class="sr-only">Открыть меню</span>
          </a>
        </div>
        <menu-top :menu="section.menu"></menu-top>
        <a href="#" class="overlay" tabindex="-1" aria-hidden="true" hidden></a>
      </div>
    </div>
    <image-svg
      v-if="isEdit"
      :dialog="dialogImageSvg"
      :itemSvgEdit="itemSvgEdit"
      @close="dialogImageSvg = false"
      @save="itemSvgSave"
    />
    <image-upload
      v-if="isEdit"
      :dialog="dialogImageUpload"
      :itemImageEdit="itemImageEdit"
      @close="dialogImageUpload = false"
      @onUpload="onUploadImage"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  components: {
    //MenuTop: () => import("./menu/MenuTop"),
    Editor: () => import("@/components/admin/Editor"),
    ImageSvg: () => import("@/components/admin/ImageSvg"),
    ImageUpload: () => import("@/components/admin/ImageUpload"),
  },
  props: {
    section: Object,
    isEdit: Boolean,
    view: {
      type: String,
      default: "view1",
    },
  },
  data: () => ({
    dialogImageSvg: false,
    itemSvgEdit: {},
    dialogImageUpload: false,
    itemImageEdit: {},
  }),
  methods: {
    ...mapMutations({
      setSectionField: "pages/SET_SECTION_FIELD",
    }),
    itemSvgSelect(item) {
      this.itemSvgEdit = item;
      this.dialogImageSvg = true;
    },
    itemSvgSave(payload) {
      this.dialogImageSvg = false;
      this.setSectionField({
        id: this.section.id,
        field: "logo_svg",
        value: payload.value,
      });
    },
    itemImageSelect(payload) {
      this.itemImageEdit = payload;
      this.dialogImageUpload = true;
    },
    onUploadImage(payload) {
      this.dialogImageUpload = false;
      this.setSectionField({
        id: this.section.id,
        field: payload.field,
        value: payload.value,
      });
      this.$store.dispatch("pages/savePage");
    },
    async deleteImageLogo() {
      const formData = new FormData();
      formData.append("image", this.section.logo_img);
      await this.$axios.post("/api/upload/image-remove", formData);
      this.setSectionField({
        id: this.section.id,
        field: "logo_img",
        value: null,
      });
      this.$store.dispatch("pages/savePage");
    },
  },
};
</script>
