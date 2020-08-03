export const state = () => ({
  isApp: false
});

export const mutations = {
  SET_IS_APP(state, isApp) {
    state.isApp = isApp;
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    try {
      let hostname = null;
      if (process.static) {
        hostname = process.env.SITE_NAME;
      }
      // todo: поставить проверку сервера req
      else if (process.server) {
        const reg = "(.*).app.tian-lp.ru";
        const regexp = new RegExp(reg, "ig");
        hostname = req.headers.host.split(":")[0];
        const result = regexp.exec(hostname);
        hostname = result ? result[1] : null;
        if (hostname) {
          commit("SET_IS_APP", true);
        }
      }
      if (hostname) {
        const sites = await this.$axios.$get(`${this.$url_api}/sites`, {
          params: { name: hostname }
        });
        if (sites.length > 0) {
          commit("sites/SET_SITE", sites[0]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export const getters = {
  isApp: state => state.isApp
};
