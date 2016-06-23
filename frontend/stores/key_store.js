"use strict";

const Dispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;

const KeyStore = new Store(Dispatcher);

let _keys = {};

KeyStore.all = function () {
  return _keys;
};

KeyStore.addKey = function (key) {
  _keys[key] = true;
  KeyStore.__emitChange();
};

KeyStore.removeKey = function (key) {
  delete _keys[key];
  KeyStore.__emitChange();
};

KeyStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case "ADD_KEY":
    KeyStore.addKey(payload.key);
    break;
  case "REMOVE_KEY":
    KeyStore.removeKey(payload.key);
    break;
  }
};

module.exports = KeyStore;
