export const state = () => ({
  site: null
});

export const mutations = {
  SET_SITE(state, site) {
    state.site = site;
  }
};

export const actions = {
  async loadSite({ commit, state }, name) {
    try {
      const sites = await this.$axios.$get("/api/data/sites", {
        params: { name: name }
      });
      if (sites.length > 0) {
        commit("SET_SITE", sites[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export const getters = {
  site: state => state.site
};
