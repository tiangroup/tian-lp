export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    try {
      const hostname = process.env.SITE_NAME || req.headers.host.split(":")[0];
      const sites = await this.$axios.$get(`${this.$url_api}/sites`, {
        params: { name: hostname }
      });
      if (sites.length > 0) {
        commit("sites/SET_SITE", sites[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }
};
