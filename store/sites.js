export const state = () => ({
  site: null
});

export const mutations = {
  SET_SITE(state, site) {
    state.site = site;
  },
  SET_UPDATES(state) {
    state.site.updates = Date.now();
  },
  SET_ROBOTS(state, content) {
    state.site.robots = content;
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
      try {
        const site = await this.$axios.$get(
          `${this.$site_api}/sites/${state.site.id}`
        );
        commit("SET_SITE", site);
      } catch (error) {
        console.error(error);
      }
    }
  },
  async saveSite({ commit, state }) {
    if (state.site) {
      try {
        const site = await this.$axios.$put(
          `${this.$site_api}/sites/${state.site.id}`,
          state.site
        );
        commit("SET_PAGE", site);
      } catch (error) {
        console.error(error);
      }
    }
  }
};

export const getters = {
  site: state => state.site,
  name: state => state.site.name,
  id: state => state.site.id,
  pages: state => state.site.pages
};
