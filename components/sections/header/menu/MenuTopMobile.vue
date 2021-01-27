<template>
  <nav class="header__menu--mobile">
    <a
      href="#"
      id="main-nav-close"
      class="nav__close"
      @click.prevent="$emit('close-mobile-menu')"
    >
      <span class="icon-bar" role="presentation"></span>
      <span class="icon-bar" role="presentation"></span>
      <span class="icon-bar" role="presentation"></span>
      <span class="sr-only">Закрыть меню</span>
    </a>

    <ul class="primary-nav nav">
      <li
        class="primary-nav__item"
        v-for="item in menuItems.filter((i) => i.id)"
        :key="item.id"
      >
        <a :href="item.link" class="primary-nav__link">{{ item.title }}</a>
      </li>
    </ul>
    <menu-top-extra
      v-if="mobileLongMenu"
      :section="section"
      :is-edit="isEdit"
      @call-cb-form="$emit('call-cb-form')"
    ></menu-top-extra>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    isEdit: Boolean,
    section: Object,
    menu: Array
  },
  computed: {
    ...mapGetters({
      headerSettings: "sites/settings",
      page: "pages/page"
    }),
    mobileLongMenu() {
      return this.headerSettings.header.mmenu === "short" ? false : true;
    },
    _menu() {
      if (this.menu && this.menu.length > 0) {
        return this.menu;
      } else {
        const menu = this.page.sections
          .filter((s) => s.show && s.title)
          .map((s) => ({
            id: s.id,
            title: s.title || "Пункт",
            type: "anchor",
            link: s.slug ? `#${s.slug}` : `#${s.id}`
          }));
        return menu;
      }
    },
    menuItems: {
      get: function () {
        let _this = this;
        const items = this._menu.map((i) => ({
          id: i.id,
          title: i.title,
          type: i.type,
          link: i.link
        }));
        this.items = items;
        return this.items;
      },
      set: function (value) {
        this.items = value;
      }
    }
  }
};
</script>