<template>
  <v-list-item link @click="openPanel">
    <v-list-item-icon>
      <v-icon>mdi-tune</v-icon>
    </v-list-item-icon>
    <v-list-item-title>Настройки</v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  methods: {
    openPanel() {
      this.$tuningPanel(true);
    }
  }
};
</script>
