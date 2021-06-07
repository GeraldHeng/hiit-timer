<template>
  <div class="scrollable-content">
    <div class="inner">
      <div v-if="sequence.length < 1">
        <p>Sequence is currently empty</p>
      </div>

      <draggable
        v-else
        :list="sequence"
        v-bind="dragOptions"
        v-model="sequence"
        class="list-group"
        ghost-class="ghost"
        @start="dragging = true"
        @end="dragging = false"
        handle=".handle"
      >
        <transition-group
          type="transition"
          :name="!dragging ? 'flip-list' : null"
        >
          <div v-for="(activity, index) in sequence" :key="index">
            <b-field
              :label="
                activity.type == $getConst('DEFAULT_WORKOUT_NAME')
                  ? 'Workout'
                  : activity.type == $getConst('DEFAULT_REST_NAME')
                  ? 'Rest'
                  : 'Preparation'
              "
              expanded
            >
              <b-input
                rounded
                :icon="
                  activity.type == $getConst('DEFAULT_WORKOUT_NAME')
                    ? 'fire'
                    : activity.type == $getConst('DEFAULT_REST_NAME')
                    ? 'heartbeat'
                    : 'spa'
                "
                v-model="activity.name"
                :value="activity.name"
                class="min-input-120"
                expanded
              ></b-input>
              <b-numberinput
                controls-position="compact"
                class="min-input-135"
                min="1"
                v-model="activity.duration"
                :value="activity.duration"
              />

              <p class="control">
                <b-button
                  type="is-secondary"
                  icon-right="bars"
                  class="handle"
                />
              </p>
              <p class="control">
                <b-button
                  type="is-secondary"
                  icon-right="times"
                  @click="ondeleteActivityClicked(index)"
                />
              </p>
            </b-field>
          </div> </transition-group
      ></draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "ActivityList",
  components: {
    draggable,
  },
  props: {
    sequence: {
      type: Array,
    },
    deleteActivityToCurrentFlow: {
      type: Function,
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        // group: "description",
        disabled: false,

        // ghostClass: "ghost",
      };
    },
  },
  methods: {
    ondeleteActivityClicked(index) {
      this.deleteActivityToCurrentFlow(index);
    },
  },
  data() {
    return {
      dragging: false,
    };
  },
  created() {
    console.log(this.sequence);
  },
};
</script>
