const React = require('react');
const KeyListeners = require('../util/add_key_listeners');
const KeyActions = require('../actions/key_actions');
const KeyStore = require('../stores/key_store');
const NoteKey = require('./note_key');
const Recorder = require('./recorder');

let MAPPING = {
  65: 'C5',
  83: 'D5',
  68: 'E5',
  70: 'F5',
  74: 'G5',
  75: 'A5',
  76: 'B5',
  186: 'C6'
};

const Organ = React.createClass({

  getInitialState(){
    return {keys: KeyStore.all()};
  },

  _keysChanged() {
    this.setState({keys: KeyStore.all()});
  },

  componentDidMount() {
    KeyListeners(function(code){
      KeyActions.keyPress(MAPPING[code]);
    }, function(code){
      KeyActions.keyUp(MAPPING[code]);
    });

    KeyStore.addListener(this._keysChanged);
  },

  render(){
    let notes = ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6'];
    return (
      <div>
        organ grinder
        <div className="organ">
          {notes.map((note, idx) => {
            return <NoteKey key={note} id={idx} noteName={note} />;
          })}
        </div>
        <Recorder />
      </div>
    );
  }
});


module.exports = Organ;
