export default (context, inject) => {
  const { store } = context;
  const site_img = img => "/" + store.getters["sites/id"] + img;
  // Inject $hello(msg) in Vue, context and store.
  inject("site_img", site_img);
  // For Nuxt <= 2.12, also add 👇
  context.$site_img = site_img;

  const url_api = process.env.API_BACKEND || "https://api.tian-lp.ru:443";
  inject("url_api", url_api);

  /*const site_name = process.env.SITE_NAME;
  inject("site_name", site_name);*/
};
