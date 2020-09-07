//const settings = require("../settings.js");

export default (context, inject) => {
  const { store, env, $env } = context;

  inject("site_img", img => "/" + store.getters["sites/id"] + img);

  inject("site_api", $env.API_BACKEND);

  inject("site_app", $env.APP_BACKEND);

  inject("forms", {
    showMessage: message => {
      store.dispatch("forms/showMessage", message);
    },
    showEditor: editor => {
      store.dispatch("forms/showEditor", editor);
    }
  });

  inject("images", {
    src: img => "/" + store.getters["sites/id"] + img,
    upload: imageUpload => {
      store.dispatch("showImageUpload", imageUpload);
    },
    svg: imageSvg => {
      store.dispatch("showImageSvg", imageSvg);
    }
  });

  inject("confirm", confirm => store.dispatch("showConfirm", confirm));
};
