<template>
  <v-snackbar
    v-model="snackbar"
    :multi-line="multiLine"
    content-class="lnotice"
  >
    <div class="lnotice__item">
      <div class="lnotice__text">
        Просматривая этот сайт, вы соглашаетесь с
        <a href="">политикой конфиденциальности</a> и соглашаетесь на
        использование файлов cookie
      </div>
    </div>
    <template v-slot:action="{ attrs }">
      <button
        class="button button-primary"
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </button>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  data: function () {
    return {
      snackbar: true
    };
  }
};
</script>