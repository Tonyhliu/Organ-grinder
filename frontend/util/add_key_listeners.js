const KeyListeners = function(callbackDown, callbackUp){
  $(document).keydown(function(e){
    callbackDown(e.keyCode);
  });
  $(document).keyup(function(e){
    callbackUp(e.keyCode);
  });
};
window.KeyListeners = KeyListeners;
module.exports = KeyListeners;
