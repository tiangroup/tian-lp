//const settings = require("../settings.js");

export default (context, inject) => {
  const { store, env, $env } = context;

  const api_backend = $env.API_BACKEND || "https://api.tian-lp.ru";
  const app_backend = $env.APP_BACKEND || "https://app.tian-lp.ru";

  inject("site_img", img => {
    let root = "/";
    if (store.getters["isEdit"]) {
      root = app_backend + "/";
    }
    return root + store.getters["sites/id"] + img;
  });

  inject("site_api", api_backend);

  inject("site_app", app_backend);

  inject("forms", {
    showMessage: message => {
      store.dispatch("forms/showMessage", message);
    },
    showEditor: editor => {
      store.dispatch("forms/showEditor", editor);
    }
  });

  inject("images", {
    src: img => {
      let root = "/";
      if (store.getters["isEdit"]) {
        root = app_backend + "/";
      }
      return root + store.getters["sites/id"] + img;
    },
    upload: imageUpload => {
      store.dispatch("showImageUpload", imageUpload);
    },
    svg: imageSvg => {
      store.dispatch("showImageSvg", imageSvg);
    }
  });

  inject("confirm", confirm => store.dispatch("showConfirm", confirm));

  inject("overlay", show => store.commit("SET_OVERLAY", show));
};
