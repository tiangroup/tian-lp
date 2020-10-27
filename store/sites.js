export const state = () => ({
  site: null,
  change: false,
  saveLoading: false
});

export const mutations = {
  SET_SITE(state, site) {
    state.site = site;
  },
  SET_UPDATES(state) {
    state.site.updates = Date.now();
    state.change = true;
  },
  SET_ROBOTS(state, content) {
    state.site.robots = content;
    state.change = true;
  },
  SET_COUNTER(state, content) {
    state.site.counter = content;
    state.change = true;
  },
  SET_LICENCE(state, content) {
    state.site.licence = content;
    state.change = true;
  },
  SET_SITEMAP(state, content) {
    state.site.sitemap = content;
    state.change = true;
  },
  SET_YM(state, content) {
    state.site.ym = content.trim();
    state.change = true;
  },
  SET_CHANGE(state, change) {
    state.change = change;
  },
  SET_RECAPTCHA_FIELD(state, payload) {
    if (!state.site.recaptcha) {
      state.site.recaptcha = {
        active: false,
        sitekey: null,
        secret: null
      };
    }
    state.site.recaptcha[payload.field] = payload.value;
    state.change = true;
  },
  SET_SAVE_LOADING(state, saveLoading) {
    state.saveLoading = saveLoading;
  },
  SET_SETTINGS_COLOR(state, color) {
    if (state.site) {
      if (!state.site.settings) {
        state.settings = {};
      }
      if (!state.site.settings.color) {
        state.site.settings.color = {};
      }
      state.site.settings.color.h = color.h;
      state.site.settings.color.s = color.s;
      state.site.settings.color.l = color.l;
      state.change = true;
    }
  },
  SET_SETTINGS_BACKGROUND(state, background) {
    if (state.site) {
      if (!state.site.settings) {
        state.settings = {};
      }
      state.site.settings.background = background;
      state.change = true;
    }
  },
  SET_SETTINGS_BUTTONS(state, buttons) {
    if (state.site) {
      if (!state.site.settings) {
        state.settings = {};
      }
      state.site.settings.buttons = buttons;
      state.change = true;
    }
  },
  SET_SETTINGS_POPUP(state, popup) {
    if (state.site) {
      if (!state.site.settings) {
        state.settings = {};
      }
      state.site.settings.popup = popup;
      state.change = true;
    }
  },
  SET_SETTINGS_HEADER_MCOLOR(state, mcolor) {
    state.site.settings.header.mcolor = mcolor;
    state.change = true;
  },
  SET_SETTINGS_HEADER_MHEADER(state, mheader) {
    state.site.settings.header.mheader = mheader;
    state.change = true;
  },
  SET_SETTINGS_HEADER_MMENU(state, mmenu) {
    state.site.settings.header.mmenu = mmenu;
    state.change = true;
  },
  SET_DEMO(state, demo) {
    state.site.demo = demo;
    state.change = true;
  },
  SET_FAVICON(state, favicon) {
    state.site.favicon = favicon;
    state.change = true;
  }
};

export const actions = {
  async loadSite({ commit }, id) {
    try {
      const site = await this.$axios.$get(`${this.$site_api}/sites/${id}`);
      commit("SET_SITE", site);
    } catch (error) {
      console.error(error);
    }
  },
  async reloadSite({ commit, state }) {
    if (state.site) {
      commit("SET_SAVE_LOADING", true);
      try {
        const site = await this.$axios.$get(
          `${this.$site_api}/sites/${state.site.id}`
        );
        commit("SET_SITE", site);
        commit("SET_CHANGE", false);
      } catch (error) {
        console.error(error);
      }
      commit("SET_SAVE_LOADING", false);
    }
  },
  async saveSite({ commit, state }) {
    if (state.site) {
      commit("SET_SAVE_LOADING", true);
      try {
        commit("SET_UPDATES");
        const site = await this.$axios.$put(
          `${this.$site_api}/sites/${state.site.id}`,
          state.site
        );
        commit("SET_SITE", site);
        commit("SET_CHANGE", false);
      } catch (error) {
        console.error(error);
      }
      commit("SET_SAVE_LOADING", false);
    }
  }
};

export const getters = {
  site: state => state.site,
  name: state => state.site.name,
  id: state => state.site.id,
  pages: state => state.site.pages,
  change: state => state.change,
  saveLoading: state => state.saveLoading,
  recaptcha: state => {
    return state.site.recaptcha ? state.site.recaptcha : {};
  },
  ym: state => {
    return state.site ? state.site.ym : null;
  },
  settings: state => {
    if (!state.site.settings) {
      state.site.settings = {};
    }
    if (!state.site.settings.color) {
      state.site.settings.color = {
        h: null,
        s: null,
        l: null
      };
    }
    if (!state.site.settings.header) {
      state.site.settings.header = {
        mcolor: "desktop",
        mheader: "button",
        mmenu: "long"
      };
    }
    return state.site.settings;
  }
};
