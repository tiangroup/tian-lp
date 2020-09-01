<template>
  <div class="timer" :class="{ 'timer--expired': timerExpired }">
    <div class="timer__text">До конца акции осталось</div>
    <div class="timer__time" :class="{'timer__time--hidden': !timerLoaded}">
      <span class="timer__value timer__value--days">{{ displayDays }}</span>
      <span class="timer__value timer__value--hours">{{ displayHours }}</span>
      <span class="timer__value timer__value--minutes">{{ displayMinutes }}</span>
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
    timerLoaded: false,
    timerExpired: false,
  }),
  computed: {
    expDate() {
      let parsedDate = Date.parse(this.endDate);
      if (parsedDate) {
        return parsedDate;
      } else {
        return generateEndDate();
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
    showRemaining() {
      const timer = setInterval(() => {
        const now = new Date();
        const distance = this.expDate - now.getTime();

        if (distance < 0) {
          clearInterval(timer);
          this.timerExpired = true;
          this.timerLoaded = true;
          this.$emit("expired");
          return;
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
      }, 1000);
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
};
</script>
<style>
.timer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.timer--expired .timer__time {
  color: var(--fail-color);
}
.timer__text {
  flex: 0 0 100%;
  max-width: 100%;
  font-size: 1.125rem;
  margin-bottom: 0.2rem;
}
.timer__time {
  font-size: 1.625rem;
  font-weight: bold;
  letter-spacing: 0.1px;
  line-height: 1.2;
}
.timer__time--hidden {
  opacity: 0;
}
.timer__value::after,
.timer__value::before {
  font-size: 1.125rem;
  font-weight: normal;
  letter-spacing: 0.2px;
  line-height: 1.5;
  margin-left: 0.25rem;
}
.timer__value--days::after {
  content: "д";
}
.timer__value--hours::after {
  content: "ч";
}
.timer__value--minutes::after {
  content: "мин";
}
.timer__value + .timer__value::before {
  content: "..";
  line-height: 1.25;
  margin-left: 0.4rem;
  margin-right: 0.625rem;
  vertical-align: top;
}
@media (min-width: 768px) {
  .timer__text {
    font-weight: 600;
    letter-spacing: 0.2px;
    margin-bottom: 0.3rem;
  }
  .timer__value::after {
    font-size: 0.9375rem;
    font-weight: 600;
    letter-spacing: 0.2px;
  }
  .timer__value + .timer__value::before {
    line-height: 2;
    margin-right: 1rem;
  }
}
@media (min-width: 1024px) {
  .timer__text {
    flex-basis: 9rem;
    max-width: 9rem;
    font-size: 1.125rem;
    font-weight: normal;
    line-height: 1.4;
    margin-bottom: 0;
    margin-right: 1.5625rem;
  }
  .timer__time {
    font-size: 3rem;
  }
  .timer__value + .timer__value::before {
    line-height: 3;
  }
}
</style>