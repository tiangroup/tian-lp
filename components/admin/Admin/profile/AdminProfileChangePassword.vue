<template>
  <v-card>
    <v-card-title>Изменить пароль</v-card-title>
    <v-card-text>
      <v-text-field label="Старый пароль" />
      <v-text-field label="Новый пароль" />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="save">
        Изменить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
