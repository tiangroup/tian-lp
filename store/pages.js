export const state = () => ({
  page: null,
  change: false,
  saveLoading: false
});

export const mutations = {
  SET_PAGE(state, page) {
    state.page = page;
  },
  SET_SECTION(state, section) {
    const index = state.page.sections.indexOf(
      state.page.sections.filter(s => s.id === section.id).shift()
    );
    if (index > -1) {
      state.page.sections.splice(index, 1, section);
      state.change = true;
    }
  },
  SET_CHANGE(state, change) {
    state.change = change;
  },
  SET_SAVE_LOADING(state, saveLoading) {
    state.saveLoading = saveLoading;
  },
  SET_SECTION_FIELD(state, data) {
    const section = state.page.sections.find(s => s.id === data.id);
    section[data.field] = data.value;
    state.change = true;
  },
  SET_SETTINGS_FIELD(state, data) {
    const section = state.page.sections.find(s => s.id === data.id);
    section.settings[data.field] = data.value;
    state.change = true;
  },
  SET_ITEM_FIELD(state, data) {
    const section = state.page.sections.find(s => s.id === data.sectionId);
    const item = section[data.items].find(i => i.id === data.itemId);
    item[data.field] = data.value;
    state.change = true;
  },
  ADD_ITEM(state, data) {
    const section = state.page.sections.find(s => s.id === data.sectionId);
    if (data.itemId) {
      const item = section[data.items].find(i => i.id === data.itemId);
      const index = section[data.items].indexOf(item);
      if (index > -1) {
        section[data.items].splice(index + 1, 0, data.itemNew);
      }
    } else {
      section[data.items].push(data.itemNew);
    }
    state.change = true;
  },
  DELETE_ITEM(state, data) {
    const section = state.page.sections.find(s => s.id === data.sectionId);
    const item = section[data.items].find(i => i.id === data.itemId);
    const index = section[data.items].indexOf(item);
    if (index > -1) {
      section[data.items].splice(index, 1);
    }
    state.change = true;
  },
  DOWN_ITEM(state, data) {
    const section = state.page.sections.find(s => s.id === data.sectionId);
    const item = section[data.items].find(i => i.id === data.itemId);
    const index = section[data.items].indexOf(item);
    if (index > -1 && index + 1 < section[data.items].length) {
      const itemUp = section[data.items].splice(index, 1).shift();
      section[data.items].splice(index + 1, 0, itemUp);
      state.change = true;
    }
  },
  UP_ITEM(state, data) {
    const section = state.page.sections.find(s => s.id === data.sectionId);
    const item = section[data.items].find(i => i.id === data.itemId);
    const index = section[data.items].indexOf(item);
    if (index > -1 && index - 1 >= 0) {
      const itemUp = section[data.items].splice(index, 1).shift();
      section[data.items].splice(index - 1, 0, itemUp);
      state.change = true;
    }
  },
  SET_HEAD(state, payload) {
    state.page.head = payload;
    state.change = true;
  },
  SET_OBJECT_FIELD(state, payload) {
    const section = state.page.sections.find(s => s.id === payload.sectionId);
    const object = section[payload.objectField];
    object[payload.field] = payload.value;
    state.change = true;
  },
  ADD_SECTION(state, payload) {
    if (payload.sectionId) {
      const section = state.page.sections.find(s => s.id === payload.sectionId);
      const index = state.page.sections.indexOf(section);
      if (index > -1) {
        state.page.sections.splice(index + 1, 0, payload.section);
      }
    } else {
      state.page.sections.push(payload.section);
    }
    state.change = true;
  },
  DOWN_SECTION(state, payload) {
    const section = state.page.sections.find(s => s.id === payload.sectionId);
    const index = state.page.sections.indexOf(section);
    if (index > -1 && index + 1 < state.page.sections.length) {
      const itemUp = state.page.sections.splice(index, 1).shift();
      state.page.sections.splice(index + 1, 0, itemUp);
      state.change = true;
    }
  },
  UP_SECTION(state, payload) {
    const section = state.page.sections.find(s => s.id === payload.sectionId);
    const index = state.page.sections.indexOf(section);
    if (index > -1 && index - 1 >= 0) {
      const itemUp = state.page.sections.splice(index, 1).shift();
      state.page.sections.splice(index - 1, 0, itemUp);
      state.change = true;
    }
  },
  DELETE_SECTION(state, payload) {
    const section = state.page.sections.find(s => s.id === payload.sectionId);
    const index = state.page.sections.indexOf(section);
    if (index > -1) {
      state.page.sections.splice(index, 1);
    }
    state.change = true;
  }
};

export const actions = {
  async loadPage({ commit }, id) {
    try {
      const page = await this.$axios.$get(`${this.$site_api}/pages/${id}`);
      commit("SET_PAGE", page);
      commit("SET_CHANGE", false);
    } catch (error) {
      console.error(error);
    }
  },
  async savePage({ commit, state, rootGetters }) {
    try {
      commit("SET_SAVE_LOADING", true);
      const page = state.page;
      const response = await this.$axios.$put(
        `${this.$site_api}/pages/${page.id}`,
        page
      );
      await this.$axios.$put(`${this.$site_app}/api/sites/updates`, {
        site_id: rootGetters["sites/site"].id
      });
      commit("SET_PAGE", response);
      commit("SET_SAVE_LOADING", false);
      commit("SET_CHANGE", false);
    } catch (error) {
      console.error(error);
    }
  }
};

export const getters = {
  page: state => state.page,
  change: state => state.change,
  saveLoading: state => state.saveLoading,
  head: state => (state.page ? state.page.head : null)
};
