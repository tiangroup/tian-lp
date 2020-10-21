<template>
  <v-card>
    <v-card-title>Метрика</v-card-title>
    <v-card-text>
      <v-checkbox label="Включить метрику" v-model="active"></v-checkbox>
      <v-text-field label="Идентификатор цели" v-model="target" />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        :disabled="!params.metrikaChange"
        :loading="process"
        @click="save"
      >
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  props: {
    params: {
      type: Object
    }
  },
  data: () => ({
    process: false
  }),
  methods: {
    ...mapMutations({
      setMetrikaField: "forms/SET_METRIKA_FIELD"
    }),
    ...mapActions({
      loadForm: "forms/loadForm",
      saveForm: "forms/saveForm"
    }),
    async save() {
      this.process = true;
      const formId = this.params.form.id;
      await this.loadForm(formId);
      this.setMetrikaField({
        formId: formId,
        field: "active",
        value: this.active
      });
      this.setMetrikaField({
        formId: formId,
        field: "target",
        value: this.target
      });
      await this.saveForm(formId);
      this.params.metrikaChange = false;
      this.process = false;
    },
    checkMetrika() {
      if (!this.params.form.metrika) {
        this.params.form.metrika = {
          active: false,
          target: "FORM"
        };
      }
    }
  },
  computed: {
    active: {
      get() {
        this.checkMetrika();
        return this.params.form.metrika.active;
      },
      set(value) {
        this.checkMetrika();
        this.params.form.metrika.active = value;
        this.params.metrikaChange = true;
      }
    },
    target: {
      get() {
        this.checkMetrika();
        return this.params.form.metrika.target;
      },
      set(value) {
        this.checkMetrika();
        this.params.form.metrika.target = value;
        this.params.metrikaChange = true;
      }
    }
  }
};
</script>
