<template>
  <v-card class="mb-4">
    <v-card-title>
      <span>{{ formField.label }}</span>
      <v-spacer></v-spacer>
      <v-btn icon fab x-small color="green" v-if="!first" @click="fieldUp">
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
      <v-btn icon fab x-small color="green" v-if="!last" @click="fieldDown">
        <v-icon>mdi-arrow-down</v-icon>
      </v-btn>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-expand-transition>
      <v-card-text v-show="show">
        <v-text-field label="Поле формы" v-model="fieldLabel" />
        <v-select
          :items="fieldTypes"
          item-text="name"
          item-value="value"
          label="Тип поля"
          v-model="fieldType"
        ></v-select>
        <v-textarea
          v-if="fieldType == 'radio' || fieldType == 'select'"
          outlined
          label="Значения (одна линия на значение)"
          auto-grow
          rows="3"
          v-model="fieldValues"
        ></v-textarea>
        <v-checkbox label="Обязательное" v-model="fieldRequired"></v-checkbox>
        <v-row class="mr-1">
          <v-spacer></v-spacer>
          <v-btn icon @click="fieldDelete">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-row>
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    formField: {},
    formId: String,
    first: false,
    last: false
  },
  data: () => ({
    show: false,
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
        value: "tel"
      },
      {
        name: "Многострочный текст",
        value: "textarea"
      },
      {
        name: "Выпадающий список",
        value: "select"
      },
      {
        name: "Чек-бокс",
        value: "check"
      },
      {
        name: "Радио-бокс",
        value: "radio"
      }
    ]
  }),
  computed: {
    fieldLabel: {
      get: function() {
        return this.formField.label;
      },
      set: function(value) {
        this.setField({
          formId: this.formId,
          fieldId: this.formField.id,
          field: "label",
          value: value
        });
      }
    },
    fieldRequired: {
      get: function() {
        return this.formField.required;
      },
      set: function(value) {
        this.setField({
          formId: this.formId,
          fieldId: this.formField.id,
          field: "required",
          value: value
        });
      }
    },
    fieldType: {
      get: function() {
        return this.formField.type;
      },
      set: function(value) {
        this.setField({
          formId: this.formId,
          fieldId: this.formField.id,
          field: "type",
          value: value
        });
      }
    },
    fieldValues: {
      get: function() {
        return this.formField.values;
      },
      set: function(value) {
        this.setField({
          formId: this.formId,
          fieldId: this.formField.id,
          field: "values",
          value: value
        });
      }
    }
  },
  methods: {
    ...mapMutations({
      setField: "forms/SET_FIELDS_FIELD",
      deleteField: "forms/DELETE_FIELDS",
      upField: "forms/UP_FIELDS",
      downField: "forms/DOWN_FIELDS"
    }),
    fieldDelete() {
      this.deleteField({
        formId: this.formId,
        fieldId: this.formField.id
      });
    },
    fieldUp() {
      this.upField({
        formId: this.formId,
        fieldId: this.formField.id
      });
    },
    fieldDown() {
      this.downField({
        formId: this.formId,
        fieldId: this.formField.id
      });
    }
  }
};
</script>
