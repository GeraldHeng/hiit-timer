<template>
  <div class="tile is-parent">
    <article class="tile is-child notification is-danger">
      <p class="title">Create your HIIT</p>
      <p class="subtitle">Total Duration: {{ totalDuration }}</p>
      <div class="content">
        <div class="bottom-10">
          <p class="heading">Per round</p>
        </div>
        <div class="columns is-mobile is-vcentered">
          <!-- <div class="column is-one-third has-text-centered">
            <div>
              <p class="heading">Preparation</p>
              <p class="title">
                {{ numOfPreparationWorkoutRest.preparationCount }}
              </p>
            </div>
          </div> -->
          <div class="column is-half has-text-centered">
            <div>
              <p class="heading">Work</p>
              <p class="title">
                {{ numOfPreparationWorkoutRest.workoutCount }}
              </p>
            </div>
          </div>
          <div class="column is-half has-text-centered">
            <div>
              <p class="heading">Rest</p>
              <p class="title">{{ numOfPreparationWorkoutRest.restCount }}</p>
            </div>
          </div>
        </div>
        <!-- <nav class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Preparation</p>
              <p class="title">{{ numOfPreparationWorkoutRest.preparationCount }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Work</p>
              <p class="title">
                {{ numOfPreparationWorkoutRest.workoutCount }}
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Rest</p>
              <p class="title">{{ numOfPreparationWorkoutRest.restCount }}</p>
            </div>
          </div>
        </nav> -->
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "ActivityOverview",
  components: {},
  props: {
    totalDuration: {
      type: String,
    },
    numOfPreparationWorkoutRest: {
      type: Object,
    },
  },
};
</script>
