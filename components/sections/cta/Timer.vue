<template>
  <div class="timer" :class="{ 'timer--expired': timerExpired }">
    <div class="timer__text">До конца акции осталось</div>
    <div class="timer__time" :class="{ 'timer__time--hidden': !timerLoaded }">
      <span class="timer__value timer__value--days">{{ displayDays }}</span>
      <span class="timer__value timer__value--hours">{{ displayHours }}</span>
      <span class="timer__value timer__value--minutes">{{
        displayMinutes
      }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    endDate: String,
  },
  data: () => ({
    displaySeconds: 0,
    displayMinutes: 0,
    displayHours: 0,
    displayDays: 0,
    timer: 0,
    timerLoaded: false,
    timerExpired: false,
  }),
  computed: {
    expDate() {
      let parsedDate = Date.parse(this.endDate);
      if (parsedDate) {
        return parsedDate;
      } else {
        return this.generateEndDate();
      }
    },
    _seconds() {
      return 1000;
    },
    _minutes() {
      return this._seconds * 60;
    },
    _hours() {
      return this._minutes * 60;
    },
    _days() {
      return this._hours * 24;
    },
  },
  methods: {
    formatNum: (num) => (num < 10 ? "0" + num : num),
    timerTick() {
      const now = new Date();
      const distance = this.expDate - now.getTime();

      if (distance < 0) {
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.timerExpired = true;
        this.timerLoaded = true;
        this.displayMinutes = 0;
        this.displayHours = 0;
        this.displayDays = 0;
        this.$emit("expired");
        return;
      } else {
        this.timerExpired = false;
      }

      const days = Math.floor(distance / this._days);
      const hours = Math.floor((distance % this._days) / this._hours);
      const minutes = Math.floor((distance % this._hours) / this._minutes);
      const seconds = Math.floor((distance % this._minutes) / this._seconds);

      this.displaySeconds = this.formatNum(seconds);
      this.displayMinutes = this.formatNum(minutes);
      this.displayHours = this.formatNum(hours);
      this.displayDays = this.formatNum(days);
      this.timerLoaded = true;
    },
    showRemaining() {
      this.timerTick();
      // interval set to 1 min, cause seconds are not displayed.
      this.timer = setInterval(this.timerTick, 60000);
    },
    generateEndDate() {
      let computedDate = new Date();
      computedDate.setTime(
        computedDate.getTime() + 84 * 60 * 60 * 1000 + 15 * 60 * 1000
      );
      return computedDate.getTime();
    },
  },
  mounted() {
    this.showRemaining();
  },
  watch: {
    expDate: function () {
      this.showRemaining();
    },
  },
};
</script>