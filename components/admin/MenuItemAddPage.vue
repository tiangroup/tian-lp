<template>
  <v-list-item link @click="dialog = true">
    <v-list-item-icon>
      <v-icon>mdi-plus</v-icon>
    </v-list-item-icon>
    <v-list-item-title>Добавить</v-list-item-title>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Настройки</span>
        </v-card-title>

        <v-card-text
          >Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.</v-card-text
        >

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Отмена</v-btn
          >
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Сохранить</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script>
export default {
  data: () => ({
    dialog: false
  })
};
</script>
