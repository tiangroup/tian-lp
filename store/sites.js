export const state = () => ({
  sites: []
});

export const mutations = {
  SET_SITES(state, sites) {
    state.sites = sites;
  }
};

export const actions = {
  async loadSites({ commit, state }, name) {
    try {
      const sites = await this.$axios.$get("/api/data/sites", {
        params: { name: name }
      });
      commit("SET_SITES", sites);
    } catch (error) {
      console.error(error);
    }
  }
};

export const getters = {
  root: state => state.sites.find(s => s.slug == "/")
};
