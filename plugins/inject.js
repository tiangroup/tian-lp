export default (context, inject) => {
  const { store, env, $env } = context;

  const api_backend = $env.API_BACKEND || "https://api.tian-lp.ru";
  const app_backend = $env.APP_BACKEND || "https://app.tian-lp.ru";

  inject("site_img", (img, imageStyle) => {
    if (img.indexOf("http") === 0) {
      return img;
    } else {
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
    }
  });

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
    src: (img, imageStyle) => {
      if (img.indexOf("http") === 0) {
        return img;
      } else {
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
      }
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

  inject("error", error => store.dispatch("showError", error));

  inject("ym_code", ym => {
    const code = `<script type="text/javascript" >
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  
    ym(${ym}, "init", {
         clickmap:true,
         trackLinks:true,
         accurateTrackBounce:true,
         webvisor:true
    });
  </script>`;
    return code;
  });
};
