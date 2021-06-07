<template>
  <div>
    <activity-overview
      :totalDuration="totalDuration"
      :numOfPreparationWorkoutRest="numOfPreparationWorkoutRest"
    />
    <!-- <b-tag type="is-danger" style="float: right" rounded>Unsaved</b-tag>
    <b-tag type="is-secondary" style="float: right" rounded>Saving...</b-tag> -->
    <!-- <b-tag type="is-success" style="float: right" rounded>Saved</b-tag> -->

    <b-field label="Number of Rounds">
      <b-numberinput
        expanded
        rounded
        controls-position="compact"
        controls-alignment="right"
        icon="circle"
        min="1"
        v-model="flows.default.numberOfRounds"
        :value="flows.default.numberOfRounds"
      />
    </b-field>
    <div class="columns is-mobile is-vcentered">
      <div class="column is-two-fifths">
        <p class="heading">Your Sequence</p>
      </div>

      <div class="column" style="display: flex; justify-content: flex-end">
        <!-- <b-button
          size="is-small"
          icon-left="plus"
          @click="onAddPreparationClicked()"
        >
          Preparation
        </b-button> -->
        <b-button
          size="is-small"
          icon-left="plus"
          style="margin-left: 10px"
          @click="onAddWorkoutClicked()"
        >
          Workout
        </b-button>
        <b-button
          size="is-small"
          icon-left="plus"
          style="margin-left: 10px"
          @click="onAddRestClicked()"
        >
          Rest
        </b-button>
      </div>
    </div>
    <activity-list
      :sequence="flows.default.sequence"
      :deleteActivityToCurrentFlow="deleteActivityToCurrentFlow"
    />
  </div>
</template>


<script>
import Vue from "vue";
import ActivityList from "./activityList/index.vue";
import ActivityOverview from "./overview/index.vue";

export default {
  name: "HiitCreationIndex",
  components: {
    ActivityList,
    ActivityOverview,
  },
  props: {
    flows: {
      type: Object,
    },
    totalDuration: {
      type: String,
    },
    addActivityToCurrentFlow: {
      type: Function,
    },
    deleteActivityToCurrentFlow: {
      type: Function,
    },
  },
  methods: {
    onAddWorkoutClicked() {
      console.log("onAddWorkoutClicked");
      this.addActivityToCurrentFlow(
        Vue.prototype.$getConst("DEFAULT_WORKOUT_NAME")
      );
    },
    onAddRestClicked() {
      console.log("onAddRestClicked");
      this.addActivityToCurrentFlow(
        Vue.prototype.$getConst("DEFAULT_REST_NAME")
      );
    },

    onAddPreparationClicked() {
      console.log("onAddPreparationClicked");
      this.addActivityToCurrentFlow(
        Vue.prototype.$getConst("DEFAULT_PREPARATION_NAME")
      );
    },
  },
  computed: {
    numOfPreparationWorkoutRest() {
      var workoutCount = 0;
      var restCount = 0;
      var preparationCount = 0;
      this.flows.default.sequence.forEach((activity) => {
        if (activity.type == Vue.prototype.$getConst("DEFAULT_WORKOUT_NAME")) {
          workoutCount++;
        } else if (
          activity.type == Vue.prototype.$getConst("DEFAULT_REST_NAME")
        ) {
          restCount++;
        } else {
          preparationCount++;
        }
      });
      return { workoutCount: workoutCount, restCount: restCount ,preparationCount:preparationCount};
    },
  },
  created() {
    console.log("Creation created");
    console.log(this.flows);
    this.numOfWorkout = this.flows;
  },
  data() {
    return {
      isSaved: true,
    };
  },
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

/* .fixed-height-container {
  float: right;
  height: 50%;
  width: 250px;
  padding: 3px;
  background: #f00;
} */
.scrollable-content {
  height: 50vh;
  overflow: auto;
  /* overflow: hidden; Hide scrollbars */

  background: #fff;
}

/* .example::-webkit-scrollbar {
  display: none;
} */

.min-input-120 {
  min-width: 120px;
}

.min-input-135 {
  min-width: 135px;
}
</style>