export default (context, inject) => {
  const { store } = context;
  const site_img = img => "/" + store.getters["sites/id"] + img;
  // Inject $hello(msg) in Vue, context and store.
  inject("site_img", site_img);
  // For Nuxt <= 2.12, also add 👇
  context.$site_img = site_img;
};
