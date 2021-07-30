<template>
  <div
    class="header header--style2"
    :class="{
      mDark: section.settings.background === 'dark',
      mTheme: mobileColoredBg,
      'header--mStyle2': mobileHeaderWbutton,
      'header--fixed': addFixedClass,
      'header--editable': isEdit
    }"
  >
    <div class="bg-theme" v-if="showTopBlock">
      <div class="landing__container">
        <div class="header__wrap header__wrap--vs1">
          <div
            class="addresses header__addresses connect__item"
            v-if="getCleanString(section.address) || isEdit"
          >
            <div class="connect__row">
              <div class="connect__icon">
                <svg
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.51855 6.5V5.5H6.48187V6V6.5H5.51855Z"
                    stroke="currentColor"
                  />
                  <path
                    d="M1.55675 8.72429C1.35405 8.39072 1.12937 7.72073 1.03953 6.84679C0.951568 5.99119 1.00319 5.03402 1.26707 4.15293C1.52927 3.27743 1.99072 2.50633 2.70692 1.95137C3.41745 1.40082 4.45966 1 5.99998 1C7.54031 1 8.58252 1.40082 9.29305 1.95138C10.0093 2.50634 10.4707 3.27745 10.7329 4.15295C10.9968 5.03404 11.0484 5.99121 10.9605 6.8468C10.8706 7.72074 10.6459 8.39072 10.4432 8.72426C9.99777 9.45729 9.18444 10.283 8.28452 11.0528C7.42138 11.7911 6.54621 12.4215 5.99997 12.7973C5.45373 12.4215 4.57854 11.7911 3.71541 11.0528C2.81549 10.283 2.00218 9.4573 1.55675 8.72429Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </div>
              <div class="connect__instances">
                <div class="connect__instance">
                  <editor-html
                    :text="section.address"
                    :sectionId="section.id"
                    field="address"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="display-flex align-items-center justify-content-center">
            <div
              class="phones header__phones connect__item"
              v-if="getCleanString(section.phone) || isEdit"
            >
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
                    <path
                      d="M4.5 11.5V9.5H6.5V11.5H4.5Z"
                      stroke="currentColor"
                    />
                  </svg>
                </div>
                <div class="connect__instances">
                  <div class="connect__instance">
                    <editor-html
                      :text="section.phone"
                      :sectionId="section.id"
                      field="phone"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="header__action">
              <form-popup
                :class="{ mLight: section.settings.background !== 'dark' }"
                :section="section"
                field="form"
                buttonClass="button-secondary"
                popupClass="popup-callback"
                :dark-theme="isThemeDark"
              />
            </div>
          </div>
          <div class="social header__social" v-if="section.socials.length">
            <social-list :section="section" :isEdit="isEdit"></social-list>
          </div>
        </div>
      </div>
    </div>
    <div class="landing__container">
      <div class="header__wrap header__wrap--vs2">
        <div class="logo header__logo">
          <a class="logo__link" @click="goToTop">
            <image-item
              divClass="logo__image"
              :img="section.logo_img"
              :svg="section.logo_svg"
              :sectionId="section.id"
              :items="null"
              field="logo_img"
              fieldSvg="logo_svg"
              imageStyle="logo"
              v-if="section.logo_svg || section.logo_img || isEdit"
            />
            <div v-if="isEdit" class="logo__text">
              <editor-html
                data-placeholder="Название"
                :text="section.logo_text"
                :sectionId="section.id"
                field="logo_text"
              />
            </div>
            <div
              v-else-if="isCompanyName"
              class="logo__text"
              v-html="section.logo_text"
            ></div>
          </a>
          <div v-if="isEdit" class="logo__slogan">
            <editor-text
              data-placeholder="Слоган компании"
              :text="section.logo_slogan"
              :sectionId="section.id"
              field="logo_slogan"
            />
          </div>
          <div class="logo__slogan" v-else-if="section.logo_slogan">
            {{ section.logo_slogan }}
          </div>
        </div>
        <div class="header__menu__toggle">
          <a
            :href="'#nav' + section.id"
            type="button"
            class="nav__toggle"
            @click.prevent="drawer = !drawer"
          >
            <span class="icon-bar" role="presentation"></span>
            <span class="icon-bar" role="presentation"></span>
            <span class="icon-bar" role="presentation"></span>
            <span class="sr-only">Открыть меню</span>
          </a>
        </div>
        <menu-top
          :menu="section.menu"
          :adjust-width="addFixedClass"
          :dark-theme="isThemeDark"
        ></menu-top>
      </div>
    </div>
    <form-dialog
      v-model="dialogCallback"
      :section="section"
      field="form"
      popupClass="popup-callback"
      :dark-theme="isThemeDark"
    />
    <v-navigation-drawer v-model="drawer" fixed width="25rem">
      <menu-top-mobile
        :menu="section.menu"
        :section="section"
        :is-edit="isEdit"
        @call-cb-form="handleFormCall"
        @close-mobile-menu="drawer = false"
      ></menu-top-mobile>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    section: Object,
    isEdit: Boolean,
    showTopBlock: {
      type: Boolean,
      default: true
    },
    fixHeader: Boolean
  },
  data: () => ({
    dialogCallback: false,
    drawer: false,
    headerHeight: 170,
    addFixedClass: false,
    bodyElm: null
  }),
  computed: {
    ...mapGetters({
      headerSettings: "sites/settings"
    }),
    mobileColoredBg() {
      return this.headerSettings.header.mcolor === "color" ? true : false;
    },
    mobileHeaderWbutton() {
      return this.headerSettings.header.mheader === "button" ? true : false;
    },
    isDesktopNav() {
      return this.$vuetify.breakpoint.width > 1279 || false;
    },
    isThemeDark() {
      return this.section.settings.background === "dark";
    },
    isCompanyName() {
      return this.getCleanString(this.section.logo_text).length || false;
    }
  },
  methods: {
    getCleanString(incoming) {
      const strippedString = incoming.replace(/(<([^>]+)>)/gi, "");
      return strippedString;
    },
    toggleFixed() {
      const top = window.pageYOffset;
      if (top > parseInt(this.headerHeight) && this.isDesktopNav) {
        this.addFixedClass = true;
        if (this.bodyElm) {
          this.bodyElm.style.paddingTop = this.headerHeight + "px";
        }
      } else {
        this.addFixedClass = false;
        if (this.bodyElm) {
          this.bodyElm.style.paddingTop = 0;
        }
      }
    },
    handleFormCall() {
      this.drawer = false;
      this.dialogCallback = true;
    },
    goToTop() {
      const top = window.pageYOffset || 0;
      if (top > 200) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(function () {
          window.location.hash = "";
          history.replaceState("", document.title, window.location.pathname);
          document.activeElement.blur();
        }, 500);
      }
      return false;
    }
  },
  mounted: function () {
    this.headerHeight =
      document.getElementsByClassName("header")[0].offsetHeight;
    this.bodyElm = document.getElementsByTagName("body")[0];
    if (this.fixHeader && window) {
      window.addEventListener("scroll", this.toggleFixed);
    }
  },
  watch: {
    fixHeader: function () {
      this.addFixedClass = false;
      this.bodyElm.style.paddingTop = 0;
      if (this.fixHeader && window) {
        window.addEventListener("scroll", this.toggleFixed);
      } else {
        window.removeEventListener("scroll", this.toggleFixed);
      }
    }
  },
  beforeDestroy: function () {
    if (window && this.fixHeader) {
      window.removeEventListener("scroll", this.toggleFixed);
    }
  }
};
</script>
<style scoped>
.v-navigation-drawer {
  z-index: 120;
}
</style>
