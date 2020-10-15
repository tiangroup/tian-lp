export const state = () => ({
  isApp: false,
  isPreview: false,
  overlay: false,
  dialogImageUpload: false,
  imageUpload: {},
  dialogConfirm: false,
  confirm: {},
  dialogImageSvg: false,
  imageSvg: {},
  dialogError: false,
  error: {},
  sectionEdit: null
});

export const mutations = {
  SET_IS_APP(state, isApp) {
    state.isApp = isApp;
  },
  SET_IS_PREVIEW(state, isPreview) {
    state.isPreview = isPreview;
  },
  SET_OVERLAY(state, overlay) {
    state.overlay = overlay;
  },
  SET_DIALOG_IMAGE_UPLOAD(state, dialog) {
    state.dialogImageUpload = dialog;
    // if (!dialog) {
    //   state.imageUpload = {};
    // }
  },
  SET_IMAGE_UPLOAD(state, imageUpload) {
    state.imageUpload = imageUpload;
  },
  SET_DIALOG_CONFIRM(state, dialog) {
    state.dialogConfirm = dialog;
    // if (!dialog) {
    //   state.confirm = {};
    // }
  },
  SET_CONFIRM(state, confirm) {
    state.confirm = confirm;
  },
  SET_DIALOG_IMAGE_SVG(state, dialog) {
    state.dialogImageSvg = dialog;
    // if (!dialog) {
    //   state.imageSvg = {};
    // }
  },
  SET_IMAGE_SVG(state, imageSvg) {
    state.imageSvg = imageSvg;
  },
  SET_DIALOG_ERROR(state, dialog) {
    state.dialogError = dialog;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_SECTION_EDIT(state, section_id) {
    state.sectionEdit = section_id;
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    try {
      let hostname = process.env.SITE_NAME;
      if (!process.static && process.server) {
        if (!hostname) {
          const reg = "(.*).app.tian-lp.ru";
          const regexp = new RegExp(reg, "ig");
          hostname = req.headers.host.split(":")[0];
          const result = regexp.exec(hostname);
          hostname = result ? result[1] : null;
        }
        if (hostname) {
          commit("SET_IS_APP", true);
        }
      }
      if (hostname) {
        const sites = await this.$axios.$get(`${this.$site_api}/sites`, {
          params: { name: hostname }
        });
        if (sites.length > 0) {
          commit("sites/SET_SITE", sites[0]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
  showImageUpload({ commit }, imageUpload) {
    commit("SET_IMAGE_UPLOAD", imageUpload);
    commit("SET_DIALOG_IMAGE_UPLOAD", true);
  },
  hideImageUpload({ commit }) {
    commit("SET_DIALOG_IMAGE_UPLOAD", false);
  },
  showConfirm({ commit }, confirm) {
    commit("SET_CONFIRM", confirm);
    commit("SET_DIALOG_CONFIRM", true);
  },
  hideConfirm({ commit }) {
    commit("SET_DIALOG_CONFIRM", false);
  },
  showImageSvg({ commit }, imageSvg) {
    commit("SET_IMAGE_SVG", imageSvg);
    commit("SET_DIALOG_IMAGE_SVG", true);
  },
  hideImageSvg({ commit }) {
    commit("SET_DIALOG_IMAGE_SVG", false);
    commit("SET_IMAGE_SVG", {});
  },
  showError({ commit }, error) {
    commit("SET_ERROR", error);
    commit("SET_DIALOG_ERROR", true);
  },
  hideError({ commit }) {
    commit("SET_DIALOG_ERROR", false);
  }
};

export const getters = {
  isApp: state => state.isApp,
  isPreview: state => state.isPreview,
  isEdit: state => {
    return state.auth.loggedIn /*&& state.isApp*/ && !state.isPreview;
  },
  isSectionEdit: state => section => {
    return section instanceof Object
      ? section.id == state.sectionEdit
      : section == state.sectionEdit;
  },
  overlay: state => state.overlay,
  dialogImageUpload: state => state.dialogImageUpload,
  imageUpload: state => state.imageUpload,
  dialogConfirm: state => state.dialogConfirm,
  confirm: state => state.confirm,
  dialogImageSvg: state => state.dialogImageSvg,
  imageSvg: state => state.imageSvg,
  dialogError: state => state.dialogError,
  error: state => state.error
};
