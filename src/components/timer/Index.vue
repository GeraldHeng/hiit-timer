<template>
  <div>
    <div class="rows">
      <div class="container has-text-centered bottom-50">
        <div class="hide-tablet">
          <b-button
            v-if="!isExpanded"
            icon-right="expand"
            style="right: 0; position: absolute"
            @click="expandTimer()"
          />
          <b-button
            v-else
            icon-right="compress"
            style="right: 0; position: absolute"
            @click="compressTimer()"
          />
        </div>

        <b-field style="position: absolute">
          <b-switch size="is-small">Sound</b-switch>
        </b-field>

        <div>
          <p class="heading">Next Up</p>
          <p
            class="title is-4"
            v-if="this.currentFlow.sequence[sequenceNumber + 1] != undefined"
          >
            {{ this.currentFlow.sequence[sequenceNumber + 1].name }}
          </p>

          <p
            class="title is-4"
            v-else-if="this.currentRound < this.currentFlow.numberOfRounds"
          >
            Next Round
          </p>
          <p class="title is-4" v-else>HIIT END</p>
        </div>
      </div>
      <div class="container bottom-20 has-text-centered">
        <div class="box" v-bind:style="{ background: currentActivity.color }">
          <p class="heading" style="color: white">Now Doing</p>
          <p class="title is-1" style="color: white">
            {{ currentActivity.name }}
          </p>
        </div>
      </div>

      <div class="container inner bottom-20">
        <!-- <div class="notification is-primary rounded has-text-centered">
          <p class="title is-1">46</p>
          Seconds
        </div> -->
        <timer-circle
          :duration="currentActivity.duration * 1000"
          :state="state"
          :changeState="changeState"
          :timerEnd="activityEnd"
        />
      </div>
      <!-- <timer-circle /> -->

      <div class="container has-text-centered bottom-20">
        <div class="bottom-20">
          <p class="heading">
            Round {{ currentRound }}/{{ this.currentFlow.numberOfRounds }}
          </p>
        </div>
        <div class="columns is-mobile is-vcentered">
          <!-- <div class="column is-one-third has-text-centered">
            <div>
              <p class="heading">Preparation</p>
              <p class="title">{{ numOfWorkoutRestLeft.preparationCount }}</p>
            </div>
          </div> -->
          <div class="column is-half has-text-centered">
            <div>
              <p class="heading">Work</p>
              <p class="title">{{ numOfWorkoutRestLeft.workoutCount }}</p>
            </div>
          </div>
          <div class="column is-half has-text-centered">
            <div>
              <p class="heading">Rest</p>
              <p class="title">{{ numOfWorkoutRestLeft.restCount }}</p>
            </div>
          </div>
        </div>
        <!-- <nav class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Preparation left</p>
              <p class="title">{{ numOfWorkoutRestLeft.workoutCount }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Work left</p>
              <p class="title">{{ numOfWorkoutRestLeft.workoutCount }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Rest left</p>
              <p class="title">{{ numOfWorkoutRestLeft.restCount }}</p>
            </div>
          </div>
        </nav> -->
        <div
          v-if="state == $getConst('PLAY')"
          class="inner"
          style="width: 40%; display: flex; justify-content: space-between"
        >
          <b-button
            size="is-medium"
            type="is-primary"
            icon-right="pause"
            @click="changeState($getConst('PAUSE'))"
          />
          <b-button
            size="is-medium"
            type="is-primary"
            icon-right="stop"
            @click="changeState($getConst('STOP'))"
          />
        </div>
        <div
          v-else-if="state == $getConst('STOP')"
          class="inner"
          style="width: 40%; display: flex; justify-content: center"
        >
          <b-button
            size="is-medium"
            type="is-primary"
            icon-right="play"
            @click="changeState($getConst('PLAY'))"
          />
        </div>
        <div
          v-else
          class="inner"
          style="width: 40%; display: flex; justify-content: space-between"
        >
          <b-button
            size="is-medium"
            type="is-primary"
            icon-right="play"
            @click="changeState($getConst('PLAY'))"
          />
          <b-button
            size="is-medium"
            type="is-primary"
            icon-right="stop"
            @click="changeState($getConst('STOP'))"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import TimerCircle from "./circle/Index.vue";
export default {
  name: "HiitTimerIndex",
  props: {
    isExpanded: {
      type: Boolean,
    },
    expandTimer: {
      type: Function,
    },
    compressTimer: {
      type: Function,
    },
    currentFlow: {
      type: Object,
    },
  },
  components: {
    TimerCircle,
  },
  methods: {
    changeState(newState) {
      this.state = newState;

      if (this.state == Vue.prototype.$getConst("STOP")) {
        this.currentRound = 1;
        this.sequenceNumber = 0;
      }
    },
    activityEnd() {
      console.log("activityEnd");
      this.sequenceNumber += 1;
      if (this.sequenceNumber >= this.currentFlow.sequence.length) {
        this.sequenceNumber = -1;
      }
    },
  },
  computed: {
    currentActivity() {
      if (this.sequenceNumber >= this.currentFlow.sequence.length) {
        return {};
      }
      return this.currentFlow.sequence[this.sequenceNumber];
    },

    numOfWorkoutRestLeft() {
      var workoutCount = 0;
      var restCount = 0;
      var preparationCount = 0;
      this.currentFlow.sequence
        .slice(this.sequenceNumber)
        .forEach((activity) => {
          if (
            activity.type == Vue.prototype.$getConst("DEFAULT_WORKOUT_NAME")
          ) {
            workoutCount++;
          } else if (
            activity.type == Vue.prototype.$getConst("DEFAULT_REST_NAME")
          ) {
            restCount++;
          } else {
            preparationCount++;
          }
        });
      return {
        workoutCount: workoutCount,
        restCount: restCount,
        preparationCount: preparationCount,
      };
    },
  },
  watch: {
    currentActivity(newVal) {
      console.log("h");
      console.log(newVal);
      if (newVal == undefined) {
        if (this.currentRound < this.currentFlow.numberOfRounds) {
          this.sequenceNumber = 0;
          this.currentRound += 1;
        } else {
          this.state = Vue.prototype.$getConst("STOP");
          this.currentRound = 1;
          this.sequenceNumber = 0;
        }
      }
    },
  },
  data() {
    return {
      state: Vue.prototype.$getConst("STOP"),
      sequenceNumber: 0,
      currentRound: 1,
    };
  },
  // created() {
  //   this.activeCurrentFlow = this.currentFlow;
  // },
};
</script>

<style scoped>
.rows .bottom-50 {
  margin-bottom: 50px;
}

.rows .bottom-40 {
  margin-bottom: 40px;
}

.rows .bottom-30 {
  margin-bottom: 30px;
}

.rows .bottom-20 {
  margin-bottom: 20px;
}

.rows .bottom-10 {
  margin-bottom: 10px;
}

.rows .bottom-5 {
  margin-bottom: 5px;
}

.begin {
  margin-top: 20px;
}

.rounded {
  border-radius: 100px;
  /* background: #73AD21; */
  padding: 35px;
  width: 150px;
  height: 150px;
}

.inner {
  display: table;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  /* .hide-tablet{
    visibility:hidden;
  } */
}
</style>