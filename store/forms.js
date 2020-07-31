export const state = () => ({
  forms: [],
  change: false,
  saveLoading: false,
  changeForms: []
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
  }
};

export const actions = {
  async loadForm({ commit, state }, payload) {
    try {
      const form = await this.$axios.$get(`${this.$url_api}/forms/${payload}`);
      commit("SET_FORM", form);
      commit("SET_CHANGE", false);
    } catch (error) {
      console.error(error);
    }
  },
  async saveForm({ commit, state }, payload) {
    try {
      commit("SET_SAVE_LOADING", true);
      const form = state.forms.find(f => f.id == payload);
      const response = await this.$axios.$put(
        `/api/data/forms/${form.id}`,
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
          `/api/data/forms/${form.id}`,
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
  }
};

export const getters = {
  forms: state => state.forms,
  change: state => state.change,
  saveLoading: state => state.saveLoading,
  form: state => id => state.forms.find(f => f.id == id)
};