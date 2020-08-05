export const state = () => ({
  site: null
});

export const mutations = {
  SET_SITE(state, site) {
    state.site = site;
  }
};

export const actions = {
  async loadSite({ commit }, id) {
    try {
      const site = await this.$axios.$get(`${this.$url_api}/sites/${id}`);
      commit("SET_SITE", site);
    } catch (error) {
      console.error(error);
    }
  }
};

export const getters = {
  site: state => state.site,
  name: state => state.site.name,
  id: state => state.site.id,
  pages: state => state.site.pages
};
