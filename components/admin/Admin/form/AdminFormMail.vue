<template>
  <v-card>
    <v-card-title>Почтовое уведомление</v-card-title>
    <v-card-text>
      <v-text-field label="Заголовок письма" v-model="form.mail.subject" />
      <v-text-field label="E-mail отправки" v-model="form.mail.to" />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="save">
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    form: {
      type: Object
    }
  },
  methods: {
    ...mapMutations({
      setMailField: "forms/SET_MAIL_FIELD"
    }),
    save() {
      // this.setMailField({
      //   formId: this.form.id,
      //   field: "subject",
      //   value: this.form.mail.subject
      // });
      // this.setMailField({
      //   formId: this.form.id,
      //   field: "to",
      //   value: this.form.mail.to
      // });
    }
  }
};
</script>
