export const state = () => ({
  site: null
});

export const mutations = {
  SET_SITE(state, site) {
    state.site = site;
  }
};

export const getters = {
  site: state => state.site,
  name: state => state.site.name,
  id: state => state.site.id
};
