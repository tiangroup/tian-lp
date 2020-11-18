<template>
  <v-snackbar
    v-model="snackbar"
    content-class="lnotice"
    timeout="-1"
    light
    rounded-lg
    v-if="iagree === 0"
  >
    <div class="lnotice__item">
      <div class="lnotice__text">
        Просматривая этот сайт, вы соглашаетесь с
        <a href="">политикой конфиденциальности</a> и соглашаетесь на
        использование файлов cookie
      </div>

      <div class="lnotice__action">
        <button class="button button-primary" @click="handleAgreement">
          <span class="button__body">Ознакомлен</span>
        </button>
      </div>
    </div>
  </v-snackbar>
</template>
<script>
export default {
  data: function () {
    return {
      iagree: 1,
      snackbar: true
    };
  },
  methods: {
    handleAgreement() {
      this.snackbar = false;
      localStorage.iagree = 1;
    }
  },
  mounted() {
    if (localStorage.iagree) {
      this.iagree = parseInt(localStorage.iagree);
    } else {
      this.iagree = 0;
    }
  },
  watch: {
    iagree(newVal) {
      localStorage.iagree = newVal;
    }
  }
};
</script>
<style>
.v-snack__content {
  padding: 0;
}
.v-snack__wrapper {
  background-color: var(--bg-color) !important;
  color: var(--text-color) !important;
  max-width: none;
  width: 90%;
}
.lnotice a {
  color: var(--theme-color);
}
@media (min-width: 1024px) {
  .v-snack__wrapper {
    width: 78rem;
  }
}
</style>