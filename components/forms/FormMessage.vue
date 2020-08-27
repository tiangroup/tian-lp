<template>
  <v-dialog v-model="dialog" max-width="430px">
    <div class="info-popup">
      <div class="der-popup">
        <div class="der-popup__close">
          <button
            class="button button-icon button-close"
            @click="dialog = false"
          >
            <span class="sr-only">Закрыть</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L9 9M17 17L9 9M9 9L1 17M9 9L17 1"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        <div class="der-popup__body" v-if="message">
          <div class="form__message">
            <div
              class="form__status"
              :class="{ 'form__status--fail': message.error }"
            >
              {{ caption }}
            </div>
            <div class="form__details">
              {{ text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      message: "forms/message",
      isMessage: "forms/isMessage"
    }),
    dialog: {
      get: function() {
        return this.isMessage;
      },
      set: function(value) {
        if (!value) {
          this.hideMessage();
        }
      }
    },
    caption() {
      if (this.message.caption) {
        return this.message.caption;
      } else {
        return this.message.error
          ? "Сообщение не отправлено"
          : "Сообщение отправлено успешно";
      }
    },
    text() {
      if (this.message.text) {
        return this.message.text;
      } else {
        return this.message.error
          ? "При отправке сообщения произошла ошибка. Пожалуйста, свяжитесь с нами по телефону."
          : "Наш менеджер свяжется с вами в ближайшее время.";
      }
    }
  },
  methods: {
    ...mapActions({
      hideMessage: "forms/hideMessage"
    })
  }
};
</script>
