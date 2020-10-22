<template>
  <v-card flat>
    <v-toolbar>
      <v-toolbar-title>Форма: {{ params.form.form.title }}</v-toolbar-title>
    </v-toolbar>
    <v-tabs>
      <v-tab>Статистика</v-tab>
      <v-tab>Заявки</v-tab>
      <v-tab>Настройки</v-tab>

      <v-tab-item>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="4">
              <v-card>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>Заявок:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ count }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="items && items.length">
                    <v-list-item-content>Последняя:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ new Date(items[0].datetime).toLocaleString("ru") }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-data-table
          :headers="headers"
          :items="items"
          fixed-header
          hide-default-footer
          v-if="isItems"
        >
          <template v-slot:[`item.datetime`]="{ item }">
            {{ new Date(item.datetime).toLocaleString("ru") }}
          </template>
          <template v-slot:[`item.data`]="{ item }">
            <div class="mt-2 mb-2">
              <div v-for="(field, i) in item.data" :key="i">
                <span class="text-caption font-weight-medium pr-2"
                  >{{ field.name }}:</span
                >
                <span>{{ field.type == "check" ? "да" : field.value }}</span>
              </div>
            </div>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="4">
              <admin-form-mail :params="params"></admin-form-mail>
            </v-col>
            <v-col cols="12" md="4">
              <admin-form-recaptcha :params="params"></admin-form-recaptcha>
            </v-col>
            <v-col cols="12" md="4" v-if="ym">
              <admin-form-metrika :params="params"></admin-form-metrika>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  fetchOnServer: false,
  props: {
    params: {
      type: Object
    }
  },
  data: () => ({
    headers: [
      {
        text: "Дата",
        value: "datetime"
      },
      {
        text: "Форма",
        value: "data",
        sortable: false
      },
      {
        text: "Отправлено на",
        value: "email"
      }
    ],
    items: null,
    count: 0
  }),
  async fetch() {
    const { count } = await this.$axios.$get(
      `${this.$site_app}/forms/items/count`,
      {
        params: {
          form: this.params.form.id
        }
      }
    );
    this.count = count;
    const items = await this.$axios.$get(`${this.$site_app}/forms/items/list`, {
      params: {
        form: this.params.form.id
      }
    });
    this.items = items.map(item => ({
      id: item.id,
      datetime: item.datetime,
      email: item.email,
      data: item.data
    }));
  },
  computed: {
    ...mapGetters({
      recaptcha: "sites/recaptcha",
      ym: "sites/ym"
    }),
    isItems() {
      return this.items && this.items.length;
    }
  },
  watch: {
    "params.form": "$fetch"
  }
};
</script>
