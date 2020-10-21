<template>
  <div>
    <v-card class="mt-4">
      <v-card-title>Почтовое уведомление</v-card-title>
      <v-card-text>
        <v-text-field label="Заголовок письма" v-model="mailSubject" />
        <v-text-field label="E-mail отправки" v-model="mailTo" />
      </v-card-text>
    </v-card>

    <v-card class="mt-4">
      <v-card-title>Защита от спама</v-card-title>
      <v-card-text>
        <v-checkbox
          label="Включить защиту (reCAPTCHA v3)"
          v-model="recaptchaActive"
        ></v-checkbox>
        <v-text-field
          v-if="recaptchaActive"
          label="Ключ сайта"
          v-model="recaptchaSitekey"
        />
        <v-text-field
          v-if="recaptchaActive"
          label="Секретный ключ"
          v-model="recaptchaSecret"
        />
        <a
          target="_blank"
          href="https://www.google.com/recaptcha/admin"
          v-if="recaptchaActive"
        >
          Получить ключи
          <v-icon color="primary" small>
            mdi-open-in-new
          </v-icon>
        </a>
      </v-card-text>
    </v-card>
    <v-card class="mt-4" v-if="ym">
      <v-card-title>Метрика</v-card-title>
      <v-card-text>
        <v-checkbox
          label="Включить метрику"
          v-model="metrikaActive"
        ></v-checkbox>
        <v-text-field
          label="Идентификатор цели"
          v-model="metrikaTarget"
          v-if="!!metrikaActive"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {
    form: Object
  },
  computed: {
    ...mapGetters({
      recaptcha: "sites/recaptcha",
      ym: "sites/ym"
    }),
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
    },
    recaptchaActive: {
      get: function() {
        return this.recaptcha.active;
      },
      set: function(value) {
        this.setRecaptchaField({
          field: "active",
          value: value
        });
      }
    },
    recaptchaSitekey: {
      get: function() {
        return this.recaptcha.sitekey;
      },
      set: function(value) {
        this.setRecaptchaField({
          field: "sitekey",
          value: value
        });
      }
    },
    recaptchaSecret: {
      get: function() {
        return this.recaptcha.secret;
      },
      set: function(value) {
        this.setRecaptchaField({
          field: "secret",
          value: value
        });
      }
    },
    metrikaActive: {
      get: function() {
        return this.form.metrika ? this.form.metrika.active : false;
      },
      set: function(value) {
        this.setMetrikaField({
          formId: this.form.id,
          field: "active",
          value: value
        });
      }
    },
    metrikaTarget: {
      get: function() {
        return this.form.metrika ? this.form.metrika.target : "";
      },
      set: function(value) {
        this.setMetrikaField({
          formId: this.form.id,
          field: "target",
          value: value
        });
      }
    }
  },
  methods: {
    ...mapMutations({
      setMailField: "forms/SET_MAIL_FIELD",
      setMetrikaField: "forms/SET_METRIKA_FIELD",
      setRecaptchaField: "sites/SET_RECAPTCHA_FIELD"
    })
  }
};
</script>
