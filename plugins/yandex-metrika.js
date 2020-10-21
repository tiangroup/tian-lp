export default ({ app }, inject) => {
  let ymId = null;

  const YandexMetrika = {
    init: id => {
      if (!window.Ya) {
        /* eslint-disable */
        (function(m, e, t, r, i, k, a) {
          m[i] =
            m[i] ||
            function() {
              (m[i].a = m[i].a || []).push(arguments);
            };
          m[i].l = 1 * new Date();
          (k = e.createElement(t)),
            (a = e.getElementsByTagName(t)[0]),
            (k.async = 1),
            (k.src = r),
            a.parentNode.insertBefore(k, a);
        })(
          window,
          document,
          "script",
          "https://mc.yandex.ru/metrika/tag.js",
          "ym"
        );
        /* eslint-enable */
      }
      ymId = id;
      // eslint-disable-next-line no-undef
      ym(ymId, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      });
    },
    // eslint-disable-next-line no-undef
    reachGoal: (targetName = "", params = {}) => {
      if (window.ym) {
        ym(ymId, "reachGoal", targetName, params);
      }
    },
    // eslint-disable-next-line no-undef
    hit: (url = "", options = {}) => {
      if (window.ym) {
        ym(ymId, "hit", url, options);
      }
    }
  };

  const { router } = app;
  router.afterEach((to, from) => {
    YandexMetrika.hit(to.fullPath, {
      referer: from.fullPath
    });
  });

  inject("yandexMetrika", YandexMetrika);
};
