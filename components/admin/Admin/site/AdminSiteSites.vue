<template>
  <v-card>
    <v-card-title>Хостинг</v-card-title>
    <v-card-subtitle>{{ site.name }}.tian-lp.ru</v-card-subtitle>
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
      <v-btn
        color="blue darken-1"
        text
        :disabled="!isSave"
        @click="save"
        :loading="process"
      >
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    edit: {
      active: undefined,
      domain: undefined,
      https: undefined
    },
    process: false
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
  },
  methods: {
    ...mapActions({
      reloadSite: "sites/reloadSite"
    }),
    async save() {
      this.process = true;
      try {
        const { data: update_site } = await this.$axios.$put(
          `${this.$site_app}/api/sites/deploy/sites`,
          {
            site_id: this.site.id,
            active:
              this.edit.active != undefined ? this.edit.active : this.active,
            domain:
              this.edit.domain != undefined ? this.edit.domain : this.domain,
            https: this.edit.https != undefined ? this.edit.https : this.https
          }
        );
        await this.reloadSite();
        this.edit = {
          active: undefined,
          domain: undefined,
          https: undefined
        };
      } catch (error) {
        console.error(error);
      }
      this.process = false;
    }
  }
};
</script>
