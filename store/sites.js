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
  }
};
