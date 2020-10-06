<template>
  <v-card flat>
    <v-toolbar>
      <v-toolbar-title>Сайт</v-toolbar-title>
    </v-toolbar>
    <v-tabs>
      <v-tab>Информация</v-tab>
      <v-tab>Публикации</v-tab>
      <v-tab-item>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="4">
              <v-card>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>Публикация:</v-list-item-content>
                    <v-list-item-content>
                      {{ publishes }}
                      <div v-if="overdate">
                        <v-chip color="pink" label text-color="white" small>
                          устарела
                        </v-chip>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Страниц:</v-list-item-content>
                    <v-list-item-content>
                      {{ pages.count }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="params.forms">
                    <v-list-item-content>Форм:</v-list-item-content>
                    <v-list-item-content>
                      {{ forms.count }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Изменен:</v-list-item-content>
                    <v-list-item-content>
                      {{ updates }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container fluid>
          <v-btn
            color="primary"
            @click="publish"
            :loading="processPublish"
            :disabled="!isPublish"
          >
            Опубликовать
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>
          <v-row>
            <v-col cols="12" md="4">
              <admin-site-sites />
            </v-col>
            <!--
            <v-col cols="12" md="4">
              <v-card>
                <v-card-title>Свой хостинг</v-card-title>
                <v-card-text>
                  <v-checkbox label="Публиковать"></v-checkbox>
                  <v-select
                    :items="['SFTP', 'FTP']"
                    label="Протокол передачи"
                  ></v-select>
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-text-field label="Имя хоста" />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field label="Порт" />
                    </v-col>
                  </v-row>
                  <v-text-field label="Имя пользователя" />
                  <v-text-field label="Пароль" type="password" />
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text>
                    Сохранить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            -->
            <v-col cols="12" md="4">
              <admin-site-archive />
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const moment = require("moment");
export default {
  fetchOnServer: false,
  props: {
    params: {
      type: Object
    }
  },
  data: () => ({
    processPublish: false
  }),
  computed: {
    ...mapGetters({
      site: "sites/site"
    }),
    publishes() {
      moment.locale("RU");
      return this.site.deploy && this.site.deploy.publish
        ? moment(this.site.deploy.publish).format("LLL")
        : "Нет";
    },
    updates() {
      moment.locale("RU");
      return this.site.updates
        ? moment(this.site.updates).format("LLL")
        : "Нет";
    },
    overdate() {
      if (this.site.deploy && this.site.deploy.publish && this.site.updates) {
        return this.site.updates > this.site.deploy.publish;
      } else {
        return false;
      }
    },
    pages() {
      return { count: this.site.pages.length };
    },
    forms() {
      return { count: this.params.forms.length };
    },
    isPublish() {
      if (
        this.site.deploy &&
        this.site.deploy.sites &&
        this.site.deploy.sites.active
      ) {
        return true;
      } else {
        return false;
      }
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
