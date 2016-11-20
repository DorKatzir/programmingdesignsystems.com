// Setup custom events
var utils = require('./other/utils');
utils.setupCustomEvents();

// Manual Rendering
// -----------------------------------------------------

var React = window.React = require('react');
var ReactDOM = window.ReactDOM = require('react-dom');
window.pds = {
  Splash: require('./other/splash'),
  PathInteractive: require('./components/pathInteractive')
};

// Automatic Rendering
// -----------------------------------------------------

// Find all <script> tags with .p5.fig
// Create a div next to it
// Create React components in that div with the code from <script>
var P5Figure = require('./components/p5Figure');
var figs = document.getElementsByClassName('p5 fig');
for(var i = 0; i < figs.length; i++) {
  var el = document.createElement('div');
  figs[i].parentNode.insertBefore(el, figs[i].nextSibling);
  var code = figs[i].innerHTML;
  var path = figs[i].getAttribute('data-path');
  var caption = figs[i].getAttribute('data-caption')
  if(path) path = 'https://github.com/runemadsen/programmingdesignsystems.com/tree/master/' + path;
  var klass = figs[i].className.replace('p5', '').replace('fig', '').trim();
  window.ReactDOM.render(window.React.createElement(P5Figure, { code: code, link: path, klass: klass, caption:caption, parent:el }), el)
}

// Highlight all pre tags
var Prism = require('prismjs');
var pres = document.getElementsByTagName('pre');
for(var i = 0; i < pres.length; i++) {
  pres[i].firstChild.innerHTML = Prism.highlight(pres[i].firstChild.textContent, Prism.languages.javascript)
}

// Dispatch an event to say that libs are loaded. This makes it
// possible to have view-specific JS before the loaded libs.
window.dispatchEvent(new Event('libsLoaded'));
