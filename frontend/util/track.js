const KeyActions = require('../actions/key_actions');

function Track(attributes) {
  this.name = attributes["name"] || "temp";
  this.roll = attributes["roll"] || [];
  this.interval = undefined;
}

Track.prototype.startRecording = function() {
  this.roll = [];
  this.time = Date.now();
};

Track.prototype.addNotes = function(notes) {
  let noteObj = {"timeSlice": Date.now() - this.time,
                  "notes": notes};
  this.roll.push(noteObj);
};

Track.prototype.stopRecording = function() {
  console.log(this.roll);
  this.addNotes([]);
};

Track.prototype.play = function () {
  if (this.interval) {return;}
  let playbackStartTime = Date.now(),
      currentNote = 0;
  this.interval = setInterval(() => {
    console.log(this.roll.length);
    if (currentNote === this.roll.length - 1) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
    if (Date.now() - playbackStartTime > this.roll[currentNote].timeSlice) {
      if (currentNote > 0) {
        KeyActions.keyReleases(this.roll[currentNote - 1]["notes"]);
      }
      KeyActions.keyPresses(this.roll[currentNote]["notes"]);
      currentNote++;
    }
  }, 10);
};

module.exports = Track;
