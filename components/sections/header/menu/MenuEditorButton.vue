<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        dark
        x-small
        color="blue"
        v-bind="attrs"
        v-on="on"
        @click="$emit('click')"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </template>
    <span>Редактировать меню</span>
  </v-tooltip>
</template>
