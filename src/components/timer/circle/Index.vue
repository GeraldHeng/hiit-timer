<template>
  <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100">
      <g class="base-timer__circle">
        <circle
          class="base-timer__path-elapsed"
          cx="50"
          cy="50"
          r="45"
        ></circle>
        <path
          :stroke-dasharray="circleDasharray"
          class="base-timer__path-remaining"
          :class="remainingPathColor"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <div class="base-timer__label">
      <div class="has-text-centered">
        <p class="title is-1">
          {{ formattedTimeLeft }}
        </p>
        <p class="heading">Left</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
const FULL_DASH_ARRAY = 283;
// const WARNING_THRESHOLD = 10;
// const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
  },
  alert: {
    color: "red",
  },
};

export default {
  name: "TimerCircle",
  props: {
    duration: {
      type: Number,
    },
    state: {
      type: String,
    },
    changeState: {
      type: Function,
    },
    timerEnd: {
      type: Function,
    },
  },
  data() {
    return {
      timePassed: 0,
      timerInterval: null,
    };
  },

  computed: {
    circleDasharray() {
      return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
    },

    formattedTimeLeft() {
      const timeLeft = this.timeLeft / 1000;
      const minutes = Math.floor(timeLeft / 60);
      let seconds = Math.floor(timeLeft % 60);

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
    },

    timeLeft() {
      return this.duration - this.timePassed;
    },

    timeFraction() {
      const rawTimeFraction = this.timeLeft / this.duration;
      // console.log(
      //   rawTimeFraction - (1 / this.duration) * (1 - rawTimeFraction)
      // );
      return rawTimeFraction - (1 / this.duration) * (1 - rawTimeFraction);
    },

    remainingPathColor() {
      const { alert, warning, info } = COLOR_CODES;

      if (this.timeLeft <= this.alertThreshold) {
        return alert.color;
      } else if (this.timeLeft <= this.warningThreshold) {
        return warning.color;
      } else {
        return info.color;
      }
    },
  },

  watch: {
    timeLeft(newValue) {
      if (newValue < 0) {
        console.log("timeLeft");
        console.log(this.duration);
        console.log(this.timePassed);
        // this.changeState(Vue.prototype.$getConst("STOP"));
        this.timePassed = 0;

        this.timerEnd();
      }
    },

    state(newState) {
      if (newState == Vue.prototype.$getConst("PLAY")) {
        this.timerInterval = setInterval(() => (this.timePassed += 10), 10);
      } else if (newState == Vue.prototype.$getConst("PAUSE")) {
        clearInterval(this.timerInterval);
      } else {
        this.timePassed = 0;
        clearInterval(this.timerInterval);
      }
      console.log("state change");
      console.log(this.duration);
      console.log(this.timePassed);
    },
  },

  created() {
    this.warningThreshold = this.duration * 0.25;
    this.alertThreshold = this.duration * 0.15;
  },
};
</script>

<style scoped lang="scss">
.base-timer {
  position: relative;
  width: 240px;
  height: 240px;

  &__svg {
    transform: scaleX(-1);
  }

  &__circle {
    fill: none;
    stroke: none;
  }

  &__path-elapsed {
    stroke-width: 7px;
    stroke: grey;
  }

  &__path-remaining {
    stroke-width: 7px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 0.2s linear all;
    fill-rule: nonzero;
    stroke: currentColor;

    &.green {
      color: hsl(141, 71%, 48%);
      // color: rgb(65, 184, 131);
    }

    &.orange {
      color: hsl(48, 100%, 67%);
      // color: orange;
    }

    &.red {
      color: hsl(348, 100%, 61%);
      // color: red;
    }
  }

  &__label {
    position: absolute;
    width: 240px;
    height: 280px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
  }
}
</style>
