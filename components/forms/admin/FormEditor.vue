<template>
  <v-navigation-drawer
    app
    class="over"
    v-model="drawer"
    right
    temporary
    width="460"
  >
    <v-list-item>
      <v-btn icon @click="drawer = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-list-item>

    <v-container v-if="form">
      <v-tabs>
        <v-tab>Форма</v-tab>
        <v-tab>Поля</v-tab>
        <v-tab>Настройки</v-tab>

        <v-tab-item>
          <v-container>
            <v-card class="mt-4">
              <v-card-text>
                <v-text-field label="Заголовок формы" v-model="formTitle" />
                <v-text-field
                  label="Описание формы"
                  v-model="formDescription"
                />
                <v-text-field
                  label="Подпись кнопки отправки"
                  v-model="formButton"
                />
                <v-text-field
                  v-if="popup"
                  label="Подпись кнопки открытия формы"
                  v-model="formOpenButton"
                />
                <v-text-field
                  label="Сообщение после успешной отправки"
                  v-model="formSuccessMessage"
                />
              </v-card-text>
            </v-card>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container>
            <form-editor-input
              v-for="(item, index) in form.fields.filter((i) => i.id)"
              :key="item.id"
              :formField="item"
              :formId="form.id"
              :first="index == 0"
              :last="index + 1 == form.fields.length"
            ></form-editor-input>
            <v-row class="justify-center mt-4">
              <v-btn fab dark small color="green" @click="newField">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container>
            <form-editor-settings :form="form" />
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getForm: "forms/form",
      isEdit: "isEdit",
      isEditor: "forms/isEditor",
      editor: "forms/editor",
    }),
    drawer: {
      get: function () {
        return this.isEditor;
      },
      set: function (value) {
        if (!value) {
          this.hideEditor();
        }
      },
    },
    formId() {
      return this.editor ? this.editor.formId : null;
    },
    popup() {
      return this.editor ? this.editor.popup : null;
    },
    form() {
      return this.formId ? this.getForm(this.formId) : null;
    },
    formTitle: {
      get: function () {
        return this.form.form.title;
      },
      set: function (value) {
        this.setFormField({
          formId: this.form.id,
          field: "title",
          value: value,
        });
      },
    },
    formDescription: {
      get: function () {
        return this.form.form.description;
      },
      set: function (value) {
        this.setFormField({
          formId: this.form.id,
          field: "description",
          value: value,
        });
      },
    },
    formButton: {
      get: function () {
        return this.form.form.button;
      },
      set: function (value) {
        this.setFormField({
          formId: this.form.id,
          field: "button",
          value: value,
        });
      },
    },
    formOpenButton: {
      get: function () {
        return this.form.form.openButton;
      },
      set: function (value) {
        this.setFormField({
          formId: this.form.id,
          field: "openButton",
          value: value,
        });
      },
    },
    formSuccessMessage: {
      get: function () {
        return this.form.form.successMessage;
      },
      set: function (value) {
        this.setFormField({
          formId: this.form.id,
          field: "successMessage",
          value: value,
        });
      },
    },
  },
  methods: {
    ...mapMutations({
      setFormField: "forms/SET_FORM_FIELD",
      addFieds: "forms/ADD_FIELDS",
    }),
    ...mapActions({
      saveForms: "forms/saveForms",
      hideEditor: "forms/hideEditor",
    }),
    async newField() {
      this.addFieds({
        formId: this.form.id,
      });
      await this.saveForms();
    },
  },
};
</script>

<style scoped>
.over {
  z-index: 600;
}
</style>
