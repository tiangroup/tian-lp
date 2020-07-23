<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          dark
          color="green"
          v-bind="attrs"
          v-on="on"
          @click="showNewSectionEditor = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Добавить новый блок на страницу</span>
    </v-tooltip>
    <new-section-editor
      :show="showNewSectionEditor"
      @onClose="showNewSectionEditor = false"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    showNewSectionEditor: false
  })
};
</script>
