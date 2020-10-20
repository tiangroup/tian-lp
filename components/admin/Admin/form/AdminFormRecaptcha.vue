<template>
  <v-card>
    <v-card-title>Защита от спама (reCAPTCHA v3)</v-card-title>
    <v-card-text>
      <v-checkbox
        label="Включить защиту"
        v-model="recaptchaActive"
      ></v-checkbox>
      <v-text-field label="Ключ сайта" v-model="recaptchaSitekey" />
      <v-text-field label="Секретный ключ" v-model="recaptchaSecret" />
    </v-card-text>
    <v-card-actions>
      <a target="_blank" href="https://www.google.com/recaptcha/admin">
        Получить ключи
        <v-icon color="primary" small>
          mdi-open-in-new
        </v-icon>
      </a>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        :disabled="!change"
        :loading="process"
        @click="save"
      >
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  props: {
    params: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      change: "sites/change",
      recaptcha: "sites/recaptcha",
      process: "sites/saveLoading"
    }),
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
    }
  },
  methods: {
    ...mapMutations({
      setRecaptchaField: "sites/SET_RECAPTCHA_FIELD"
    }),
    ...mapActions({
      saveSite: "sites/saveSite"
    }),
    save() {
      this.saveSite();
    }
  }
};
</script>
