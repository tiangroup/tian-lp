<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          dark
          x-small
          color="green"
          v-bind="attrs"
          v-on="on"
          absolute
          top
          left
          @click="drawer = true"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <span>Редактировать форму</span>
    </v-tooltip>

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

          <v-tab-item class="mt-4">
            <v-text-field label="Заголовок формы" v-model="formTitle" />
            <v-text-field
              label="Подпись кнопки отправки"
              v-model="formButton"
            />
            <v-text-field
              v-if="popup"
              label="Подпись кнопки открытия формы"
              v-model="formOpenButton"
            />
          </v-tab-item>
          <v-tab-item class="mt-4">
            <form-editor-input
              v-for="(item, index) in form.fields.filter(i => i.id)"
              :key="item.id"
              :formField="item"
              :formId="form.id"
              :first="index == 0"
              :last="index + 1 == form.fields.length"
            ></form-editor-input>
            <v-row class="justify-center">
              <v-btn fab dark small color="green" @click="newField">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-row>
          </v-tab-item>
          <v-tab-item class="mt-4">
            <v-text-field label="E-mail отправки" v-model="mailTo" />
            <v-text-field label="Заголовок письма" v-model="mailSubject" />
          </v-tab-item>
        </v-tabs>
      </v-container>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  props: {
    section: Object,
    field: {
      type: String,
      default: "form"
    },
    popup: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    drawer: false,
    fieldTypes: [
      {
        name: "Текстовое",
        value: "text"
      },
      {
        name: "E-mail",
        value: "email"
      },
      {
        name: "Телефон",
        value: "phone"
      }
    ]
  }),
  async fetch() {
    if (!this.form) {
      await this.$store.dispatch("forms/loadForm", this.formId);
    }
  },
  computed: {
    ...mapGetters({
      getForm: "forms/form",
      isEdit: "isEdit"
    }),
    form() {
      return this.formId ? this.getForm(this.formId) : null;
    },
    formId() {
      return this.section[this.field];
    },
    formTitle: {
      get: function() {
        return this.form.form.title;
      },
      set: function(value) {
        this.setFormField({
          formId: this.form.id,
          field: "title",
          value: value
        });
      }
    },
    formButton: {
      get: function() {
        return this.form.form.button;
      },
      set: function(value) {
        this.setFormField({
          formId: this.form.id,
          field: "button",
          value: value
        });
      }
    },
    formOpenButton: {
      get: function() {
        return this.form.form.openButton;
      },
      set: function(value) {
        this.setFormField({
          formId: this.form.id,
          field: "openButton",
          value: value
        });
      }
    },
    mailTo: {
      get: function() {
        return this.form.mail ? this.form.mail.to : "";
      },
      set: function(value) {
        this.setMailField({
          formId: this.form.id,
          field: "to",
          value: value
        });
      }
    },
    mailSubject: {
      get: function() {
        return this.form.mail ? this.form.mail.subject : "";
      },
      set: function(value) {
        this.setMailField({
          formId: this.form.id,
          field: "subject",
          value: value
        });
      }
    }
  },
  methods: {
    ...mapMutations({
      setFormField: "forms/SET_FORM_FIELD",
      setMailField: "forms/SET_MAIL_FIELD",
      addFieds: "forms/ADD_FIELDS"
    }),
    ...mapActions({
      saveForms: "forms/saveForms"
    }),
    async newField() {
      this.addFieds({
        formId: this.form.id
      });
      await this.saveForms();
    }
  }
};
</script>

<style scoped>
.over {
  z-index: 100100;
}
</style>
