<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Сайт</v-toolbar-title>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  fetchOnServer: false,
  props: {
    params: {
      type: Object
    }
  }
};
</script>
