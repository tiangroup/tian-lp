export const state = () => ({
  forms: [],
  change: false,
  saveLoading: false,
  changeForms: [],
  message: null,
  isMessage: false,
  editor: null,
  isEditor: false,
  reloading: false,
  licence: false
});

export const mutations = {
  SET_FORM(state, payload) {
    const form = payload;
    const index = state.forms.indexOf(state.forms.find(f => f.id == form.id));
    if (index > -1) {
      state.forms.splice(index, 1, form);
    } else {
      state.forms.push(form);
    }
  },
  RESET_CHANGE_FORMS(state) {
    state.changeForms = [];
  },
  SET_CHANGE(state, change) {
    state.change = change;
  },
  SET_SAVE_LOADING(state, saveLoading) {
    state.saveLoading = saveLoading;
  },
  SET_RELOADING(state, reloading) {
    state.reloading = reloading;
  },
  SET_FORM_FIELD(state, payload) {
    const form = state.forms.find(f => f.id == payload.formId);
    form.form[payload.field] = payload.value;
    if (!state.changeForms.includes(form.id)) {
      state.changeForms.push(form.id);
    }
    state.change = true;
  },
  SET_MAIL_FIELD(state, payload) {
    const form = state.forms.find(f => f.id == payload.formId);
    if (!form.mail) {
      form.mail = {};
    }
    form.mail[payload.field] = payload.value;
    if (!state.changeForms.includes(form.id)) {
      state.changeForms.push(form.id);
    }
    state.change = true;
  },
  SET_FIELDS_FIELD(state, payload) {
    const form = state.forms.find(f => f.id == payload.formId);
    const item = form.fields.find(f => f.id == payload.fieldId);
    item[payload.field] = payload.value;
    if (!state.changeForms.includes(form.id)) {
      state.changeForms.push(form.id);
    }
    state.change = true;
  },
  ADD_FIELDS(state, payload) {
    const form = state.forms.find(f => f.id == payload.formId);
    form.fields.push({
      type: "text"
    });
    if (!state.changeForms.includes(form.id)) {
      state.changeForms.push(form.id);
    }
    state.change = true;
  },
  DELETE_FIELDS(state, payload) {
    const form = state.forms.find(f => f.id == payload.formId);
    const item = form.fields.find(i => i.id === payload.fieldId);
    const index = form.fields.indexOf(item);
    if (index > -1) {
      form.fields.splice(index, 1);
    }
    if (!state.changeForms.includes(form.id)) {
      state.changeForms.push(form.id);
    }
    state.change = true;
  },
  UP_FIELDS(state, payload) {
    const form = state.forms.find(f => f.id == payload.formId);
    const item = form.fields.find(i => i.id === payload.fieldId);
    const index = form.fields.indexOf(item);
    if (index > -1 && index - 1 >= 0) {
      const itemUp = form.fields.splice(index, 1).shift();
      form.fields.splice(index - 1, 0, itemUp);

      if (!state.changeForms.includes(form.id)) {
        state.changeForms.push(form.id);
      }
      state.change = true;
    }
  },
  DOWN_FIELDS(state, payload) {
    const form = state.forms.find(f => f.id == payload.formId);
    const item = form.fields.find(i => i.id === payload.fieldId);
    const index = form.fields.indexOf(item);
    if (index > -1 && index + 1 < form.fields.length) {
      const itemUp = form.fields.splice(index, 1).shift();
      form.fields.splice(index + 1, 0, itemUp);

      if (!state.changeForms.includes(form.id)) {
        state.changeForms.push(form.id);
      }
      state.change = true;
    }
  },
  SET_MESSAGE(state, message) {
    state.message = message;
  },
  SET_IS_MESSAGE(state, isMessage) {
    state.isMessage = isMessage;
  },
  SET_EDITOR(state, editor) {
    state.editor = editor;
  },
  SET_IS_EDITOR(state, isEditor) {
    state.isEditor = isEditor;
  },
  SET_LICENCE(state, licence) {
    state.licence = licence;
  }
};

export const actions = {
  async loadForm({ commit }, formId) {
    try {
      if (formId) {
        const form = await this.$axios.$get(
          `${this.$site_api}/forms/${formId}`
        );
        commit("SET_FORM", form);
        commit("SET_CHANGE", false);
      }
    } catch (error) {
      console.error(error);
    }
  },
  async reloadForms({ commit, state }) {
    commit("SET_RELOADING", true);
    try {
      let resp;
      for (let form of state.forms) {
        resp = await this.$axios.$get(`${this.$site_api}/forms/${form.id}`);
        commit("SET_FORM", resp);
      }
      commit("SET_CHANGE", false);
    } catch (error) {
      console.error(error);
    }
    commit("SET_RELOADING", false);
  },
  async saveForm({ commit, state }, payload) {
    try {
      commit("SET_SAVE_LOADING", true);
      const form = state.forms.find(f => f.id == payload);
      const response = await this.$axios.$put(
        `${this.$site_api}/forms/${form.id}`,
        form
      );
      commit("SET_FORM", response);
      commit("SET_SAVE_LOADING", false);
      commit("SET_CHANGE", false);
    } catch (error) {
      console.error(error);
    }
  },
  async saveForms({ commit, state }) {
    commit("SET_SAVE_LOADING", true);
    for (let id of state.changeForms) {
      try {
        const form = state.forms.find(f => f.id == id);
        const response = await this.$axios.$put(
          `${this.$site_api}/forms/${form.id}`,
          form
        );
        commit("SET_FORM", response);
      } catch (error) {
        console.error(error);
      }
    }
    commit("SET_SAVE_LOADING", false);
    commit("SET_CHANGE", false);
    commit("RESET_CHANGE_FORMS");
  },
  async addForm({ commit, state }, payload) {
    try {
      const template = payload.template || {
        form: {
          title: "Заголовок формы",
          button: "Отправить"
        }
      };
      const form = await this.$axios.$post(`${this.$site_api}/forms`, {
        ...template,
        //mail: {},
        admin: this.$auth.user.id,
        section: payload.sectionId,
        site: payload.siteId
      });
      if (payload.sectionId && payload.field) {
        commit(
          "pages/SET_SECTION_FIELD",
          {
            id: payload.sectionId,
            field: payload.field,
            value: form.id
          },
          { root: true }
        );
      }
    } catch (error) {
      console.error(error);
    }
  },
  async removeSectionForms({ commit, state }, payload) {
    try {
    } catch (error) {
      console.error(error);
    }
  },
  showMessage({ commit }, message) {
    commit("SET_MESSAGE", message);
    commit("SET_IS_MESSAGE", true);
  },
  hideMessage({ commit }) {
    commit("SET_IS_MESSAGE", false);
  },
  showEditor({ commit }, editor) {
    commit("SET_EDITOR", editor);
    commit("SET_IS_EDITOR", true);
  },
  hideEditor({ commit }) {
    commit("SET_IS_EDITOR", false);
  },
  showLicence({ commit }, show) {
    commit("SET_LICENCE", show);
  }
};

export const getters = {
  forms: state => state.forms,
  change: state => state.change,
  saveLoading: state => state.saveLoading,
  reloading: state => state.reloading,
  form: state => id => state.forms.find(f => f.id == id),
  message: state => state.message,
  isMessage: state => state.isMessage,
  editor: state => state.editor,
  isEditor: state => state.isEditor,
  licence: state => state.licence
};
