<template>
  <div id="app">
    <div class="container is-fluid bottom-50">
      <Appbar />
      <div :class="[!isExpanded ? 'columns begin' : 'begin']">
        <div :class="[!isExpanded ? 'column is-three-fifths' : 'top-100']">
          <HiitTimerIndex
            :isExpanded="isExpanded"
            :expandTimer="expandTimer"
            :compressTimer="compressTimer"
            :currentFlow="flows.default"
          />
        </div>
        <hr />
        <div :class="[!isExpanded ? 'column' : '']">
          <HiitCreationIndex
            :flows="flows"
            :totalDuration="totalDuration"
            :addActivityToCurrentFlow="addActivityToCurrentFlow"
            :deleteActivityToCurrentFlow="deleteActivityToCurrentFlow"
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Appbar from "./components/commons/Appbar";
import Footer from "./components/commons/Footer";
import HiitTimerIndex from "./components/timer/Index";
import HiitCreationIndex from "./components/creation/Index";
import Vue from "vue";

export default {
  name: "App",
  components: {
    Appbar,
    Footer,
    HiitTimerIndex,
    HiitCreationIndex,
  },
  methods: {
    expandTimer() {
      console.log("expandTimer");
      this.isExpanded = true;
    },

    compressTimer() {
      console.log("compressTimer");
      this.isExpanded = false;
    },

    getFlowsFromStorage() {
      console.log("getFlowsFromStorage");
      return localStorage.getItem("flows") == null
        ? {}
        : JSON.parse(localStorage.getItem("flows"));
    },

    setFlowsToStorage() {
      console.log("setFlowsFromStorage");
      localStorage.setItem("flows", JSON.stringify(this.flows));
    },

    addActivityToCurrentFlow(activity) {
      console.log("addActivityToCurrentFlow");
      console.log(activity);

      if (activity == Vue.prototype.$getConst("DEFAULT_WORKOUT_NAME")) {
        this.flows.default.sequence.push(
          JSON.parse(JSON.stringify(Vue.prototype.$getConst("DEFAULT_WORKOUT")))
        );
      } else if (activity == Vue.prototype.$getConst("DEFAULT_REST_NAME")) {
        this.flows.default.sequence.push(
          JSON.parse(JSON.stringify(Vue.prototype.$getConst("DEFAULT_REST")))
        );
      } else if (activity == Vue.prototype.$getConst("DEFAULT_PREPARATION_NAME")) {
        this.flows.default.sequence.push(
          JSON.parse(JSON.stringify(Vue.prototype.$getConst("DEFAULT_PREPARATION")))
        );
      }
    },

    deleteActivityToCurrentFlow(index) {
      console.log("deleteActivityToCurrentFlow");
      this.flows.default.sequence.splice(index, 1);
    },

    pad(number) {
      return ("0" + number).slice(-2);
    },

    sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    },

    printDefault() {
      console.log(this.flows.default);
    },
  },
  computed: {
    totalDuration() {
      var totalDuration = 0;
      if (this.flows.default.sequence.length > 0) {
        this.flows.default.sequence.forEach((item) => {
          if (parseInt(item.duration)) {
            totalDuration += parseInt(item.duration);
          }
        });
        totalDuration *= this.flows.default.numberOfRounds;
      }
      return (
        this.pad(Math.floor(totalDuration / 60)) +
        ":" +
        this.pad(totalDuration % 60)
      );
    },
  },

  watch: {
    flows: {
      async handler(val) {
        // await this.sleep(1000);
        console.log("flow is changing" + val);
        this.setFlowsToStorage();
      },
      deep: true,
    },
  },
  created() {
    console.log("App created");
    console.log(Vue.prototype.$getConst("DEFAULT_REST_NAME"));
    this.flows = this.getFlowsFromStorage();
    console.log("this is the flow");
    console.log(this.flows.default.numberOfRounds);
  },
  data() {
    return {
      isExpanded: false,
      flows: {},
    };
  },
};
</script>

<style>
/* #app {
  margin-top: 20px;
} */
</style>

<style scoped>
.bottom-50 {
  margin-bottom: 50px;
}

.rows .bottom-40 {
  margin-bottom: 40px;
}

.rows .bottom-30 {
  margin-bottom: 30px;
}

.bottom-20 {
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

.top-100 {
  margin-top: 32px;
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
</style>
