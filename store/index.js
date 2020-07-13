export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    try {
      const hostname = req.hostname;
      const sites = await this.$axios.$get("/api/data/sites", {
        params: { name: hostname }
      });
      commit("sites/SET_SITES", sites);
    } catch (error) {
      console.error(error);
    }
  }
};
