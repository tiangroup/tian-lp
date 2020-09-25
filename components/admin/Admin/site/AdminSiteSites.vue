<template>
  <v-card>
    <v-card-title>Хостинг tian-lp.ru</v-card-title>
    <v-card-text>
      <v-checkbox v-model="active" label="публиковать"></v-checkbox>
      <v-text-field v-model="domain" label="Свой домен" />
      <v-checkbox
        v-model="https"
        label="включить https"
        v-if="isHttps"
      ></v-checkbox>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text :disabled="!isSave">
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    edit: {
      active: undefined,
      domain: undefined,
      https: undefined
    }
  }),
  computed: {
    ...mapGetters({
      site: "sites/site"
    }),
    sites() {
      return this.site.deploy && this.site.deploy.sites
        ? this.site.deploy.sites
        : {};
    },
    active: {
      get() {
        return this.sites.active;
      },
      set(value) {
        this.edit.active = value === this.sites.active ? undefined : value;
      }
    },
    domain: {
      get() {
        return this.sites.domain;
      },
      set(value) {
        this.edit.domain = value === this.sites.domain ? undefined : value;
      }
    },
    https: {
      get() {
        return this.sites.https;
      },
      set(value) {
        this.edit.https = value === this.sites.https ? undefined : value;
      }
    },
    isSave() {
      return (
        this.edit.active != undefined ||
        this.edit.domain != undefined ||
        this.edit.https != undefined
      );
    },
    isHttps() {
      return (this.domain && this.edit.domain == undefined) || this.edit.domain;
    }
  }
};
</script>
