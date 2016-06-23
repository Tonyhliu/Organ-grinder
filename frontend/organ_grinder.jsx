const React = require('react');
const ReactDOM = require('react-dom');
const Organ = require('./components/organ');


document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(
	  <Organ />,
	  document.getElementById('organ-grinder')
  );
});
