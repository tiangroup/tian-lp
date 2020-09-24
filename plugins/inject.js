export default (context, inject) => {
  const { store, env, $env } = context;

  const api_backend = $env.API_BACKEND || "https://api.tian-lp.ru";
  const app_backend = $env.APP_BACKEND || "https://app.tian-lp.ru";

  inject("site_img", (img, imageStyle) => {
    let root = "/";
    if (store.getters["isEdit"]) {
      root = app_backend + "/";
    }
    return (
      root +
      "uploads/" +
      store.getters["sites/name"] +
      img +
      (imageStyle ? `?style=${imageStyle}` : "")
    );
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
    src: (img, imageStyle) => {
      let root = "/";
      if (store.getters["isEdit"]) {
        root = app_backend + "/";
      }
      return (
        root +
        "uploads/" +
        store.getters["sites/name"] +
        img +
        (imageStyle ? `?style=${imageStyle}` : "")
      );
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
