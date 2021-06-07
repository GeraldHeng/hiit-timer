const constants = {
  // WORKOUT
  DEFAULT_WORKOUT_NAME: "workout",
  DEFAULT_WORKOUT: {
    name: "workout",
    duration: 30,
    type: "workout",
    color: "#f14668",
  },

  //   REST
  DEFAULT_REST_NAME: "rest",
  DEFAULT_REST: {
    name: "rest",
    duration: 10,
    type: "rest",
    color: "#5bc0de",
  },

  //   PREPARATION
  DEFAULT_PREPARATION_NAME: "preparation",
  DEFAULT_PREPARATION: {
    name: "preparation",
    duration: 5,
    type: "preparation",
    color: "#f0ad4e",
  },

  // STATE
  PAUSE: "pause",
  PLAY: "play",
  STOP: "stop",
};

constants.install = function(Vue) {
  Vue.prototype.$getConst = (key) => {
    return constants[key];
  };
};

export default constants;
