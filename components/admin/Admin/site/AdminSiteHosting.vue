<template>
  <v-card>
    <v-card-title>Хостинг</v-card-title>
    <v-card-subtitle>{{ site.name }}.tian-lp.ru</v-card-subtitle>
    <v-card-text>
      <div class="mb-4" v-for="(href, key) in siteLink" :key="key">
        <a :href="href" target="_blank"> {{ href }} </a>&nbsp;
        <v-icon small>
          mdi-open-in-new
        </v-icon>
      </div>
      <div>Сайт изменен: {{ updates }}</div>
      <div>
        Публикация: {{ publishes }}
        <v-chip color="pink" label text-color="white" small v-if="overdate">
          устарела
        </v-chip>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        :loading="processPublish"
        @click="publish"
      >
        Опубликовать
        <v-icon right dark>mdi-cloud-upload</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const moment = require("moment");
export default {
  data: () => ({
    processPublish: false
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
    updates() {
      moment.locale("RU");
      return this.site.updates
        ? moment(this.site.updates).format("LLL")
        : "нет";
    },
    publishes() {
      moment.locale("RU");
      return this.site.deploy && this.site.deploy.publish
        ? moment(this.site.deploy.publish).format("LLL")
        : "нет";
    },
    overdate() {
      if (this.site.deploy && this.site.deploy.publish && this.site.updates) {
        return this.site.updates > this.site.deploy.publish;
      } else {
        return false;
      }
    },
    siteLink() {
      let hrefs = [`https://${this.site.name}.tian-lp.ru`];
      if (this.sites.domain) {
        hrefs = this.sites.domain
          .split(" ")
          .filter(d => d != "")
          .map(d => (this.sites.https ? `https://${d}` : `http://${d}`));
      }
      return hrefs;
    }
  },
  methods: {
    ...mapActions({
      reloadSite: "sites/reloadSite"
    }),
    async publish() {
      this.processPublish = true;
      try {
        const data = await this.$axios.$post(
          `${this.$site_app}/api/sites/publish`,
          {
            site_id: this.site.id
          }
        );
        if (data.status) {
          this.reloadSite();
        }
      } catch (error) {
        console.error(error);
        this.$error({
          message:
            "Произошла непредвиденная ошибка, попробуйте повторить позже."
        });
      }
      this.processPublish = false;
    }
  }
};
</script>
