<template>
  <v-card>
    <v-card-title>Почтовое уведомление</v-card-title>
    <v-card-text>
      <v-text-field label="Заголовок письма" v-model="subject" />
      <v-text-field label="E-mail отправки" v-model="to" />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        :disabled="!params.mailChange"
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
      setMailField: "forms/SET_MAIL_FIELD"
    }),
    ...mapActions({
      loadForm: "forms/loadForm",
      saveForm: "forms/saveForm"
    }),
    async save() {
      this.process = true;
      const formId = this.params.form.id;
      await this.loadForm(formId);
      this.setMailField({
        formId: formId,
        field: "subject",
        value: this.subject
      });
      this.setMailField({
        formId: formId,
        field: "to",
        value: this.to
      });
      await this.saveForm(formId);
      this.params.mailChange = false;
      this.process = false;
    }
  },
  computed: {
    subject: {
      get() {
        return this.params.form.mail.subject;
      },
      set(value) {
        this.params.form.mail.subject = value;
        this.params.mailChange = true;
      }
    },
    to: {
      get() {
        return this.params.form.mail.to;
      },
      set(value) {
        this.params.form.mail.to = value;
        this.params.mailChange = true;
      }
    }
  }
};
</script>
