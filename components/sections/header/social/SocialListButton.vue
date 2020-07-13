<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        dark
        x-small
        color="green"
        right
        v-bind="attrs"
        v-on="on"
        @click="$emit('click')"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <span>Редактировать социальные сети</span>
  </v-tooltip>
</template>
