const React = require('react');
const Note = require('../util/note');
const TONES = require('../constants/tones');
const KeyStore = require('../stores/key_store');

const NoteKey = React.createClass({

  _checkNote () {
    if (Object.keys(KeyStore.all()).includes(this.props.noteName)){
      this.noteKey.start();
      this.pressed = true;
    } else {
      this.noteKey.stop();
      this.pressed = false;
    }
  },

  componentDidMount () {
    this.noteKey = new Note(TONES[this.props.noteName]);
    this.pressed = false;
    KeyStore.addListener(this._checkNote);
  },

  componentWillUnmount () {
    KeyStore.removeListener(this._checkNote);
  },

  render () {
    let keyClass = "organ-key key-" + this.props.id;
    if (this.pressed) { keyClass = "organ-key key-pressed"; }
    return (
      <div className={keyClass}>{this.props.noteName}</div>
    );
  }
});

module.exports = NoteKey;
