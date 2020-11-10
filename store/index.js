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
  sectionEdit: null,
  dialogEditorSource: false,
  editorSource: {},
  tuningPanel: false,
  dialogEditorUpload: false,
  editorUpload: {}
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
  },
  SET_EDITOR_SOURCE(state, editorSource) {
    state.editorSource = editorSource;
  },
  SET_DIALOG_EDITOR_SOURCE(state, dialog) {
    state.dialogEditorSource = dialog;
  },
  SET_TUNING_PANEL(state, tuningPanel) {
    state.tuningPanel = tuningPanel;
  },
  SET_EDITOR_UPLOAD(state, editorUpload) {
    state.editorUpload = editorUpload;
  },
  SET_DIALOG_EDITOR_UPLOAD(state, dialog) {
    state.dialogEditorUpload = dialog;
  }
};

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
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
          const site = sites[0];
          commit("sites/SET_SITE", site);
          if (site.demo) {
            await dispatch("sections/loadSections");
          }
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
  },
  showEditorSource({ commit }, editorSource) {
    commit("SET_EDITOR_SOURCE", editorSource);
    commit("SET_DIALOG_EDITOR_SOURCE", true);
  },
  hideEditorSource({ commit }) {
    commit("SET_DIALOG_EDITOR_SOURCE", false);
    commit("SET_EDITOR_SOURCE", {});
  },
  async showEditorUpload({ commit }, editorUpload) {
    commit("SET_OVERLAY", true);
    const { files } = await this.$axios.$get(
      `${this.$site_app}/api/upload/section/${editorUpload.sectionId}`
    );
    commit("SET_OVERLAY", false);
    editorUpload = {
      ...editorUpload,
      files: files
    };
    commit("SET_EDITOR_UPLOAD", editorUpload);
    commit("SET_DIALOG_EDITOR_UPLOAD", true);
  },
  hideEditorUpload({ commit }) {
    commit("SET_DIALOG_EDITOR_UPLOAD", false);
    commit("SET_EDITOR_UPLOAD", {});
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
      ? section.id === state.sectionEdit
      : section === state.sectionEdit;
  },
  overlay: state => state.overlay,
  dialogImageUpload: state => state.dialogImageUpload,
  imageUpload: state => state.imageUpload,
  dialogConfirm: state => state.dialogConfirm,
  confirm: state => state.confirm,
  dialogImageSvg: state => state.dialogImageSvg,
  imageSvg: state => state.imageSvg,
  dialogError: state => state.dialogError,
  error: state => state.error,
  dialogEditorSource: state => state.dialogEditorSource,
  editorSource: state => state.editorSource,
  tuningPanel: state => state.tuningPanel,
  dialogEditorUpload: state => state.dialogEditorUpload,
  editorUpload: state => state.editorUpload
};
