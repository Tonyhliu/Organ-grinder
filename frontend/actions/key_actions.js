const Dispatcher = require("../dispatcher/dispatcher");

const KeyActions = {
  keyPress(key) {
    Dispatcher.dispatch({
      actionType: 'ADD_KEY',
      key: key
    });
  },

  keyUp(key) {
    Dispatcher.dispatch({
      actionType: 'REMOVE_KEY',
      key: key
    });
  },
  keyReleases(keys) {
    keys.forEach(key => {
      this.keyUp(key);
    });
  },
  keyPresses(keys) {
    keys.forEach(key => {
      this.keyPress(key);
    });
  }
};

module.exports = KeyActions;
