export const state = () => ({
  sections: []
});

export const mutations = {
  SET_SECTIONS(state, sections) {
    state.sections = sections;
  }
};

export const actions = {
  async loadSections({ commit }) {
    try {
      const sections = await this.$axios.$get(`${this.$url_api}/sections`);
      commit("SET_SECTIONS", sections);
    } catch (error) {
      console.error(error);
    }
  }
};

export const getters = {
  sections: state => state.sections
};
