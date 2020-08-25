<template>
<v-card>
  <v-toolbar>
    <v-toolbar-title>Форма: {{ params.form.title }}</v-toolbar-title>
  </v-toolbar>
  <v-tabs>
    <v-tab>Статистика</v-tab>
    <v-tab>Сообщения</v-tab>
    <v-tab>Настройки</v-tab>

    <v-tab-item class="mt-4"> </v-tab-item>
    <v-tab-item class="mt-4">
      <v-data-table :headers="headers" :items="items" fixed-header hide-default-footer v-if="isItems">
        <template v-slot:[`item.datetime`]="{ item }">
          {{ new Date(item.datetime).toLocaleString("ru") }}
        </template>
        <template v-slot:[`item.data`]="{ item }">
          <div v-for="(field, i) in item.data" :key="i">
            <strong>{{ field.name }}</strong>: {{ field.type == "check" ? "да" : field.value }}
          </div>
        </template>
      </v-data-table>
    </v-tab-item>
    <v-tab-item class="mt-4">
      <v-container>
        <v-text-field label="E-mail отправки" v-model="params.mail.to" />
        <v-text-field label="Заголовок письма" v-model="params.mail.subject" />
      </v-container>
    </v-tab-item>
  </v-tabs>
</v-card>
</template>

<script>
export default {
  fetchOnServer: false,
  props: {
    params: {
      type: Object
    }
  },
  data: () => ({
    headers: [{
        text: "Дата",
        value: "datetime"
      },
      {
        text: "E-mail",
        value: "email"
      },
      {
        text: "Форма",
        value: "data",
        sortable: false
      }
    ],
    items: null
  }),
  async fetch() {
    const items = await this.$axios.$get(`${this.$site_app}/forms/items`, {
      params: {
        form: this.params.id
      }
    });
    this.items = items.map(item => ({
      id: item.id,
      datetime: item.datetime,
      email: item.email,
      data: item.data
    }));
    console.log(this.items);
  },
  computed: {
    isItems() {
      return this.items && this.items.length;
    }
  },
  watch: {
    params: "$fetch"
  }
};
</script>
