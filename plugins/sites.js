export default (context, inject) => {
  const { store } = context;
  const site_img = img => "/" + store.getters["sites/id"] + img;
  inject("site_img", site_img);

  const url_api = process.env.API_BACKEND || "https://api.tian-lp.ru:443";
  inject("url_api", url_api);

  /*const site_name = process.env.SITE_NAME;
  inject("site_name", site_name);*/
};
