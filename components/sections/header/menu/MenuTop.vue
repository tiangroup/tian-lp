<template>
  <nav class="header__menu">
    <ul class="primary-nav nav" ref="menu" v-resize="handleResize">
      <li
        class="primary-nav__item"
        v-for="item in menuItems.filter((i) => i.id)"
        :key="item.id"
        ref="menu_items"
      >
        <a :href="item.link" class="primary-nav__link" v-show="item.show">{{
          item.title
        }}</a>
      </li>
      <li class="primary-nav__reveal reveal" v-if="itemsHide.length">
        <input class="reveal__input" type="checkbox" id="reveal-magic-3" />
        <label class="primary-nav__reveal__toggle" for="reveal-magic-3">
          <span class="icon-dots"></span>
          <span class="sr-only">Показать больше</span>
        </label>
        <div class="reveal__content">
          <ul class="primary-nav__extra">
            <li
              class="primary-nav__item"
              v-for="(item, index) in itemsHide"
              :key="index"
            >
              <a :href="item.link" class="primary-nav__link">{{
                item.title
              }}</a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";
export default {
  props: {
    menu: Array
  },
  data: () => ({
    items: []
  }),
  methods: {
    handleResize: _.throttle(function () {
      this.items = this.items.map((item, index) => ({
        ...item,
        show: true
      }));
      setTimeout(this.onResize, 100);
    }, 300),
    onResize() {
      if (this.$refs.menu && this.$vuetify.breakpoint.width > 1023) {
        const menuWidth = this.$refs.menu.clientWidth;
        const menu_items = this.$refs.menu_items;
        this.menuItems = this.items.map((item, index) => ({
          ...item,
          show:
            menu_items[index] &&
            !(
              menu_items[index].offsetLeft +
                menu_items[index].clientWidth +
                15 >
              menuWidth
            )
        }));
      }
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.handleResize();
    // });
    this.handleResize();
  },
  computed: {
    ...mapGetters({
      page: "pages/page"
    }),
    itemsHide() {
      return this.items.filter((item) => !item.show);
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
          link: i.link,
          show: _this.items.find((item) => item.id == i.id)
            ? _this.items.find((item) => item.id == i.id).show
            : true
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
