export default (context, inject) => {
  const { store, env, $env } = context;

  const api_backend = $env.API_BACKEND || "https://api.tian-lp.ru";
  const app_backend = $env.APP_BACKEND || "https://app.tian-lp.ru";

  function imgSrc(img, imageStyle) {
    if (img.indexOf("http") === 0) {
      return img;
    } else {
      let root = "/";
      if (store.getters["isEdit"]) {
        root = app_backend + "/";
      }

      let src =
        root +
        "uploads/" +
        store.getters["sites/name"] +
        img +
        (imageStyle ? `?style=${imageStyle}` : "");

      if (!store.getters["isEdit"] && !store.getters["isApp"] && imageStyle) {
        const splitPath = img.split(".");
        const filenameIndex = splitPath.length - 2;
        splitPath[filenameIndex] = splitPath[filenameIndex] + "--" + imageStyle;
        const img_style = splitPath.join(".");
        src =
          root +
          "image-styles/uploads/" +
          store.getters["sites/name"] +
          img_style;
      }

      return src;
    }
  }

  inject("site_img", imgSrc);

  inject("site_api", api_backend);

  inject("site_app", app_backend);

  inject("forms", {
    showMessage: message => {
      store.dispatch("forms/showMessage", message);
    },
    showEditor: editor => {
      store.dispatch("forms/showEditor", editor);
    },
    licence: show => {
      store.dispatch("forms/showLicence", show);
    }
  });

  inject("images", {
    src: imgSrc,
    upload: imageUpload => {
      store.dispatch("showImageUpload", imageUpload);
    },
    svg: imageSvg => {
      store.dispatch("showImageSvg", imageSvg);
    }
  });

  inject("confirm", confirm => store.dispatch("showConfirm", confirm));

  inject("overlay", show => store.commit("SET_OVERLAY", show));

  inject("error", error => store.dispatch("showError", error));

  inject("editorSource", editorSource =>
    store.dispatch("showEditorSource", editorSource)
  );

  inject("tuningPanel", show => store.commit("SET_TUNING_PANEL", show));
};
