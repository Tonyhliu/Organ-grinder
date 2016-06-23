const React = require('react');
const Track = require('../util/track');
const KeyStore = require('../stores/key_store');

const Recorder = React.createClass({
  getInitialState() {
    return {recording: false, track: new Track({}), buttons: false};
  },

  _saveNotes() {
    if (this.state.recording) {
      this.state.track.addNotes(Object.keys(KeyStore.all()));
    }
  },

  componentDidMount() {
    KeyStore.addListener(this._saveNotes);
  },

  _toggleRecording() {
    if (this.state.recording) {
      this.state.track.stopRecording();
      this.setState({buttons: true});
    } else {
      this.state.track.startRecording();
      this.setState({buttons: false});
    }
    this.setState({recording: !this.state.recording});
  },
  _playRecording(){
    this.state.track.play();
  },

  render() {
    let buttonText="Start Recording";
    let trackBtns = "hidden";
    if (this.state.buttons) {trackBtns = "";}
    if (this.state.recording) { buttonText = "Stop Recording";}
    return (
      <div className="recorder">
        <button className="recorder-btn"
                onClick={this._toggleRecording}>{buttonText}</button>

              <div className={trackBtns}>
          <button onClick={this._playRecording}>Play</button>
          <button>Save Track</button>
        </div>
      </div>
    );
  }
});

module.exports = Recorder;
